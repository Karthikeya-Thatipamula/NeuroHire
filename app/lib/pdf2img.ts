import * as pdfjsLib from 'pdfjs-dist';

export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLibInstance: typeof pdfjsLib | null = null;
let isLoading = false;
let loadPromise: Promise<typeof pdfjsLib> | null = null;

async function loadPdfJs(): Promise<typeof pdfjsLib> {
  if (pdfjsLibInstance) return pdfjsLibInstance;
  if (loadPromise) return loadPromise;

  isLoading = true;

  try {
    loadPromise = import('pdfjs-dist').then((lib) => {
      lib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      pdfjsLibInstance = lib;
      isLoading = false;
      return lib;
    }).catch((error) => {
      console.error("Failed to load PDF.js:", error);
      isLoading = false;
      throw new Error("Failed to load PDF.js library");
    });

    return loadPromise;
  } catch (error) {
    isLoading = false;
    loadPromise = null;
    throw error;
  }
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  try {
    // Validate file type
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error("File is not a PDF");
    }

    // Check file size
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      throw new Error("PDF file is too large");
    }

    const lib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();

    // Load the PDF document
    const loadingTask = lib.getDocument({
      data: arrayBuffer,
      verbosity: 0,
      isEvalSupported: false,
      isOffscreenCanvasSupported: false,
    });

    const pdf = await loadingTask.promise.catch((err) => {
      throw new Error(`Failed to load PDF document: ${err.message}`);
    });

    // Get the first page
    const page = await pdf.getPage(1);

    // Set up the viewport
    const scale = Math.min(2.0, window.devicePixelRatio || 1);
    const viewport = page.getViewport({ scale });

    // Create canvas
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not get canvas 2D context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    // Render the page
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Cleanup
    page.cleanup();
    pdf.destroy();

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          canvas.remove(); // Clean up canvas

          if (blob) {
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob from canvas",
            });
          }
        },
        "image/png",
        0.95
      );
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    let errorMessage = "Failed to convert PDF";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return {
      imageUrl: "",
      file: null,
      error: errorMessage,
    };
  }
}
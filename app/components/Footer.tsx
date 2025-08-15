const Footer = () => {
  return (
    <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/Karthikeya-Thatipamula"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          Karthikeya Thatipamula
        </a>
      </p>

      <nav aria-label="Social media links" className="mt-3">
        <ul className="flex justify-center gap-6">
          {/* GitHub */}
          <li>
            <a
              href="https://github.com/Karthikeya-Thatipamula"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group flex items-center gap-1 hover:text-black transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .5C5.648.5.5 5.65.5 12.003c0 5.094 3.293 9.409 7.865 10.94.575.106.786-.25.786-.556 
                    0-.274-.01-1-.015-1.962-3.2.695-3.875-1.544-3.875-1.544-.523-1.329-1.277-1.683-1.277-1.683-1.043-.714.079-.699.079-.699 
                    1.152.081 1.758 1.183 1.758 1.183 1.026 1.757 2.69 1.25 3.344.956.104-.743.402-1.25.731-1.538-2.554-.29-5.238-1.278-5.238-5.69 
                    0-1.257.45-2.285 1.183-3.09-.118-.29-.513-1.45.112-3.021 0 0 .965-.309 3.162 1.178a11.07 11.07 0 0 1 2.878-.387c.975.004 
                    1.956.132 2.878.387 2.197-1.487 3.162-1.178 3.162-1.178.625 1.571.23 2.731.113 3.021.734.805 1.183 1.833 1.183 3.09 
                    0 4.423-2.689 5.395-5.253 5.678.413.354.78 1.05.78 2.117 0 1.527-.014 2.757-.014 3.13 0 .31.21.668.793.555 
                    4.57-1.532 7.862-5.847 7.862-10.94C23.5 5.65 18.352.5 12 .5z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          </li>

          {/* LinkedIn */}
          <li>
            <a
              href="https://www.linkedin.com/in/karthikeya-thatipamula-b8bb43293"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group flex items-center gap-1 hover:text-blue-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <path d="M4.98 3.5a2.25 2.25 0 11.001 4.5A2.25 2.25 0 014.98 3.5zM3.75 9h2.5v12h-2.5V9zm7.5 0h2.4v1.64h.035c.334-.63 1.15-1.296 2.366-1.296 2.53 0 3 1.664 3 3.826V21h-2.5v-6.25c0-1.492-.03-3.41-2.079-3.41-2.08 0-2.398 1.622-2.398 3.297V21h-2.5V9z" />
              </svg>
              LinkedIn
            </a>
          </li>

          {/* X (Twitter) */}
          <li>
            <a
              href="https://x.com/Karthikeya16780"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="group flex items-center gap-1 hover:text-black transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <path d="M17.19 2H20.5l-7.7 9.02L21.5 22h-6.8l-5.3-6.4-6.2 6.4H1.5l8.3-9.7L2 2h6.8l4.8 5.8L17.19 2z" />
              </svg>
              X
            </a>
          </li>

          {/* Kaggle */}
          <li>
            <a
              href="https://www.kaggle.com/karthikeya18"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kaggle Profile"
              className="group flex items-center gap-1 hover:text-blue-500 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <path d="M4 3h2.4l7.1 8.6L6.4 21H4l7.8-9.4L4 3zm9 0h7v2h-7V3zm0 4h5v2h-5V7zm0 4h3v2h-3v-2zm0 4h1v2h-1v-2z" />
              </svg>
              Kaggle
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;

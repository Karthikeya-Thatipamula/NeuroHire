import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "NeuroHire" },
    { name: "description", content: "Unlock Talent with Neuro-Intelligence." },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  
  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  },[auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => {
        return JSON.parse(resume.value) as Resume; // Added return statement
        }) || [];

        console.log("parsedResumes", parsedResumes);
        setResumes(parsedResumes);
      } catch (error) {
        console.error('Error loading resumes:', error);
        setResumes([]);
      }
      setLoadingResumes(false);
    }

    loadResumes();
  }, []);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2>"Be First—Upload Your Resume for Feedback!"</h2>
        ): (
          <h2>Boost your work with AI-powered feedback! 🚀 Review your submissions now!</h2>
        )}
      </div>
      {loadingResumes && (
        <div className="flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" className="w-[200px]"/>
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10 gap-4">
          <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
          Upload Your Resume
          </Link>
        </div>
      )}
    </section>
  </main>;
}
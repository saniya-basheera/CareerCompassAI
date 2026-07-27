import { useState, useRef } from "react";

import PersonalInfo from "../components/resume/PersonalInfo";
import SkillsEducation from "../components/resume/SkillsEducation";
import ExperienceProjects from "../components/resume/ExperienceProjects";
import ResumePreview from "../components/resume/ResumePreview";
import DownloadButton from "../components/resume/DownloadButton";

function ResumeBuilder() {

  const resumeRef = useRef();

  const [photo, setPhoto] = useState(null);

  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    objective: "",

    skills: [],
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 text-white py-8 shadow-xl">

        <h1 className="text-5xl font-bold text-center">
          🎨 AI Resume Builder
        </h1>

        <p className="text-center mt-3 text-lg">
          Build a beautiful ATS-friendly resume in minutes
        </p>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}

          <div className="space-y-8">

            <PersonalInfo
              resume={resume}
              setResume={setResume}
              photo={photo}
              setPhoto={setPhoto}
            />

            <SkillsEducation
              resume={resume}
              setResume={setResume}
            />

            <ExperienceProjects
              resume={resume}
              setResume={setResume}
            />

          </div>

          {/* RIGHT SIDE */}

          <div className="sticky top-6 h-fit">

            <div ref={resumeRef}>
                              <ResumePreview
                resume={resume}
                photo={photo}
              />
            </div>

            <DownloadButton
              resumeRef={resumeRef}
            />

          </div>

        </div>

      </div>

      {/* Footer */}

      <footer className="mt-16 bg-gray-900 text-white py-6 text-center">
        <p className="text-lg">
          🚀 Built with React + Tailwind CSS + jsPDF
        </p>

        <p className="text-gray-400 mt-2">
          CareerCompass AI Resume Builder
        </p>
      </footer>

    </div>

  );
}

export default ResumeBuilder;

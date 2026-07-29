import { downloadResume } from "../utils/downloadResume";
import { useState } from "react";
import axios from "axios";
import GeneratedResume from "../components/resume/GeneratedResume";
import PersonalInfo from "../components/resume/PersonalInfo";
import SkillsEducation from "../components/resume/SkillsEducation";
import Skills from "../components/resume/Skills";
import Experience from "../components/resume/Experience";
import Projects from "../components/resume/Projects";
function ResumeBuilder() {
  const [step, setStep] = useState(1);

const [resumeData, setResumeData] = useState({
  // Personal
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  jobRole: "",

  // Education
  degree: "",
  college: "",
  graduationYear: "",
  cgpa: "",

  // Skills
  skills: [],

// Experience
company: "",
role: "",
duration: "",
employmentType: "",
//Projects
  projectTitle: "",
projectTech: "",
});
const [skillInput, setSkillInput] = useState("");
const [generatedResume, setGeneratedResume] = useState(null);
const [loading, setLoading] = useState(false);
const handleChange = (e) => {
  const { name, value } = e.target;

  setResumeData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const addSkill = () => {
  if (!skillInput.trim()) return;

  setResumeData((prev) => ({
    ...prev,
    skills: [...prev.skills, skillInput],
  }));

  setSkillInput("");
};
const removeSkill = (index) => {
  setResumeData((prev) => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index),
  }));
};
const generateResume = async () => {
  try {
    setLoading(true);

    const response = await axios.post(
      "https://careercompassai-tupf.onrender.com/generate-resume",
      resumeData
    );

    setGeneratedResume(response.data);
  } catch (error) {
    console.error(error);
    alert("Failed to generate resume.");
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
<nav className="bg-white border-b border-gray-200">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">

    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        CareerCompass AI
      </h1>

      <p className="text-sm text-gray-500">
        AI Resume Builder
      </p>
    </div>

    <span className="text-sm text-gray-500">
      Step {step} of 5
    </span>

  </div>
</nav>

      {/* Hero */}
<div className="max-w-6xl mx-auto px-8 py-8">

  <div className="flex justify-between items-center">

    <div>
      <h2 className="text-3xl font-bold text-gray-900">
        AI Resume Builder
      </h2>

      <p className="text-gray-500 mt-1">
        Complete the form below. AI will write the professional content for you.
      </p>
    </div>

    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
      Step {step} of 5
    </div>

  </div>

</div>

      {/* Progress */}

      <div className="max-w-6xl mx-auto px-8 py-6">

  <div className="flex items-center justify-between">

    {[
      "Personal",
      "Education",
      "Skills",
      "Experience",
      "Projects",
    ].map((item, index) => (
      <div key={item} className="flex-1 flex flex-col items-center">

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
          ${
            step > index + 1
              ? "bg-green-600 text-white"
              : step === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {step > index + 1 ? "✓" : index + 1}
        </div>

        <span className="mt-2 text-sm text-gray-600">
          {item}
        </span>

      </div>
    ))}

  </div>

</div>

      {/* Form */}

      <div className="max-w-6xl mx-auto px-8 py-10">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold mb-8">

            {step===1 && "👤 Personal Details"}

            {step===2 && "🎓 Education"}

            {step===3 && "🛠 Skills"}

            {step===4 && "💼 Experience"}

            {step===5 && "🚀 Projects"}

          </h2>

         {step === 1 && (
  <PersonalInfo
    resumeData={resumeData}
    handleChange={handleChange}
  />
)}
{step === 2 && (
  <SkillsEducation
    resumeData={resumeData}
    handleChange={handleChange}
  />
)}
{step === 3 && (
  <Skills
    resumeData={resumeData}
    skillInput={skillInput}
    setSkillInput={setSkillInput}
    addSkill={addSkill}
    removeSkill={removeSkill}
  />
)}

{step === 4 && (
  <Experience
    resumeData={resumeData}
    handleChange={handleChange}
  />
)}
{step === 5 && (
  <Projects
    resumeData={resumeData}
    handleChange={handleChange}
  />
)}
{/* Generated Resume Message */}

{generatedResume && (
  <GeneratedResume
    resume={generatedResume}
    user={resumeData}
  />
)}

    <div className="flex justify-between mt-12">

            

  <button
    disabled={step === 1}
    onClick={() => setStep(step - 1)}
    className="bg-gray-200 px-6 py-3 rounded-xl"
  >
    Previous
  </button>

  {step < 5 ? (
    <button
      onClick={() => setStep(step + 1)}
      className="bg-blue-600 text-white px-8 py-3 rounded-xl"
    >
      Next
    </button>
  ) : (
    <button
      onClick={generateResume}
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
    >
      🤖 Generate Resume
    </button>
  )}

</div>

        </div>

      </div>

    </div>
  );
}

export default ResumeBuilder;
import { useState } from "react";
import axios from "axios";
import { downloadResume } from "../utils/downloadResume";
import GeneratedResume from "../components/resume/GeneratedResume";

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

    // Project
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
    const skill = skillInput.trim();

    if (!skill) return;

    if (resumeData.skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
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

      // Scroll to generated resume
      setTimeout(() => {
        document
          .getElementById("generated-resume")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (error) {
      console.error("Resume generation error:", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                CareerCompass AI
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                AI Resume Builder
              </p>
            </div>

            <div className="text-sm text-gray-500 font-medium">
              Step {step} of 5
            </div>

          </div>

        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              AI Resume Builder
            </h2>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Complete the form below. AI will write the professional content
              for you.
            </p>
          </div>

          <div className="self-start sm:self-auto bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            Step {step} of 5
          </div>

        </div>

      </section>


      {/* ================= PROGRESS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        <div className="flex items-start justify-between gap-1 sm:gap-3">

          {[
            "Personal",
            "Education",
            "Skills",
            "Experience",
            "Projects",
          ].map((item, index) => (

            <div
              key={item}
              className="flex-1 flex flex-col items-center min-w-0"
            >

              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                  step > index + 1
                    ? "bg-green-600 text-white"
                    : step === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > index + 1 ? "✓" : index + 1}
              </div>

              <span className="mt-2 text-[10px] sm:text-sm text-gray-600 text-center leading-tight">
                {item}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FORM ================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-10">

          {/* STEP TITLE */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">

            {step === 1 && "👤 Personal Details"}

            {step === 2 && "🎓 Education"}

            {step === 3 && "🛠 Skills"}

            {step === 4 && "💼 Experience"}

            {step === 5 && "🚀 Projects"}

          </h2>


          {/* ================= STEP 1 ================= */}
          {step === 1 && (

            <div className="space-y-5">

              <Input
                label="Full Name"
                name="fullName"
                value={resumeData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Email"
                  name="email"
                  value={resumeData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                />

                <Input
                  label="Phone"
                  name="phone"
                  value={resumeData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />

              </div>

              <Input
                label="Location"
                name="location"
                value={resumeData.location}
                onChange={handleChange}
                placeholder="City, State, Country"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="LinkedIn"
                  name="linkedin"
                  value={resumeData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                />

                <Input
                  label="GitHub"
                  name="github"
                  value={resumeData.github}
                  onChange={handleChange}
                  placeholder="GitHub profile URL"
                />

              </div>

              <Input
                label="Target Job Role"
                name="jobRole"
                value={resumeData.jobRole}
                onChange={handleChange}
                placeholder="e.g. Python Developer"
              />

            </div>

          )}


          {/* ================= STEP 2 ================= */}
          {step === 2 && (

            <div className="space-y-5">

              <Input
                label="Degree"
                name="degree"
                value={resumeData.degree}
                onChange={handleChange}
                placeholder="e.g. B.Tech Computer Science"
              />

              <Input
                label="College / University"
                name="college"
                value={resumeData.college}
                onChange={handleChange}
                placeholder="Enter your college or university"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Graduation Year"
                  name="graduationYear"
                  value={resumeData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g. 2026"
                />

                <Input
                  label="CGPA"
                  name="cgpa"
                  value={resumeData.cgpa}
                  onChange={handleChange}
                  placeholder="e.g. 8.5"
                />

              </div>

            </div>

          )}


          {/* ================= STEP 3 ================= */}
          {step === 3 && (

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add Your Skills
              </label>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="e.g. Python"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={addSkill}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Add Skill
                </button>

              </div>


              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-5">

                {resumeData.skills.map((skill, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm"
                  >

                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="font-bold hover:text-red-600"
                    >
                      ×
                    </button>

                  </div>

                ))}

              </div>


              {resumeData.skills.length === 0 && (

                <p className="text-gray-500 text-sm mt-5">
                  Add the skills you actually have. AI will use these when
                  creating your resume.
                </p>

              )}

            </div>

          )}


          {/* ================= STEP 4 ================= */}
          {step === 4 && (

            <div className="space-y-5">

              <Input
                label="Company"
                name="company"
                value={resumeData.company}
                onChange={handleChange}
                placeholder="Company name"
              />

              <Input
                label="Role"
                name="role"
                value={resumeData.role}
                onChange={handleChange}
                placeholder="e.g. Python Intern"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <Input
                  label="Duration"
                  name="duration"
                  value={resumeData.duration}
                  onChange={handleChange}
                  placeholder="e.g. Jan 2025 - Jun 2025"
                />

                <Input
                  label="Employment Type"
                  name="employmentType"
                  value={resumeData.employmentType}
                  onChange={handleChange}
                  placeholder="e.g. Internship / Full-time"
                />

              </div>

            </div>

          )}


          {/* ================= STEP 5 ================= */}
          {step === 5 && (

            <div className="space-y-5">

              <Input
                label="Project Title"
                name="projectTitle"
                value={resumeData.projectTitle}
                onChange={handleChange}
                placeholder="e.g. CareerCompass AI"
              />

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technologies Used
                </label>

                <textarea
                  name="projectTech"
                  value={resumeData.projectTech}
                  onChange={handleChange}
                  placeholder="e.g. Python, FastAPI, React, SQL"
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

          )}


          {/* ================= NAVIGATION ================= */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:gap-4 mt-8 sm:mt-12">

            <button
              type="button"
              disabled={step === 1}
              onClick={previousStep}
              className="w-full sm:w-auto bg-gray-200 px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              ← Previous
            </button>


            {step < 5 ? (

              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Next →
              </button>

            ) : (

              <button
                type="button"
                onClick={generateResume}
                disabled={loading}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "🤖 Generate Resume"}
              </button>

            )}

          </div>

        </div>


        {/* ================= GENERATED RESUME ================= */}
        {generatedResume && (

          <section
            id="generated-resume"
            className="mt-8 sm:mt-10"
          >

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 lg:p-10">

              {/* Heading */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Your AI Resume
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Your professional ATS-friendly resume is ready.
                  </p>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    downloadResume(resumeData, generatedResume)
                  }
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  📥 Download PDF
                </button>

              </div>


              {/* Resume */}
              <div
                id="resume-preview"
                className="w-full overflow-hidden"
              >

                <GeneratedResume
                  resume={generatedResume}
                  user={resumeData}
                />

              </div>

            </div>

          </section>

        )}

      </main>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-6 mt-8">

        <div className="max-w-6xl mx-auto px-4 text-center">

          <p className="text-sm sm:text-base">
            🚀 CareerCompass AI Resume Builder
          </p>

          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Build professional ATS-friendly resumes with AI
          </p>

        </div>

      </footer>

    </div>
  );
}


/* ================= INPUT COMPONENT ================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}


export default ResumeBuilder;
import { useState } from "react";
import axios from "axios";
import { downloadResume } from "../utils/downloadResume";
import GeneratedResume from "../components/resume/GeneratedResume";

function JDResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    jobRole: "",

    degree: "",
    college: "",
    graduationYear: "",
    cgpa: "",

    skills: [],

    company: "",
    role: "",
    duration: "",
    employmentType: "",

    projectTitle: "",
    projectTech: "",

    jobDescription: "",
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

    if (
      resumeData.skills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() === skill.toLowerCase()
      )
    ) {
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
    if (!resumeData.fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!resumeData.jobRole.trim()) {
      alert("Please enter your target job role.");
      return;
    }

    if (!resumeData.jobDescription.trim()) {
      alert("Please paste the job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://careercompassai-tupf.onrender.com/generate-jd-resume",
        resumeData
      );

      setGeneratedResume(response.data);

      setTimeout(() => {
        document
          .getElementById("generated-resume-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (error) {
      console.error("JD Resume generation error:", error);

      alert(
        error?.response?.data?.detail ||
          "Failed to generate JD-tailored resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedResume) return;

    downloadResume(resumeData, {
      ...generatedResume,
      skills: resumeData.skills || [],
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm">
        <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                CareerCompass AI
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                JD-Tailored Resume Builder
              </p>
            </div>

            <div className="text-xs sm:text-sm text-gray-500">
              ATS-Friendly Resume
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-8 lg:py-10">
        {/* PAGE HEADER */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
            JD-Tailored Resume
          </h2>

          <p className="text-gray-500 mt-2 text-sm sm:text-base lg:text-lg max-w-4xl leading-6 sm:leading-7">
            Enter your details and paste the job description. AI will
            tailor your resume using only your actual information.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 xl:p-10">
          {/* PERSONAL INFORMATION */}
          <section>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              👤 Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              <Input
                label="Full Name"
                name="fullName"
                value={resumeData.fullName}
                onChange={handleChange}
              />

              <Input
                label="Email"
                name="email"
                value={resumeData.email}
                onChange={handleChange}
                type="email"
              />

              <Input
                label="Phone"
                name="phone"
                value={resumeData.phone}
                onChange={handleChange}
                type="tel"
              />

              <Input
                label="Location"
                name="location"
                value={resumeData.location}
                onChange={handleChange}
              />

              <Input
                label="LinkedIn"
                name="linkedin"
                value={resumeData.linkedin}
                onChange={handleChange}
              />

              <Input
                label="GitHub"
                name="github"
                value={resumeData.github}
                onChange={handleChange}
              />

              <div className="md:col-span-2 xl:col-span-3">
                <Input
                  label="Target Job Role"
                  name="jobRole"
                  value={resumeData.jobRole}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* EDUCATION */}
          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              🎓 Education
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              <Input
                label="Degree"
                name="degree"
                value={resumeData.degree}
                onChange={handleChange}
              />

              <Input
                label="College"
                name="college"
                value={resumeData.college}
                onChange={handleChange}
              />

              <Input
                label="Graduation Year"
                name="graduationYear"
                value={resumeData.graduationYear}
                onChange={handleChange}
              />

              <Input
                label="CGPA"
                name="cgpa"
                value={resumeData.cgpa}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* SKILLS */}
          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              🛠 Skills
            </h2>

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
                placeholder="Enter a skill"
                className="flex-1 min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={addSkill}
                className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Add Skill
              </button>
            </div>

            {resumeData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="max-w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center gap-2 text-sm break-all"
                  >
                    <span className="break-words">{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="font-bold hover:text-red-600 flex-shrink-0"
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* EXPERIENCE */}
          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              💼 Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              <Input
                label="Company"
                name="company"
                value={resumeData.company}
                onChange={handleChange}
              />

              <Input
                label="Role"
                name="role"
                value={resumeData.role}
                onChange={handleChange}
              />

              <Input
                label="Duration"
                name="duration"
                value={resumeData.duration}
                onChange={handleChange}
              />

              <Input
                label="Employment Type"
                name="employmentType"
                value={resumeData.employmentType}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* PROJECT */}
          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              🚀 Project
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              <Input
                label="Project Title"
                name="projectTitle"
                value={resumeData.projectTitle}
                onChange={handleChange}
              />

              <Input
                label="Project Technologies"
                name="projectTech"
                value={resumeData.projectTech}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* JOB DESCRIPTION */}
          <section className="mt-10">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">
              📋 Job Description
            </h2>

            <textarea
              name="jobDescription"
              value={resumeData.jobDescription}
              onChange={handleChange}
              rows={10}
              placeholder="Paste the complete job description here..."
              className="w-full min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base leading-6 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            />

            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-5">
              AI will identify relevant keywords and tailor your resume
              without inventing experience or skills.
            </p>
          </section>

          {/* GENERATE BUTTON */}
          <div className="mt-8 flex justify-stretch sm:justify-end">
            <button
              type="button"
              onClick={generateResume}
              disabled={loading}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading
                ? "Generating Resume..."
                : "Generate JD Resume"}
            </button>
          </div>
        </div>

        {/* GENERATED RESUME */}
        {generatedResume && (
          <section
            id="generated-resume-section"
            className="mt-8 sm:mt-10 lg:mt-12 min-w-0"
          >
            {/* RESUME HEADER */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 break-words">
                    Your JD-Tailored Resume
                  </h2>

                  <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    AI has tailored your resume to the job description.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full lg:w-auto flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* RESUME PREVIEW */}
            <div className="w-full min-w-0 bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
              <div
                id="resume-preview"
                className="w-full min-w-0 p-3 sm:p-6 lg:p-10 xl:p-12 overflow-x-auto"
              >
                <div className="min-w-0 w-full">
                  <GeneratedResume
                    resume={generatedResume}
                    user={resumeData}
                  />
                </div>
              </div>
            </div>

            {/* JD MATCH ANALYSIS */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                🎯 JD Match Analysis
              </h2>

              <p className="text-gray-500 mt-1 text-sm sm:text-base leading-6">
                See how your existing profile matches the job description.
              </p>

              {/* MATCHED SKILLS */}
              {generatedResume.matchedSkills?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Matched Skills
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    These are skills from your existing profile that match
                    the job description.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedResume.matchedSkills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="max-w-full bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm break-words"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* SUGGESTED SKILLS */}
              {generatedResume.suggestedSkills?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Suggested Skills
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Useful skills for this role that you are not currently
                    claiming as your own.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {generatedResume.suggestedSkills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="max-w-full bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm break-words"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* NO ANALYSIS */}
              {!generatedResume.matchedSkills?.length &&
                !generatedResume.suggestedSkills?.length && (
                  <p className="mt-6 text-gray-500 text-sm">
                    No additional JD analysis is available.
                  </p>
                )}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-10 sm:mt-12 bg-gray-900 text-white py-6 px-4 text-center">
        <p className="text-sm sm:text-base">
          CareerCompass AI Resume Builder
        </p>

        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Build ATS-friendly resumes tailored to your career goals.
        </p>
      </footer>
    </div>
  );
}

/* REUSABLE INPUT */
function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="min-w-0 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full min-w-0 border border-gray-300 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default JDResumeBuilder;
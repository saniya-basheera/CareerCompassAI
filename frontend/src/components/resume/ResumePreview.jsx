import { downloadResume } from "../utils/downloadResume";
import ResumePreview from "../components/resume/ResumePreview";
function ResumePreview({ resumeData, aiResume }) {
  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">

      <h1 className="text-4xl font-bold">
        {resumeData.fullName}
      </h1>

      <p className="text-gray-600 mt-2">
        {resumeData.email} | {resumeData.phone}
      </p>

      <p className="text-gray-600">
        {resumeData.location}
      </p>

      <p className="text-gray-600">
        {resumeData.linkedin}
      </p>

      <p className="text-gray-600">
        {resumeData.github}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-600">
        Professional Summary
      </h2>

      <p className="mt-3">
        {aiResume.summary}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-600">
        Skills
      </h2>

      <div className="flex flex-wrap gap-2 mt-4">
        {[...resumeData.skills, ...aiResume.skills].map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-600">
        Experience
      </h2>

      <p className="font-semibold mt-4">
        {resumeData.role} • {resumeData.company}
      </p>

      <ul className="list-disc ml-6 mt-3">
        {aiResume.experience.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-600">
        Project
      </h2>

      <p className="font-semibold mt-4">
        {resumeData.projectTitle}
      </p>

      <p className="text-gray-500">
        {resumeData.projectTech}
      </p>

      <ul className="list-disc ml-6 mt-3">
        {aiResume.project.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-600">
        Education
      </h2>

      <p>{resumeData.degree}</p>
      <p>{resumeData.college}</p>
      <p>CGPA: {resumeData.cgpa}</p>
      <p>Graduation: {resumeData.graduationYear}</p>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => downloadResume(resumeData, aiResume)}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
        >
          📄 Download Resume
        </button>
      </div>

    </div>
  );
}

export default ResumePreview;
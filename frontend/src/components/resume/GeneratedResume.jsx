import { downloadResume } from "../../utils/downloadResume";

function GeneratedResume({ resume, user }) {
  if (!resume) return null;

  return (
    <div>
      {/* Resume Preview */}
      <div
        id="resume-preview"
        className="bg-white p-10"
      >
        {/* Header */}
        <div className="border-b pb-5 mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            {user.fullName}
          </h1>

          <p className="text-gray-600 mt-2">
            {user.email} • {user.phone}
          </p>

          <p className="text-gray-600">
            {user.location}
          </p>

          <p className="text-blue-600 mt-2">
            {user.linkedin}
          </p>

          <p className="text-blue-600">
            {user.github}
          </p>
        </div>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2">
            Professional Summary
          </h2>

          <p className="mt-3 text-gray-700 leading-7">
            {resume.summary}
          </p>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2 mt-4">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-2 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2">
            Experience
          </h2>

          <h3 className="font-semibold mt-4">
            {user.role} • {user.company}
          </h3>

          <p className="text-gray-500 text-sm">
            {user.duration}
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            {resume.experience.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b pb-2">
            Projects
          </h2>

          <h3 className="font-semibold mt-4">
            {user.projectTitle}
          </h3>

          <p className="text-gray-500">
            {user.projectTech}
          </p>

          <ul className="list-disc ml-6 mt-3 space-y-2">
            {resume.project.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => downloadResume(user, resume)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md"
        >
          Download Resume PDF
        </button>
      </div>
    </div>
  );
}

export default GeneratedResume;
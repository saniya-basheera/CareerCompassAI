function ResumePreview({ resumeData, aiResume }) {
  return (
    <div id="resume-preview" className="bg-white">

      <h1 className="text-4xl font-bold">
        {resumeData.fullName}
      </h1>

      <p className="text-gray-600 mt-2">
        {resumeData.email} | {resumeData.phone}
      </p>

      <p className="text-gray-600">
        {resumeData.location}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-700">
        Professional Summary
      </h2>

      <p className="mt-3 text-gray-700">
        {aiResume.summary}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-700">
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

      <h2 className="text-2xl font-bold text-blue-700">
        Experience
      </h2>

      <h3 className="font-semibold mt-4">
        {resumeData.role}
      </h3>

      <p className="text-gray-500">
        {resumeData.company}
      </p>

      <ul className="list-disc ml-6 mt-3">
        {aiResume.experience.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-700">
        Projects
      </h2>

      <h3 className="font-semibold mt-4">
        {resumeData.projectTitle}
      </h3>

      <p className="text-gray-500">
        {resumeData.projectTech}
      </p>

      <ul className="list-disc ml-6 mt-3">
        {aiResume.project.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-bold text-blue-700">
        Education
      </h2>

      <p className="mt-3">
        {resumeData.degree}
      </p>

      <p>
        {resumeData.college}
      </p>

      <p>
        CGPA: {resumeData.cgpa}
      </p>

      <p>
        Graduation Year: {resumeData.graduationYear}
      </p>

    </div>
  );
}

export default ResumePreview;
function Projects({ resumeData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <input
        type="text"
        name="projectTitle"
        value={resumeData.projectTitle}
        onChange={handleChange}
        placeholder="Project Title"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="projectTech"
        value={resumeData.projectTech}
        onChange={handleChange}
        placeholder="Technologies Used (React, Node.js, MongoDB...)"
        className="border rounded-xl p-3"
      />

      <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-700 mb-2">
          🤖 AI will automatically generate:
        </h3>

        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Professional project description</li>
          <li>Resume-ready bullet points</li>
          <li>Impact-focused achievements</li>
        </ul>
      </div>
    </div>
  );
}

export default Projects;
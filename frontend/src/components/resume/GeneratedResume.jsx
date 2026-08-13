function GeneratedResume({ resume, user }) {
  if (!resume || !user) return null;

  // Only the candidate's actual skills are shown.
  // matchedSkills and suggestedSkills are intentionally NOT included.
  const uniqueSkills = [...new Set(resume.skills || [])];

  return (
    <div className="w-full max-w-[850px] mx-auto bg-white text-gray-900 overflow-visible">

      {/* Header */}
      <div className="border-b pb-5 mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold break-words">
          {user.fullName || "Your Name"}
        </h1>

        <p className="text-gray-600 mt-2 break-words">
          {user.email} {user.email && user.phone && "•"} {user.phone}
        </p>

        {user.location && (
          <p className="text-gray-600 break-words">
            {user.location}
          </p>
        )}

        {user.linkedin && (
          <p className="text-blue-600 mt-2 break-all">
            {user.linkedin}
          </p>
        )}

        {user.github && (
          <p className="text-blue-600 break-all">
            {user.github}
          </p>
        )}
      </div>

      {/* Professional Summary */}
      {resume.summary && (
        <section className="mb-6 resume-section avoid-break">
          <h2 className="text-xl font-bold border-b pb-2">
            Professional Summary
          </h2>

          <p className="mt-3 text-gray-700 leading-7">
            {resume.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {uniqueSkills.length > 0 && (
        <section className="mb-6 resume-section avoid-break">
          <h2 className="text-xl font-bold border-b pb-2">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2 mt-4">
            {uniqueSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 px-3 py-2 rounded-lg text-sm break-words"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experience?.length > 0 && (
        <section className="mb-6 resume-section avoid-break">
          <h2 className="text-xl font-bold border-b pb-2">
            Experience
          </h2>

          <h3 className="font-semibold mt-4 break-words">
            {user.role}
            {user.company && ` • ${user.company}`}
          </h3>

          {user.duration && (
            <p className="text-gray-500 text-sm">
              {user.duration}
            </p>
          )}

          <ul className="list-disc ml-5 sm:ml-6 mt-3 space-y-2">
            {resume.experience.map((item, index) => (
              <li
                key={index}
                className="text-gray-700 leading-6 break-words"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {resume.project?.length > 0 && (
        <section className="mb-6 resume-section avoid-break">
          <h2 className="text-xl font-bold border-b pb-2">
            Projects
          </h2>

          <h3 className="font-semibold mt-4 break-words">
            {user.projectTitle}
          </h3>

          {user.projectTech && (
            <p className="text-gray-500 break-words">
              {user.projectTech}
            </p>
          )}

          <ul className="list-disc ml-5 sm:ml-6 mt-3 space-y-2">
            {resume.project.map((item, index) => (
              <li
                key={index}
                className="text-gray-700 leading-6 break-words"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      <section className="resume-section avoid-break">
        <h2 className="text-xl font-bold border-b pb-2">
          Education
        </h2>

        {user.degree && (
          <p className="mt-3 break-words">
            {user.degree}
          </p>
        )}

        {user.college && (
          <p className="break-words">
            {user.college}
          </p>
        )}

        {user.cgpa && (
          <p>
            CGPA: {user.cgpa}
          </p>
        )}

        {user.graduationYear && (
          <p>
            Graduation Year: {user.graduationYear}
          </p>
        )}
      </section>

    </div>
  );
}

export default GeneratedResume;
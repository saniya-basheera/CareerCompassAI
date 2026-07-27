function Experience({ resumeData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <input
        type="text"
        name="company"
        value={resumeData.company}
        onChange={handleChange}
        placeholder="Company Name"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="role"
        value={resumeData.role}
        onChange={handleChange}
        placeholder="Job Title"
        className="border rounded-xl p-3"
      />

      <select
        name="employmentType"
        value={resumeData.employmentType}
        onChange={handleChange}
        className="border rounded-xl p-3"
      >
        <option value="">Employment Type</option>
        <option>Internship</option>
        <option>Full-Time</option>
        <option>Part-Time</option>
        <option>Freelance</option>
      </select>

      <input
        type="text"
        name="duration"
        value={resumeData.duration}
        onChange={handleChange}
        placeholder="Duration (e.g. Jan 2024 - Present)"
        className="border rounded-xl p-3"
      />
    </div>
  );
}

export default Experience;
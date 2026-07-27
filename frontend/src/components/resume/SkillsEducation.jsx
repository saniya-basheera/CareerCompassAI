function SkillsEducation({ resumeData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <input
        type="text"
        name="degree"
        value={resumeData.degree}
        onChange={handleChange}
        placeholder="Degree (B.Tech, MBA, BCA...)"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="college"
        value={resumeData.college}
        onChange={handleChange}
        placeholder="College / University"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="graduationYear"
        value={resumeData.graduationYear}
        onChange={handleChange}
        placeholder="Graduation Year"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="cgpa"
        value={resumeData.cgpa}
        onChange={handleChange}
        placeholder="CGPA / Percentage"
        className="border rounded-xl p-3"
      />
    </div>
  );
}

export default SkillsEducation;
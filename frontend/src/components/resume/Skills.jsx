function Skills({
  skillInput,
  setSkillInput,
  addSkill,
  removeSkill,
  resumeData,
}) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-4">
        Skills
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Type a skill (e.g. React)"
          className="flex-1 border border-gray-300 rounded-xl p-3"
        />

        <button
          type="button"
          onClick={addSkill}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
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
    </div>
  );
}

export default Skills;
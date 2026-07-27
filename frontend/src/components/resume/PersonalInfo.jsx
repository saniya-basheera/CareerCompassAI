function PersonalInfo({ resumeData, handleChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <input
        type="text"
        name="fullName"
        value={resumeData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="border rounded-xl p-3"
      />

      <input
        type="email"
        name="email"
        value={resumeData.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="phone"
        value={resumeData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="location"
        value={resumeData.location}
        onChange={handleChange}
        placeholder="Location"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="linkedin"
        value={resumeData.linkedin}
        onChange={handleChange}
        placeholder="LinkedIn URL"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="github"
        value={resumeData.github}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="border rounded-xl p-3"
      />

      <input
        type="text"
        name="jobRole"
        value={resumeData.jobRole}
        onChange={handleChange}
        placeholder="Target Job Role"
        className="border rounded-xl p-3 md:col-span-2"
      />
    </div>
  );
}

export default PersonalInfo;
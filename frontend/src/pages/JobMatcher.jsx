import { useState } from "react";
import axios from "axios";

function JobMatcher() {
  const [formData, setFormData] = useState({
    jobRole: "",
    skills: "",
    experience: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkMatch = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://careercompassai-tupf.onrender.com/job-match",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze job match.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          🎯 AI Job Matcher
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Check how well your profile matches your dream job.
        </p>

        <div className="mt-10 space-y-6">

          <div>
            <label className="font-semibold">
              Target Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="Example: Data Scientist"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Skills
            </label>

            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows="4"
              placeholder="Python, SQL, Machine Learning..."
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Experience
            </label>

            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="4"
              placeholder="Describe your work experience..."
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <button
            onClick={checkMatch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg"
          >
            {loading ? "Analyzing..." : "🚀 Analyze Match"}
          </button>

        </div>

        {result && (

          <div className="mt-10 space-y-6">

            <div className="bg-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-blue-700">
                🎯 Match Score
              </h2>

              <p className="text-5xl font-bold mt-3">
                {result.matchScore}%
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-green-700 mb-3">
                ✅ Strengths
              </h2>

              <ul className="list-disc ml-6">
                {result.strengths.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-700 mb-3">
                📉 Missing Skills
              </h2>

              <ul className="list-disc ml-6">
                {result.missingSkills.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-yellow-700 mb-3">
                🚀 Recommendations
              </h2>

              <ul className="list-disc ml-6">
                {result.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default JobMatcher;
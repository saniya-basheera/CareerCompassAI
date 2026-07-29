import { useState } from "react";
import axios from "axios";

function CourseRecommendation() {
  const [formData, setFormData] = useState({
    jobRole: "",
    currentSkills: "",
  });

  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getRecommendations = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://https://careercompassai-tupf.onrender.com/course-recommendation",
        formData
      );

      setRecommendations(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          📚 AI Course Recommendation
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Get personalized courses, projects, YouTube resources and certifications
          based on your career goal.
        </p>

        {/* FORM */}

        <div className="mt-10 grid md:grid-cols-2 gap-8">

          <div>
            <label className="block font-semibold mb-2">
              Target Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="Example: Data Scientist"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Current Skills
            </label>

            <textarea
              name="currentSkills"
              value={formData.currentSkills}
              onChange={handleChange}
              rows={5}
              placeholder="Python, SQL, HTML, CSS..."
              className="w-full border rounded-xl p-3"
            />
          </div>

        </div>

        <button
          onClick={getRecommendations}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {loading ? "Generating..." : "🚀 Get AI Recommendations"}
        </button>

        {/* RESULTS */}

        {recommendations && (

          <div className="mt-12 grid md:grid-cols-2 gap-8">

            {/* Courses */}

            <div className="bg-blue-50 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                📘 Recommended Courses
              </h2>

              <ul className="space-y-2 list-disc ml-5">
                {recommendations.courses?.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}

            <div className="bg-green-50 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                🚀 Practice Projects
              </h2>

              <ul className="space-y-2 list-disc ml-5">
                {recommendations.projects?.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>

            {/* YouTube */}

            <div className="bg-yellow-50 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-yellow-700 mb-4">
                🎥 YouTube Resources
              </h2>

              <ul className="space-y-2 list-disc ml-5">
                {recommendations.youtube?.map((video, index) => (
                  <li key={index}>{video}</li>
                ))}
              </ul>
            </div>

            {/* Certifications */}

            <div className="bg-purple-50 rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                🏆 Certifications
              </h2>

              <ul className="space-y-2 list-disc ml-5">
                {recommendations.certifications?.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default CourseRecommendation;
function Modal({ open, onClose, feature }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] rounded-2xl shadow-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-4xl font-bold text-blue-600">
          {feature.title}
        </h2>

        <p className="mt-4 text-gray-600 text-lg">
          {feature.description}
        </p>

        <div className="mt-8">

          {feature.id === "roadmap" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Roadmap Preview
              </h3>

              <div className="space-y-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  📘 Learn Python
                </div>

                <div className="bg-blue-100 p-3 rounded-lg">
                  🗄️ Master SQL
                </div>

                <div className="bg-blue-100 p-3 rounded-lg">
                  📊 Data Analysis
                </div>
              </div>

              <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
                Generate Roadmap
              </button>
            </>
          )}

          {feature.id === "courses" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Free Courses
              </h3>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  🎓 Coursera Courses
                </div>

                <div className="border rounded-lg p-3">
                  🎥 YouTube Playlists
                </div>

                <div className="border rounded-lg p-3">
                  📚 freeCodeCamp
                </div>
              </div>

              <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700">
                View Courses
              </button>
            </>
          )}

          {feature.id === "projects" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Project Ideas
              </h3>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  🤖 AI Chatbot
                </div>

                <div className="border rounded-lg p-3">
                  📊 Sales Dashboard
                </div>

                <div className="border rounded-lg p-3">
                  🌐 Portfolio Website
                </div>
              </div>

              <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700">
                Explore Projects
              </button>
            </>
          )}

          {feature.id === "resume" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Resume Builder
              </h3>

              <div className="border rounded-xl p-5 bg-gray-100">
                📄 Professional ATS-Friendly Resume Template
              </div>

              <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700">
                Build Resume
              </button>
            </>
          )}

          {feature.id === "interview" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Interview Preparation
              </h3>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  💬 HR Interview Questions
                </div>

                <div className="border rounded-lg p-3">
                  💻 Technical Interview
                </div>

                <div className="border rounded-lg p-3">
                  🎤 Mock Interview
                </div>
              </div>

              <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700">
                Start Practice
              </button>
            </>
          )}

          {feature.id === "jobs" && (
            <>
              <h3 className="text-2xl font-semibold mb-4">
                Latest Job Openings
              </h3>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  💼 Data Analyst – Infosys
                </div>

                <div className="border rounded-lg p-3">
                  💼 AI Engineer – Google
                </div>

                <div className="border rounded-lg p-3">
                  💼 Software Developer – Microsoft
                </div>
              </div>

              <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700">
                View Jobs
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Modal;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [jobRole, setJobRole] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (jobRole.trim() === "") {
      alert("Please enter a job role.");
      return;
    }

    navigate("/dashboard", {
      state: { jobRole },
    });
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 pb-16 sm:pb-20">
      <div className="w-full max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            <input
              type="text"
              placeholder="Enter your dream career (e.g. Data Analyst)"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGenerate();
                }
              }}
              className="w-full flex-1 border border-gray-300 rounded-xl px-4 py-3 sm:py-4 outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />

            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-blue-700 transition font-semibold whitespace-nowrap"
            >
              Generate Roadmap
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;
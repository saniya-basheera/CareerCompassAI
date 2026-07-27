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
    <div className="flex justify-center -mt-8 relative z-10">
      <div className="bg-white shadow-xl rounded-2xl p-6 flex gap-4 w-3/4 max-w-4xl">

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
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Generate Roadmap
        </button>

      </div>
    </div>
  );
}

export default SearchBar;
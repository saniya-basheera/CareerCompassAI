import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const jobRole = location.state?.jobRole || "No Career Selected";

  const [jobs, setJobs] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [interview, setInterview] = useState([]);
  const [jobMatch, setJobMatch] = useState(null);
  const [userSkills, setUserSkills] = useState("");
  const [loading, setLoading] = useState(true);
  const [matchLoading, setMatchLoading] = useState(false);

  // --------------------------------
  // JOB MATCH
  // --------------------------------
  const generateJobMatch = async () => {
    if (!userSkills.trim()) {
      alert("Please enter your skills");
      return;
    }

    try {
      setMatchLoading(true);

      const response = await axios.post(
        "https://careercompassai-tupf.onrender.com/job-match",
        {
          jobRole,
          skills: userSkills,
          experience: "Fresher",
        }
      );

      setJobMatch(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to analyze job match.");
    } finally {
      setMatchLoading(false);
    }
  };

  // --------------------------------
  // LOAD DASHBOARD
  // --------------------------------
  useEffect(() => {
    if (jobRole === "No Career Selected") {
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      try {
        const [roadmapRes, interviewRes, jobsRes] =
          await Promise.all([
            axios.post(
              "https://careercompassai-tupf.onrender.com/generate-roadmap",
              {
                jobRole,
              }
            ),

            axios.post(
              "https://careercompassai-tupf.onrender.com/generate-interview",
              {
                jobRole,
              }
            ),

            axios.post(
              "https://careercompassai-tupf.onrender.com/job-openings",
              {
                jobRole,
                location: "India",
              }
            ),
          ]);

        setRoadmap(roadmapRes.data.roadmap || []);
        setCourses(roadmapRes.data.courses || []);
        setProjects(roadmapRes.data.projects || []);

        setInterview(
          Array.isArray(interviewRes.data)
            ? interviewRes.data
            : []
        );

        setJobs(
          Array.isArray(jobsRes.data)
            ? jobsRes.data
            : []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [jobRole]);

  // --------------------------------
  // LOADING SCREEN
  // --------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-blue-600 mx-auto mb-5"></div>

          <h2 className="text-xl sm:text-3xl font-bold text-blue-700">
            AI is generating your Career Dashboard...
          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // DASHBOARD
  // --------------------------------
  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 sm:px-6 sm:py-7 lg:px-8 xl:px-10">

      <div className="w-full max-w-[1800px] mx-auto">

        {/* HEADER */}
        <div className="text-center mb-7 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-blue-700">
            🚀 Career Dashboard
          </h1>

          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            Your AI powered career guide
          </p>
        </div>

        {/* TARGET ROLE */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-7 lg:p-8 mb-7 sm:mb-10">
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
            Target Career
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mt-2 break-words">
            {jobRole}
          </h1>
        </div>

        {/* =====================================================
            ROADMAP + COURSES
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* ROADMAP */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-7">

            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-5">
              🗺️ AI Career Roadmap
            </h2>

            <div className="space-y-4 max-h-[500px] sm:max-h-[550px] lg:max-h-[650px] overflow-y-auto pr-1 sm:pr-2">

              {roadmap.length === 0 ? (
                <p className="text-gray-500">
                  No roadmap generated.
                </p>
              ) : (
                roadmap.map((step, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-2xl p-4 flex gap-3 sm:gap-4 items-start"
                  >
                    <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-6 pt-1">
                      {step}
                    </p>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* COURSES */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-7">

            <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-5">
              📚 Recommended Courses
            </h2>

            <div className="space-y-5 max-h-[500px] sm:max-h-[550px] lg:max-h-[650px] overflow-y-auto pr-1 sm:pr-2">

              {courses.length === 0 ? (
                <p className="text-gray-500">
                  No courses available.
                </p>
              ) : (
                courses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5"
                  >

                    <h3 className="text-lg sm:text-xl font-bold text-green-800 break-words">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base">
                      Platform:
                      <span className="font-semibold ml-2">
                        {course.platform}
                      </span>
                    </p>

                    {course.url && (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 sm:mt-5 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base transition"
                      >
                        Open Course →
                      </a>
                    )}

                  </div>
                ))
              )}

            </div>
          </div>

        </div>

        {/* =====================================================
            PROJECTS
        ====================================================== */}

        <div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-7">

          <h2 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-5 sm:mb-6">
            💡 Portfolio Projects
          </h2>

          <div className="space-y-6 max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] overflow-y-auto pr-1 sm:pr-2">

            {projects.length === 0 ? (
              <p className="text-gray-500">
                No projects generated.
              </p>
            ) : (
              projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 sm:p-6"
                >

                  <h3 className="text-xl sm:text-2xl font-bold text-amber-800 break-words">
                    🚀 {project.title}
                  </h3>

                  <p className="mt-4 text-gray-700 text-sm sm:text-base leading-6">
                    {project.description}
                  </p>

                  {project.difficulty && (
                    <p className="mt-4 text-sm sm:text-base">
                      <span className="font-bold">
                        Difficulty:
                      </span>{" "}
                      {project.difficulty}
                    </p>
                  )}

                  {/* TECH STACK */}
                  {project.techStack?.length > 0 && (
                    <div className="mt-5">
                      <h4 className="font-bold mb-3">
                        Tech Stack
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GITHUB IDEA */}
                  {project.githubIdea && (
                    <div className="mt-6 bg-white rounded-xl p-4">
                      <h4 className="font-bold text-green-700 mb-2">
                        GitHub Project Idea
                      </h4>

                      <p className="text-sm sm:text-base leading-6">
                        {project.githubIdea}
                      </p>
                    </div>
                  )}

                  {/* GITHUB REPOSITORIES */}
                  {project.githubRepositories?.length > 0 && (
                    <div className="mt-5 bg-gray-50 rounded-xl p-4">

                      <h4 className="font-bold text-blue-700 mb-3">
                        🔗 GitHub Repositories
                      </h4>

                      <div className="space-y-3">

                        {project.githubRepositories.map(
                          (repo, i) => (
                            <a
                              key={i}
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block bg-white border rounded-xl p-4 hover:bg-blue-50 transition"
                            >

                              <div className="font-semibold text-blue-600 break-words">
                                {repo.name}
                              </div>

                              <div className="text-sm text-gray-500 break-all mt-1">
                                {repo.url}
                              </div>

                            </a>
                          )
                        )}

                      </div>
                    </div>
                  )}

                </div>
              ))
            )}

          </div>
        </div>

        {/* =====================================================
            INTERVIEW QUESTIONS
        ====================================================== */}

        <div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-7">

          <h2 className="text-xl sm:text-2xl font-bold text-purple-700 mb-5 sm:mb-6">
            🎤 AI Interview Questions
          </h2>

          <div className="space-y-4 max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] overflow-y-auto pr-1 sm:pr-2">

            {interview.length === 0 ? (
              <p className="text-gray-500">
                No interview questions generated.
              </p>
            ) : (
              interview.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-purple-50 rounded-2xl p-4 sm:p-5"
                >

                  <h3 className="font-bold text-purple-800">
                    Question {item.id || index + 1}
                  </h3>

                  <p className="mt-3 text-gray-700 text-sm sm:text-base leading-6">
                    {item.question || item}
                  </p>

                </div>
              ))
            )}

          </div>
        </div>

        {/* =====================================================
            JOB MATCHER
        ====================================================== */}

        <div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-green-700">
            🎯 Job Match Analyzer
          </h2>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Enter your current skills and check how well you match this role.
          </p>

          <textarea
            value={userSkills}
            onChange={(e) => setUserSkills(e.target.value)}
            placeholder="Example: Python, SQL, Machine Learning, React, Git"
            className="mt-5 w-full border border-gray-300 rounded-xl p-4 h-32 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={generateJobMatch}
            disabled={matchLoading}
            className="mt-5 w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition"
          >
            {matchLoading
              ? "Analyzing..."
              : "Analyze Match →"}
          </button>

          {jobMatch && (
            <div className="mt-8">

              {/* SCORE */}
              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="font-bold text-xl">
                  Match Score
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-2">
                  {jobMatch.matchScore}%
                </p>
              </div>

              {/* STRENGTHS */}
              {jobMatch.strengths?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-blue-700 text-xl">
                    💪 Strengths
                  </h3>

                  {jobMatch.strengths.map(
                    (item, index) => (
                      <p
                        key={index}
                        className="mt-2 text-sm sm:text-base"
                      >
                        • {item}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* MISSING SKILLS */}
              {jobMatch.missingSkills?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-red-700 text-xl">
                    📌 Missing Skills
                  </h3>

                  {jobMatch.missingSkills.map(
                    (item, index) => (
                      <p
                        key={index}
                        className="mt-2 text-sm sm:text-base"
                      >
                        • {item}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* RECOMMENDATIONS */}
              {jobMatch.recommendations?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-purple-700 text-xl">
                    🚀 Recommendations
                  </h3>

                  {jobMatch.recommendations.map(
                    (item, index) => (
                      <p
                        key={index}
                        className="mt-2 text-sm sm:text-base"
                      >
                        • {item}
                      </p>
                    )
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* =====================================================
            RESUME BUILDER
        ====================================================== */}

        <div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
            📄 AI Resume Builder
          </h2>

          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-6">
            Create an ATS-friendly professional resume tailored for your target role.
          </p>

          <button
            onClick={() => navigate("/resume-builder")}
            className="mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition"
          >
            Open Resume Builder →
          </button>

        </div>
{/* JD RESUME BUILDER */}
<div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8">

  <h2 className="text-2xl sm:text-3xl font-bold text-green-700">
    🎯 JD-Tailored Resume Builder
  </h2>

  <p className="text-gray-600 mt-4 text-sm sm:text-base">
    Paste a job description and let AI tailor your resume specifically
    for that job using your actual skills and experience.
  </p>

  <button
    onClick={() => navigate("/jd-resume-builder")}
    className="mt-6 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition"
  >
    Create JD-Tailored Resume →
  </button>

</div>


        {/* =====================================================
            MOCK INTERVIEW
        ====================================================== */}

        <div className="mt-6 lg:mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
            🎤 AI Mock Interview
          </h2>

          <p className="text-gray-600 mt-4 text-sm sm:text-base leading-6">
            Practice AI-powered technical and HR interview questions and receive instant feedback.
          </p>

          <button
            onClick={() =>
              navigate("/mock-interview", {
                state: { jobRole },
              })
            }
            className="mt-6 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition"
          >
            Start Mock Interview →
          </button>

        </div>

        {/* =====================================================
            JOB OPENINGS
        ====================================================== */}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 lg:p-8 mt-6 lg:mt-8">

          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
            💼 Job Openings
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-500">
              No jobs found.
            </p>
          ) : (
            <div className="space-y-6 max-h-[500px] sm:max-h-[600px] lg:max-h-[700px] overflow-y-auto pr-1 sm:pr-2">

              {jobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition"
                >

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                    {job.title}
                  </h3>

                  <p className="text-blue-600 font-semibold mt-1">
                    🏢 {job.company}
                  </p>

                  <p className="text-gray-600 mt-2">
                    📍 {job.location}
                  </p>

                  {(job.salary_min || job.salary_max) && (
                    <p className="text-green-600 mt-2">
                      💰 ₹{job.salary_min ?? "-"} - ₹
                      {job.salary_max ?? "-"}
                    </p>
                  )}

                  <p className="text-gray-700 mt-3 line-clamp-3 text-sm sm:text-base leading-6">
                    {job.description}
                  </p>

                  {job.apply_url && (
                    <a
                      href={job.apply_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Apply Now →
                    </a>
                  )}

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
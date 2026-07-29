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
const generateJobMatch = async () => {

  if (!userSkills.trim()) {
    alert("Please enter your skills");
    return;
  }

  try {

    const response = await axios.post(
      "http://https://careercompassai-tupf.onrender.com/job-match",
      {
        jobRole,
        skills: userSkills,
        experience: "Fresher"
      }
    );

    setJobMatch(response.data);

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {

    if (jobRole === "No Career Selected") {
      setLoading(false);
      return;
    }


    const loadDashboard = async () => {

      try {

        const roadmapRes = await axios.post(
          "http://https://careercompassai-tupf.onrender.com/generate-roadmap",
          {
            jobRole
          }
        );


        setRoadmap(roadmapRes.data.roadmap || []);
        setCourses(roadmapRes.data.courses || []);
        setProjects(roadmapRes.data.projects || []);



        const interviewRes = await axios.post(
          "http://https://careercompassai-tupf.onrender.com/generate-interview",
          {
            jobRole
          }
        );


        console.log(interviewRes.data);
setInterview(Array.isArray(interviewRes.data) ? interviewRes.data : []);

const jobsRes = await axios.post(
  "http://https://careercompassai-tupf.onrender.com/job-openings",
  {
    jobRole: jobRole,
    location: "India"
  }
);

setJobs(jobsRes.data);


      } catch (error) {

        console.log(error);

      }


      setLoading(false);

    };


    loadDashboard();


  }, [jobRole]);



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-100">

        <div className="text-center">

          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-5"></div>

          <h2 className="text-3xl font-bold text-blue-700">
            AI is generating your Career Dashboard...
          </h2>

          <p className="text-gray-600 mt-3">
            Please wait...
          </p>

        </div>

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-slate-100 p-10">


      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-5xl font-bold text-blue-700">
          🚀 Career Dashboard
        </h1>

        <p className="text-gray-600 mt-3">
          Your AI powered career guide
        </p>

      </div>



      {/* TARGET ROLE */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-gray-500 text-lg">
          Target Career
        </h2>

        <h1 className="text-4xl font-bold text-blue-600 mt-2">
          {jobRole}
        </h1>

      </div>



      <div className="grid lg:grid-cols-2 gap-8">



        {/* ROADMAP */}

        <div className="bg-white rounded-3xl shadow-xl p-6 h-[650px] overflow-y-auto">


          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            🗺️ AI Career Roadmap
          </h2>


          <div className="space-y-4">


            {roadmap.map((step, index) => (

              <div
                key={index}
                className="bg-blue-50 rounded-2xl p-4 flex gap-4"
              >

                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  {index + 1}
                </div>


                <p className="text-gray-700">
                  {step}
                </p>


              </div>

            ))}


          </div>


        </div>





        {/* COURSES */}

        <div className="bg-white rounded-3xl shadow-xl p-6 h-[650px] overflow-y-auto">


          <h2 className="text-2xl font-bold text-green-700 mb-6">
            📚 Recommended Courses
          </h2>



          <div className="space-y-5">


            {courses.map((course, index) => (

              <div
                key={index}
                className="bg-green-50 border border-green-200 rounded-2xl p-5"
              >


                <h3 className="text-xl font-bold text-green-800">
                  {course.title}
                </h3>


                <p className="mt-2">
                  Platform:
                  <span className="font-semibold ml-2">
                    {course.platform}
                  </span>
                </p>


                <a
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-5 bg-green-600 text-white px-5 py-2 rounded-lg"
                >
                  Open Course →
                </a>


              </div>

            ))}


          </div>


        </div>
        {/* PROJECTS */}

       <div className="mt-8 bg-white rounded-3xl shadow-xl p-6 h-[700px] overflow-y-auto">

          <h2 className="text-2xl font-bold text-yellow-700 mb-6">
            💡 Portfolio Projects
          </h2>


          <div className="space-y-6">


            {projects.map((project, index) => (

              <div
                key={index}
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
              >


                <h3 className="text-2xl font-bold text-amber-800">
                  🚀 {project.title}
                </h3>


                <p className="mt-4 text-gray-700">
                  {project.description}
                </p>


                <p className="mt-4">
                  <span className="font-bold">
                    Difficulty:
                  </span>{" "}
                  {project.difficulty}
                </p>



                <div className="mt-5">

                  <h4 className="font-bold mb-3">
                    Tech Stack
                  </h4>


                  <div className="flex flex-wrap gap-2">


                    {project.techStack?.map((tech, i) => (

                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>

                    ))}


                  </div>

                </div>
<div className="mt-6 bg-white rounded-xl p-4">

  <h4 className="font-bold text-green-700 mb-2">
    GitHub Project Idea
  </h4>

  <p>{project.githubIdea}</p>

</div>

{project.githubRepositories?.length > 0 && (

  <div className="mt-5 bg-gray-50 rounded-xl p-4">

    <h4 className="font-bold text-blue-700 mb-3">
      🔗 GitHub Repositories
    </h4>

    <div className="space-y-3">

      {project.githubRepositories.map((repo, i) => (

        <a
          key={i}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border rounded-xl p-4 hover:bg-blue-50 transition"
        >

          <div className="font-semibold text-blue-600">
            {repo.name}
          </div>

          <div className="text-sm text-gray-500 break-all">
            {repo.url}
          </div>

        </a>

      ))}

    </div>

  </div>

)}

              </div>


            ))}


          </div>


        </div>




        {/* INTERVIEW */}


        <div className="mt-8 bg-white rounded-3xl shadow-xl p-6 h-[700px] overflow-y-auto">


          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            🎤 AI Interview Questions
          </h2>


          <div className="space-y-4">


            {interview.map((item, index) => (


              <div
                key={item.id || index}
                className="bg-purple-50 rounded-2xl p-5"
              >


                <h3 className="font-bold text-purple-800">
                  Question {item.id || index + 1}
                </h3>


                <p className="mt-3 text-gray-700">
                  {item.question || item}
                </p>


              </div>


            ))}


          </div>


        </div>
        {/* JOB MATCHER */}

<div className="mt-8 bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-3xl font-bold text-green-700">
    🎯 Job Match Analyzer
  </h2>


  <p className="text-gray-600 mt-3">
    Enter your current skills and check how well you match this role.
  </p>


  <textarea
    value={userSkills}
    onChange={(e) => setUserSkills(e.target.value)}
    placeholder="Example: Python, SQL, Machine Learning, React, Git"
    className="mt-5 w-full border rounded-xl p-4 h-32"
  />


  <button
    onClick={generateJobMatch}
    className="mt-5 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
  >
    Analyze Match →
  </button>


  {jobMatch && (

    <div className="mt-8">

      <div className="bg-green-50 rounded-xl p-5">

        <h3 className="font-bold text-xl">
          Match Score
        </h3>

        <p className="text-4xl font-bold text-green-600 mt-2">
          {jobMatch.matchScore}%
        </p>

      </div>


      <div className="mt-6">

        <h3 className="font-bold text-blue-700 text-xl">
          💪 Strengths
        </h3>

        {jobMatch.strengths?.map((item,index)=>(
          <p key={index} className="mt-2">
            • {item}
          </p>
        ))}

      </div>


      <div className="mt-6">

        <h3 className="font-bold text-red-700 text-xl">
          📌 Missing Skills
        </h3>

        {jobMatch.missingSkills?.map((item,index)=>(
          <p key={index} className="mt-2">
            • {item}
          </p>
        ))}

      </div>


      <div className="mt-6">

        <h3 className="font-bold text-purple-700 text-xl">
          🚀 Recommendations
        </h3>

        {jobMatch.recommendations?.map((item,index)=>(
          <p key={index} className="mt-2">
            • {item}
          </p>
        ))}

      </div>


    </div>

  )}
  

</div>
        {/* RESUME BUILDER */}


        <div className="mt-8 bg-white rounded-3xl shadow-xl p-8">


          <h2 className="text-3xl font-bold text-blue-700">
            📄 AI Resume Builder
          </h2>


          <p className="text-gray-600 mt-4">
            Create an ATS-friendly professional resume tailored for your target role.
          </p>



          <button
            onClick={() => navigate("/resume-builder")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Open Resume Builder →
          </button>


        </div>

        {/* MOCK INTERVIEW */}

<div className="mt-8 bg-white rounded-3xl shadow-xl p-8">

  <h2 className="text-3xl font-bold text-blue-700">
    🎤 AI Mock Interview
  </h2>

  <p className="text-gray-600 mt-4">
    Practice AI-powered technical and HR interview questions and receive instant feedback.
  </p>

  <button
    onClick={() =>
      navigate("/mock-interview", {
        state: { jobRole },
      })
    }
    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition"
  >
    Start Mock Interview →
  </button>

</div>

       {/* JOB OPENINGS */}

<div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
  <h2 className="text-3xl font-bold text-blue-700 mb-6">
    💼 Job Openings
  </h2>

  {jobs.length === 0 ? (
    <p className="text-gray-500">No jobs found.</p>
  ) : (
    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="border rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
        >
          <h3 className="text-2xl font-bold text-gray-800">
            {job.title}
          </h3>

          <p className="text-blue-600 font-semibold">
            🏢 {job.company}
          </p>

          <p className="text-gray-600 mt-2">
            📍 {job.location}
          </p>

          {(job.salary_min || job.salary_max) && (
            <p className="text-green-600 mt-2">
              💰 ₹{job.salary_min ?? "-"} - ₹{job.salary_max ?? "-"}
            </p>
          )}

          <p className="text-gray-700 mt-3 line-clamp-3">
            {job.description}
          </p>

          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Now →
          </a>
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
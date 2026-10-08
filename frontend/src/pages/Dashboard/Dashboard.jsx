import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://careercompassai-tupf.onrender.com"; 
 
function Dashboard() { 
  const location = useLocation(); 
  const navigate = useNavigate(); 
 
  const jobRole = location.state?.jobRole || "No Career Selected"; 
 
  // ========================================================= 
  // STATE 
  // ========================================================= 
 
  const [jobs, setJobs] = useState([]); 
  const [roadmap, setRoadmap] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [projects, setProjects] = useState([]); 
  const [interview, setInterview] = useState([]); 
 
  const [jobMatch, setJobMatch] = useState(null); 
  const [userSkills, setUserSkills] = useState(""); 
 
  const [loading, setLoading] = useState(true); 
  const [matchLoading, setMatchLoading] = useState(false); 
 
  // Midnight is the default 
  const [theme, setTheme] = useState(() => { 
    return localStorage.getItem("careercompass-theme") || "midnight"; 
  }); 
 
  // ========================================================= 
  // THEME 
  // ========================================================= 
 
  useEffect(() => { 
    localStorage.setItem("careercompass-theme", theme); 
  }, [theme]); 
 
  const isMidnight = theme === "midnight"; 
 
  const colors = { 
    page: isMidnight 
      ? "bg-[#030B1C] text-white" 
      : "bg-slate-50 text-slate-900", 
 
    header: isMidnight 
      ? "border-[#1B3155] bg-[#050F24]" 
      : "border-slate-200 bg-white", 
 
    headerText: isMidnight 
      ? "text-white" 
      : "text-slate-950", 
 
    muted: isMidnight 
      ? "text-slate-400" 
      : "text-slate-500", 
 
    card: isMidnight 
      ? "border-[#1B3155] bg-[#07152F]" 
      : "border-slate-200 bg-white", 
 
    cardTitle: isMidnight 
      ? "text-white" 
      : "text-slate-950", 
 
    cardText: isMidnight 
      ? "text-slate-300" 
      : "text-slate-600", 
 
    input: isMidnight 
      ? "border-[#263E65] bg-[#091B39] text-white placeholder:text-slate-500" 
      : "border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400", 
 
    soft: isMidnight 
      ? "border-[#263E65] bg-[#0B1D3B]" 
      : "border-slate-200 bg-slate-50", 
 
    softText: isMidnight 
      ? "text-slate-200" 
      : "text-slate-700", 
 
    border: isMidnight 
      ? "border-[#263E65]" 
      : "border-slate-200", 
  }; 
 
  // ========================================================= 
  // JOB MATCH 
  // ========================================================= 
 
  const generateJobMatch = async () => { 
    if (!userSkills.trim()) { 
      alert("Please enter your skills"); 
      return; 
    } 
 
    try { 
      setMatchLoading(true); 
 
      const response = await axios.post(`${API}/job-match`, { 
        jobRole, 
        skills: userSkills, 
        experience: "Fresher", 
      }); 
 
      setJobMatch(response.data); 
    } catch (error) { 
      console.log(error); 
      alert("Failed to analyze job match."); 
    } finally { 
      setMatchLoading(false); 
    } 
  }; 
 
  // ========================================================= 
  // LOAD DASHBOARD 
  // ========================================================= 
 
  useEffect(() => { 
    if (jobRole === "No Career Selected") { 
      setLoading(false); 
      return; 
    } 
 
    const loadDashboard = async () => { 
      try { 
        const [roadmapRes, interviewRes, jobsRes] = 
          await Promise.all([ 
            axios.post(`${API}/generate-roadmap`, { 
              jobRole, 
            }), 
 
            axios.post(`${API}/generate-interview`, { 
              jobRole, 
            }), 
 
            axios.post(`${API}/job-openings`, { 
              jobRole, 
              location: "India", 
            }), 
          ]); 
 
        // ===================================================== 
        // ROADMAP DATA 
        // ===================================================== 
 
        const roadmapData = roadmapRes.data || {}; 
 
        setRoadmap( 
          Array.isArray(roadmapData.roadmap) 
            ? roadmapData.roadmap 
            : [] 
        ); 
 
        setCourses( 
          Array.isArray(roadmapData.courses) 
            ? roadmapData.courses 
            : [] 
        ); 
 
        // ===================================================== 
        // PROJECT DATA 
        // ===================================================== 
 
        const projectData = 
          roadmapData.projects || 
          roadmapData.projectRecommendations || 
          roadmapData.project_ideas || 
          []; 
 
        setProjects( 
          Array.isArray(projectData) 
            ? projectData 
            : [] 
        ); 
 
        // ===================================================== 
        // INTERVIEW DATA 
        // ===================================================== 
 
        const interviewData = interviewRes.data; 
 
        if (Array.isArray(interviewData)) { 
          setInterview(interviewData); 
        } else if ( 
          Array.isArray(interviewData?.questions) 
        ) { 
          setInterview(interviewData.questions); 
        } else { 
          setInterview([]); 
        } 
 
        // ===================================================== 
        // JOB DATA 
        // ===================================================== 
 
        const jobsData = jobsRes.data; 
 
        if (Array.isArray(jobsData)) { 
          setJobs(jobsData); 
        } else if (Array.isArray(jobsData?.jobs)) { 
          setJobs(jobsData.jobs); 
        } else { 
          setJobs([]); 
        } 
 
        console.log( 
          "ROADMAP RESPONSE:", 
          roadmapData 
        ); 
 
        console.log( 
          "PROJECTS RECEIVED:", 
          projectData 
        ); 
 
        console.log( 
          "JOBS RECEIVED:", 
          jobsData 
        ); 
      } catch (error) { 
        console.log("Dashboard loading error:", error); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    loadDashboard(); 
  }, [jobRole]); 
 
  // ========================================================= 
  // LOADING 
  // ========================================================= 
 
  if (loading) { 
    return ( 
      <div 
        className={`min-h-screen flex items-center justify-center px-6 ${colors.page}`} 
      > 
        <div className="w-full max-w-md text-center"> 
 
          <div 
            className={`mx-auto mb-6 h-14 w-14 rounded-full border-4 ${ 
              isMidnight 
                ? "border-[#20385E] border-t-blue-500" 
                : "border-slate-200 border-t-blue-600" 
            } animate-spin`} 
          /> 
 
          <h2 
            className={`text-2xl font-bold ${colors.cardTitle}`} 
          > 
            Building your career plan 
          </h2> 
 
          <p 
            className={`mt-3 text-sm leading-6 ${colors.muted}`} 
          > 
            CareerCompass AI is generating personalized 
            recommendations for you. 
          </p> 
 
          <div className="mt-6 flex justify-center gap-2"> 
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" /> 
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 [animation-delay:200ms]" /> 
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 [animation-delay:400ms]" /> 
          </div> 
 
        </div> 
      </div> 
    ); 
  } 
 
  // ========================================================= 
  // MAIN 
  // ========================================================= 
 
  return ( 
    <div 
      className={`min-h-screen transition-colors duration-300 ${colors.page}`} 
    > 
 
      {/* ===================================================== 
          HEADER 
      ===================================================== */} 
 
      <header 
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${colors.header}`} 
      > 
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8"> 
 
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"> 
 
            {/* BRAND */} 
 
            <div className="flex items-center gap-3"> 
 
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20"> 
                C 
              </div> 
 
              <div> 
                <p 
                  className={`text-xs font-medium ${ 
                    isMidnight 
                      ? "text-blue-300" 
                      : "text-slate-500" 
                  }`} 
                > 
                  CareerCompass AI 
                </p> 
 
                <h1 
                  className={`text-xl font-bold ${colors.headerText}`} 
                > 
                  Career Dashboard 
                </h1> 
              </div> 
 
            </div> 
 
            {/* CONTROLS */} 
 
            <div className="flex flex-wrap items-center gap-3"> 
 
              {/* APPEARANCE */} 
 
              <div 
                className={`flex items-center rounded-xl border p-1 ${ 
                  isMidnight 
                    ? "border-[#263E65] bg-[#091B39]" 
                    : "border-slate-200 bg-slate-100" 
                }`} 
              > 
 
                <button 
                  onClick={() => setTheme("bright")} 
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${ 
                    !isMidnight 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-slate-400 hover:text-white" 
                  }`} 
                > 
                  ☀ Bright 
                </button> 
 
                <button 
                  onClick={() => setTheme("midnight")} 
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${ 
                    isMidnight 
                      ? "bg-[#162B50] text-white shadow-sm" 
                      : "text-slate-500 hover:text-slate-900" 
                  }`} 
                > 
                  🌙 Midnight 
                </button> 
 
              </div> 
 
              {/* CHANGE CAREER */} 
 
              <button 
                onClick={() => navigate("/")} 
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${ 
                  isMidnight 
                    ? "border-[#263E65] bg-[#091B39] text-slate-200 hover:border-blue-400 hover:text-white" 
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-600" 
                }`} 
              > 
                Change Career 
              </button> 
 
            </div> 
 
          </div> 
 
        </div> 
      </header> 
 
 
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8"> 
 
        {/* ===================================================== 
            HERO 
        ===================================================== */} 
 
        <section 
          className={`mb-8 overflow-hidden rounded-3xl border p-7 shadow-xl sm:p-9 ${ 
            isMidnight 
              ? "border-[#172C50] bg-gradient-to-br from-[#07152F] via-[#07152F] to-[#0A1F40]" 
              : "border-slate-200 bg-slate-950" 
          }`} 
        > 
 
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"> 
 
            <div> 
 
              <div className="mb-3 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1"> 
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300"> 
                  Your target career 
                </span> 
              </div> 
 
              <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl"> 
                {jobRole} 
              </h2> 
 
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base"> 
                A personalized roadmap, learning resources, 
                projects, interview preparation and job 
                opportunities built around your career goal. 
              </p> 
 
            </div> 
 
            <div className="shrink-0 rounded-2xl border border-blue-400/20 bg-[#0D2042]/80 px-6 py-5 backdrop-blur"> 
 
              <p className="text-xs uppercase tracking-wider text-slate-400"> 
                AI Career Plan 
              </p> 
 
              <p className="mt-2 text-lg font-bold text-white"> 
                Personalized for you 
              </p> 
 
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400"> 
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> 
                AI generated 
              </div> 
 
            </div> 
 
          </div> 
 
        </section> 
 
 
        {/* ===================================================== 
            ROADMAP + COURSES 
        ===================================================== */} 
 
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2"> 
 
          {/* =================================================== 
              ROADMAP 
          =================================================== */} 
 
          <div 
            className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
          > 
 
            <div className="mb-6"> 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Learning path 
              </p> 
 
              <h2 
                className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
              > 
                Career Roadmap 
              </h2> 
 
              <p 
                className={`mt-1 text-sm ${colors.muted}`} 
              > 
                Follow these steps to build the skills 
                required for your target role. 
              </p> 
 
            </div> 
 
            {roadmap.length === 0 ? ( 
 
              <div 
                className={`rounded-xl border p-5 ${colors.soft}`} 
              > 
                <p className={`text-sm ${colors.muted}`}> 
                  No roadmap generated. 
                </p> 
              </div> 
 
            ) : ( 
 
              <div 
                className="max-h-[620px] space-y-0 overflow-y-auto pr-2" 
                style={{ scrollbarWidth: "thin" }} 
              > 
 
                {roadmap.map((step, index) => ( 
 
                  <div 
                    key={index} 
                    className="relative flex gap-4" 
                  > 
 
                    {index !== roadmap.length - 1 && ( 
                      <div 
                        className={`absolute left-4 top-9 h-full w-px ${ 
                          isMidnight 
                            ? "bg-blue-900" 
                            : "bg-blue-100" 
                        }`} 
                      /> 
                    )} 
 
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20"> 
                      {index + 1} 
                    </div> 
 
                    <div 
                      className={`mb-5 flex-1 rounded-xl border p-4 transition ${ 
                        isMidnight 
                          ? "border-[#20385E] bg-[#0B1D3B] hover:border-blue-500" 
                          : "border-slate-200 bg-slate-50 hover:border-blue-200" 
                      }`} 
                    > 
 
                      <p 
                        className={`text-sm font-medium leading-6 ${colors.softText}`} 
                      > 
                        {step} 
                      </p> 
 
                    </div> 
 
                  </div> 
 
                ))} 
 
              </div> 
 
            )} 
 
          </div> 
 
 
          {/* =================================================== 
              COURSES 
          =================================================== */} 
 
          <div 
            className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
          > 
 
            <div className="mb-6"> 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Recommended learning 
              </p> 
 
              <h2 
                className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
              > 
                Courses 
              </h2> 
 
              <p 
                className={`mt-1 text-sm ${colors.muted}`} 
              > 
                Curated resources to help you develop the 
                required skills. 
              </p> 
 
            </div> 
 
            {courses.length === 0 ? ( 
 
              <div 
                className={`rounded-xl border p-5 ${colors.soft}`} 
              > 
                <p className={`text-sm ${colors.muted}`}> 
                  No courses available. 
                </p> 
              </div> 
 
            ) : ( 
 
              <div 
                className="max-h-[620px] space-y-3 overflow-y-auto pr-2" 
                style={{ scrollbarWidth: "thin" }} 
              > 
 
                {courses.map((course, index) => ( 
 
                  <div 
                    key={index} 
                    className={`rounded-xl border p-4 transition ${ 
                      isMidnight 
                        ? "border-[#20385E] bg-[#0B1D3B] hover:border-blue-500 hover:bg-[#0E2448]" 
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/30" 
                    }`} 
                  > 
 
                    <div className="flex items-start justify-between gap-4"> 
 
                      <div> 
 
                        <h3 
                          className={`font-semibold ${colors.cardTitle}`} 
                        > 
                          {course.title || 
                            "Recommended Course"} 
                        </h3> 
 
                        <p 
                          className={`mt-1 text-sm ${colors.muted}`} 
                        > 
                          {course.platform || 
                            "Online learning platform"} 
                        </p> 
 
                      </div> 
 
                      <span 
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${ 
                          isMidnight 
                            ? "bg-[#162B50] text-blue-300" 
                            : "bg-slate-100 text-slate-600" 
                        }`} 
                      > 
                        Course 
                      </span> 
 
                    </div> 
 
                    {course.url && ( 
                      <a 
                        href={course.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="mt-4 inline-flex text-sm font-semibold text-blue-500 hover:text-blue-400" 
                      > 
                        View course → 
                      </a> 
                    )} 
 
                  </div> 
 
                ))} 
 
              </div> 
 
            )} 
 
          </div> 
 
        </section> 
 
 
        {/* ===================================================== 
            PROJECTS 
        ===================================================== */} 
 
        <section 
          className={`mt-6 rounded-2xl border p-6 shadow-lg ${colors.card}`} 
        > 
 
          <div className="mb-6"> 
 
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
              Build your portfolio 
            </p> 
 
            <h2 
              className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
            > 
              Project Recommendations 
            </h2> 
 
            <p 
              className={`mt-1 text-sm ${colors.muted}`} 
            > 
              Practical project ideas aligned with your 
              target career. 
            </p> 
 
          </div> 
 
 
          {projects.length === 0 ? ( 
 
            <div 
              className={`rounded-xl border p-5 ${colors.soft}`} 
            > 
 
              <p className={`text-sm ${colors.muted}`}> 
                No projects generated. 
              </p> 
 
              <p 
                className={`mt-2 text-xs ${colors.muted}`} 
              > 
                If your backend generated projects but this 
                message still appears, check the browser 
                console for the "PROJECTS RECEIVED" response. 
              </p> 
 
            </div> 
 
          ) : ( 
 
            <div 
              className="max-h-[700px] overflow-y-auto pr-2" 
              style={{ scrollbarWidth: "thin" }} 
            > 
 
              {/* ONLY PROJECT LAYOUT CHANGED: ONE FULL-WIDTH PROJECT PER ROW */} 
              <div className="grid grid-cols-1 gap-5"> 
 
                {projects.map((project, index) => ( 
 
                  <div 
                    key={index} 
                    className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 ${ 
                      isMidnight 
                        ? "border-[#20385E] bg-[#091B39] hover:border-blue-500 hover:shadow-xl hover:shadow-blue-950/30" 
                        : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-md" 
                    }`} 
                  > 
 
                    {/* PROJECT HEADER */} 
 
                    <div className="flex items-start justify-between gap-4"> 
 
                      <div className="flex items-start gap-3"> 
 
                        <div 
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ 
                            isMidnight 
                              ? "bg-blue-600/20 text-blue-300" 
                              : "bg-blue-50 text-blue-600" 
                          }`} 
                        > 
                          🚀 
                        </div> 
 
                        <h3 
                          className={`text-lg font-bold ${colors.cardTitle}`} 
                        > 
                          {project.title || 
                            "Recommended Project"} 
                        </h3> 
 
                      </div> 
 
                      {project.difficulty && ( 
                        <span 
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${ 
                            isMidnight 
                              ? "bg-blue-500/10 text-blue-300" 
                              : "bg-blue-50 text-blue-700" 
                          }`} 
                        > 
                          {project.difficulty} 
                        </span> 
                      )} 
 
                    </div> 
 
 
                    {/* DESCRIPTION */} 
 
                    {project.description && ( 
                      <p 
                        className={`mt-4 text-sm leading-6 ${colors.cardText}`} 
                      > 
                        {project.description} 
                      </p> 
                    )} 
 
 
                    {/* TECH STACK */} 
 
                    {Array.isArray(project.techStack) && 
                      project.techStack.length > 0 && ( 
 
                        <div className="mt-5"> 
 
                          <p 
                            className={`mb-2 text-xs font-bold uppercase tracking-wide ${colors.muted}`} 
                          > 
                            Tech Stack 
                          </p> 
 
                          <div className="flex flex-wrap gap-2"> 
 
                            {project.techStack.map( 
                              (tech, i) => ( 
 
                                <span 
                                  key={i} 
                                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${ 
                                    isMidnight 
                                      ? "bg-[#162B50] text-blue-200" 
                                      : "bg-blue-50 text-blue-700" 
                                  }`} 
                                > 
                                  {tech} 
                                </span> 
 
                              ) 
                            )} 
 
                          </div> 
 
                        </div> 
 
                      )} 
 
 
                    {/* GITHUB IDEA */} 
 
                    {project.githubIdea && ( 
 
                      <div 
                        className={`mt-5 rounded-xl border p-4 ${ 
                          isMidnight 
                            ? "border-[#20385E] bg-[#07152F]" 
                            : "border-slate-200 bg-slate-50" 
                        }`} 
                      > 
 
                        <p 
                          className={`text-xs font-bold uppercase tracking-wide ${colors.muted}`} 
                        > 
                          Project Direction 
                        </p> 
 
                        <p 
                          className={`mt-2 text-sm leading-6 ${colors.softText}`} 
                        > 
                          {project.githubIdea} 
                        </p> 
 
                      </div> 
 
                    )} 
 
 
                    {/* GITHUB REPOSITORIES */} 
 
                    {Array.isArray( 
                      project.githubRepositories 
                    ) && 
                      project.githubRepositories.length > 0 && ( 
 
                        <div className="mt-5 border-t border-slate-700/30 pt-4"> 
 
                          <p 
                            className={`mb-3 text-xs font-bold uppercase tracking-wide ${colors.muted}`} 
                          > 
                            Reference Repositories 
                          </p> 
 
                          <div className="space-y-2"> 
 
                            {project.githubRepositories.map( 
                              (repo, i) => ( 
 
                                <a 
                                  key={i} 
                                  href={repo.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className={`block rounded-xl border p-3 transition ${ 
                                    isMidnight 
                                      ? "border-[#20385E] bg-[#0B1D3B] hover:border-blue-500" 
                                      : "border-slate-200 hover:border-blue-300 hover:bg-blue-50/30" 
                                  }`} 
                                > 
 
                                  <p className="text-sm font-semibold text-blue-500"> 
                                    {repo.name || 
                                      "GitHub Repository"} 
                                  </p> 
 
                                  {repo.url && ( 
                                    <p className="mt-1 break-all text-xs text-slate-500"> 
                                      {repo.url} 
                                    </p> 
                                  )} 
 
                                </a> 
 
                              ) 
                            )} 
 
                          </div> 
 
                        </div> 
 
                      )} 
 
                  </div> 
 
                ))} 
 
              </div> 
 
            </div> 
 
          )} 
 
        </section> 
 
 
        {/* ===================================================== 
            CAREER MATCH 
        ===================================================== */} 
 
        <section 
          className={`mt-6 rounded-2xl border p-6 shadow-lg ${colors.card}`} 
        > 
 
          <div className="mb-6"> 
 
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
              Personal skill analysis 
            </p> 
 
            <h2 
              className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
            > 
              Career Match 
            </h2> 
 
            <p 
              className={`mt-1 text-sm ${colors.muted}`} 
            > 
              Enter your current skills to see how closely 
              they match this career. 
            </p> 
 
          </div> 
 
 
          <textarea 
            value={userSkills} 
            onChange={(e) => 
              setUserSkills(e.target.value) 
            } 
            placeholder="Example: Python, SQL, Machine Learning, React, Git" 
            className={`h-32 w-full resize-none rounded-xl border p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${colors.input}`} 
          /> 
 
 
          <button 
            onClick={generateJobMatch} 
            disabled={matchLoading} 
            className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300" 
          > 
            {matchLoading 
              ? "Analyzing..." 
              : "Analyze Career Match"} 
          </button> 
 
 
          {jobMatch && ( 
 
            <div className="mt-8"> 
 
              {/* MATCH SCORE */} 
 
              <div 
                className={`rounded-2xl border p-6 ${colors.soft}`} 
              > 
 
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"> 
 
                  <div> 
 
                    <p 
                      className={`text-sm font-medium ${colors.muted}`} 
                    > 
                      Career compatibility 
                    </p> 
 
                    <p 
                      className={`mt-1 text-5xl font-bold ${colors.cardTitle}`} 
                    > 
                      {jobMatch.matchScore ?? 0}% 
                    </p> 
 
                  </div> 
 
                  <p 
                    className={`text-sm ${colors.muted}`} 
                  > 
                    Match for {jobRole} 
                  </p> 
 
                </div> 
 
 
                <div 
                  className={`mt-5 h-2 overflow-hidden rounded-full ${ 
                    isMidnight 
                      ? "bg-[#162B50]" 
                      : "bg-slate-200" 
                  }`} 
                > 
 
                  <div 
                    className="h-full rounded-full bg-blue-600 transition-all duration-700" 
                    style={{ 
                      width: `${Math.min( 
                        Math.max( 
                          Number( 
                            jobMatch.matchScore 
                          ) || 0, 
                          0 
                        ), 
                        100 
                      )}%`, 
                    }} 
                  /> 
 
                </div> 
 
              </div> 
 
 
              {/* MATCH DETAILS */} 
 
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3"> 
 
                {/* STRENGTHS */} 
 
                {jobMatch.strengths?.length > 0 && ( 
 
                  <div 
                    className={`rounded-2xl border p-5 ${ 
                      isMidnight 
                        ? "border-emerald-900/60 bg-emerald-950/20" 
                        : "border-emerald-200 bg-emerald-50/50" 
                    }`} 
                  > 
 
                    <h3 className="font-bold text-emerald-500"> 
                      Current strengths 
                    </h3> 
 
                    <ul className="mt-3 space-y-2"> 
 
                      {jobMatch.strengths.map( 
                        (item, index) => ( 
 
                          <li 
                            key={index} 
                            className={`text-sm leading-6 ${colors.softText}`} 
                          > 
                            <span className="mr-2 text-emerald-500"> 
                              ✓ 
                            </span> 
                            {item} 
                          </li> 
 
                        ) 
                      )} 
 
                    </ul> 
 
                  </div> 
 
                )} 
 
 
                {/* MISSING SKILLS */} 
 
                {jobMatch.missingSkills?.length > 0 && ( 
 
                  <div 
                    className={`rounded-2xl border p-5 ${ 
                      isMidnight 
                        ? "border-amber-900/60 bg-amber-950/20" 
                        : "border-amber-200 bg-amber-50/50" 
                    }`} 
                  > 
 
                    <h3 className="font-bold text-amber-500"> 
                      Skills to develop 
                    </h3> 
 
                    <ul className="mt-3 space-y-2"> 
 
                      {jobMatch.missingSkills.map( 
                        (item, index) => ( 
 
                          <li 
                            key={index} 
                            className={`text-sm leading-6 ${colors.softText}`} 
                          > 
                            <span className="mr-2 text-amber-500"> 
                              • 
                            </span> 
                            {item} 
                          </li> 
 
                        ) 
                      )} 
 
                    </ul> 
 
                  </div> 
 
                )} 
 
 
                {/* RECOMMENDATIONS */} 
 
                {jobMatch.recommendations?.length > 0 && ( 
 
                  <div 
                    className={`rounded-2xl border p-5 ${ 
                      isMidnight 
                        ? "border-blue-900/60 bg-blue-950/20" 
                        : "border-blue-200 bg-blue-50/50" 
                    }`} 
                  > 
 
                    <h3 className="font-bold text-blue-500"> 
                      Recommended next steps 
                    </h3> 
 
                    <ul className="mt-3 space-y-2"> 
 
                      {jobMatch.recommendations.map( 
                        (item, index) => ( 
 
                          <li 
                            key={index} 
                            className={`text-sm leading-6 ${colors.softText}`} 
                          > 
                            <span className="mr-2 text-blue-500"> 
                              → 
                            </span> 
                            {item} 
                          </li> 
 
                        ) 
                      )} 
 
                    </ul> 
 
                  </div> 
 
                )} 
 
              </div> 
 
            </div> 
 
          )} 
 
        </section> 
 
 
        {/* ===================================================== 
            INTERVIEW QUESTIONS 
        ===================================================== */} 
 
        <section 
          className={`mt-6 rounded-2xl border p-6 shadow-lg ${colors.card}`} 
        > 
 
          <div className="mb-6"> 
 
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
              Interview preparation 
            </p> 
 
            <h2 
              className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
            > 
              AI Interview Questions 
            </h2> 
 
            <p 
              className={`mt-1 text-sm ${colors.muted}`} 
            > 
              Practice questions generated for your target 
              role. 
            </p> 
 
          </div> 
 
 
          {interview.length === 0 ? ( 
 
            <div 
              className={`rounded-xl border p-5 ${colors.soft}`} 
            > 
              <p className={`text-sm ${colors.muted}`}> 
                No interview questions generated. 
              </p> 
            </div> 
 
          ) : ( 
 
            <div 
              className="max-h-[500px] space-y-3 overflow-y-auto pr-2" 
              style={{ scrollbarWidth: "thin" }} 
            > 
 
              {interview.map((item, index) => ( 
 
                <div 
                  key={item.id || index} 
                  className={`rounded-xl border p-5 transition ${ 
                    isMidnight 
                      ? "border-[#20385E] bg-[#0B1D3B] hover:border-blue-500" 
                      : "border-slate-200 bg-slate-50 hover:border-blue-200" 
                  }`} 
                > 
 
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-500"> 
                    Question {item.id || index + 1} 
                  </p> 
 
                  <p 
                    className={`mt-2 text-sm font-medium leading-6 ${colors.softText}`} 
                  > 
                    {item.question || item} 
                  </p> 
 
                </div> 
 
              ))} 
 
            </div> 
 
          )} 
 
        </section> 
 
 
        {/* ===================================================== 
            CAREER TOOLS 
        ===================================================== */} 
 
        <section className="mt-8"> 
 
          <div className="mb-5"> 
 
            <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
              Career tools 
            </p> 
 
            <h2 
              className={`mt-1 text-2xl font-bold ${colors.cardTitle}`} 
            > 
              Build your career faster 
            </h2> 
 
          </div> 
 
 
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> 
 
            {/* RESUME BUILDER */} 
 
            <div 
              className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
            > 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Resume 
              </p> 
 
              <h3 
                className={`mt-2 text-xl font-bold ${colors.cardTitle}`} 
              > 
                AI Resume Builder 
              </h3> 
 
              <p 
                className={`mt-2 text-sm leading-6 ${colors.muted}`} 
              > 
                Create an ATS-friendly professional resume 
                tailored to your target career. 
              </p> 
 
              <button 
                onClick={() => 
                  navigate("/resume-builder") 
                } 
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500" 
              > 
                Open Resume Builder → 
              </button> 
 
            </div> 
 
 
            {/* JD RESUME */} 
 
            <div 
              className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
            > 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Job Description 
              </p> 
 
              <h3 
                className={`mt-2 text-xl font-bold ${colors.cardTitle}`} 
              > 
                JD-Tailored Resume 
              </h3> 
 
              <p 
                className={`mt-2 text-sm leading-6 ${colors.muted}`} 
              > 
                Paste a job description and generate a resume 
                tailored to the specific role. 
              </p> 
 
              <button 
                onClick={() => 
                  navigate("/jd-resume-builder") 
                } 
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500" 
              > 
                Tailor My Resume → 
              </button> 
 
            </div> 
 
 
            {/* MOCK INTERVIEW */} 
 
            <div 
              className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
            > 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Practice 
              </p> 
 
              <h3 
                className={`mt-2 text-xl font-bold ${colors.cardTitle}`} 
              > 
                AI Mock Interview 
              </h3> 
 
              <p 
                className={`mt-2 text-sm leading-6 ${colors.muted}`} 
              > 
                Practice technical and HR interview questions 
                and prepare for your target role. 
              </p> 
 
              <button 
                onClick={() => 
                  navigate("/mock-interview", { 
                    state: { jobRole }, 
                  }) 
                } 
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500" 
              > 
                Start Interview → 
              </button> 
 
            </div> 
 
 
            {/* JOB MATCHER */} 
 
            <div 
              className={`rounded-2xl border p-6 shadow-lg ${colors.card}`} 
            > 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500"> 
                Opportunities 
              </p> 
 
              <h3 
                className={`mt-2 text-xl font-bold ${colors.cardTitle}`} 
              > 
                Find Matching Jobs 
              </h3> 
 
              <p 
                className={`mt-2 text-sm leading-6 ${colors.muted}`} 
              > 
                Explore opportunities and identify roles that 
                align with your profile. 
              </p> 
 
              <button 
                onClick={() => 
                  navigate("/job-matcher") 
                } 
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500" 
              > 
                Explore Jobs → 
              </button> 
 
            </div> 
 
          </div> 
 
        </section> 
 
 
        {/* ===================================================== 
            JOB OPENINGS 
        ===================================================== */} 
 
        <section 
          className={`mt-8 rounded-3xl border p-6 shadow-xl ${ 
            isMidnight 
              ? "border-[#1B3155] bg-gradient-to-br from-[#06132A] to-[#091B39]" 
              : "border-slate-200 bg-white" 
          }`} 
        > 
 
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"> 
 
            <div> 
 
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400"> 
                Current opportunities 
              </p> 
 
              <h2 
                className={`mt-1 text-2xl font-bold ${ 
                  isMidnight ? "text-white" : "text-slate-950" 
                }`} 
              > 
                Job Openings 
              </h2> 
 
              <p 
                className={`mt-1 text-sm ${ 
                  isMidnight ? "text-slate-400" : "text-slate-500" 
                }`} 
              > 
                Opportunities related to your selected career. 
              </p> 
 
            </div> 
 
            {jobs.length > 0 && ( 
              <span className="w-fit rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300"> 
                {jobs.length} opportunities 
              </span> 
            )} 
 
          </div> 
 
 
          {jobs.length === 0 ? ( 
 
            <div 
              className={`rounded-xl border p-6 ${ 
                isMidnight 
                  ? "border-slate-700 bg-[#0D2042]" 
                  : "border-slate-200 bg-slate-50" 
              }`} 
            > 
 
              <p 
                className={`text-sm ${ 
                  isMidnight ? "text-slate-300" : "text-slate-600" 
                }`} 
              > 
                No jobs found for this career right now. 
              </p> 
 
            </div> 
 
          ) : ( 
 
            <div 
              className="max-h-[600px] overflow-y-auto pr-2" 
              style={{ scrollbarWidth: "thin" }} 
            > 
 
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2"> 
 
                {jobs.map((job, index) => ( 
 
                  <div 
                    key={index} 
                    className={`rounded-2xl border p-5 transition ${ 
                      isMidnight 
                        ? "border-[#263E65] bg-[#0B1D3B] hover:border-blue-500 hover:bg-[#0E2448] hover:shadow-lg hover:shadow-blue-950/30" 
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30" 
                    }`} 
                  > 
 
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"> 
 
                      <div> 
 
                        <h3 
                          className={`text-lg font-bold ${ 
                            isMidnight ? "text-white" : "text-slate-950" 
                          }`} 
                        > 
                          {job.title || 
                            "Job Opportunity"} 
                        </h3> 
 
                        <p 
                          className={`mt-1 text-sm font-semibold ${ 
                            isMidnight ? "text-blue-300" : "text-blue-500" 
                          }`} 
                        > 
                          {job.company || 
                            "Company"} 
                        </p> 
 
                      </div> 
 
                      {job.location && ( 
                        <span 
                          className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${ 
                            isMidnight 
                              ? "bg-[#162B50] text-slate-300" 
                              : "bg-slate-100 text-slate-600" 
                          }`} 
                        > 
                          {job.location} 
                        </span> 
                      )} 
 
                    </div> 
 
 
                    {(job.salary_min || 
                      job.salary_max) && ( 
 
                      <p className="mt-3 text-sm font-semibold text-emerald-400"> 
                        ₹{job.salary_min ?? "-"} – ₹ 
                        {job.salary_max ?? "-"} 
                      </p> 
 
                    )} 
 
 
                    {job.description && ( 
                      <p 
                        className={`mt-3 line-clamp-4 text-sm leading-6 ${ 
                          isMidnight ? "text-slate-300" : "text-slate-600" 
                        }`} 
                      > 
                        {job.description} 
                      </p> 
                    )} 
 
 
                    {job.apply_url && ( 
 
                      <a 
                        href={job.apply_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500" 
                      > 
                        Apply Now → 
                      </a> 
 
                    )} 
 
                  </div> 
 
                ))} 
 
              </div> 
 
            </div> 
 
          )} 
 
        </section> 
 
 
        {/* ===================================================== 
            FOOTER 
        ===================================================== */} 
 
        <footer className="py-10 text-center"> 
 
          <p 
            className={`text-sm ${colors.muted}`} 
          > 
            CareerCompass AI · Personalized career guidance 
            powered by AI 
          </p> 
 
          <p 
            className={`mt-2 text-xs ${ 
              isMidnight 
                ? "text-slate-600" 
                : "text-slate-400" 
            }`} 
          > 
            Built to help you discover, learn, prepare and 
            get hired. 
          </p> 
 
        </footer> 
 
      </main> 
 
    </div> 
  ); 
} 
 
export default Dashboard;
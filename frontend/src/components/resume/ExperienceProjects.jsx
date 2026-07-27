import { useState } from "react";

function ExperienceProjects({ resume, setResume }) {
  const [experience, setExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  const [project, setProject] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
  });

  const addExperience = () => {
    if (!experience.role) return;

    setResume({
      ...resume,
      experience: [...resume.experience, experience],
    });

    setExperience({
      role: "",
      company: "",
      duration: "",
      description: "",
    });
  };

  const addProject = () => {
    if (!project.title) return;

    setResume({
      ...resume,
      projects: [...resume.projects, project],
    });

    setProject({
      title: "",
      description: "",
      tech: "",
      github: "",
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

      <h2 className="text-3xl font-bold text-purple-600 mb-6">
        💼 Experience & Projects
      </h2>

      {/* EXPERIENCE */}

      <h3 className="text-xl font-bold mb-3">
        Work Experience
      </h3>

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Job Role"
        value={experience.role}
        onChange={(e)=>
          setExperience({...experience,role:e.target.value})
        }
      />

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Company"
        value={experience.company}
        onChange={(e)=>
          setExperience({...experience,company:e.target.value})
        }
      />

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Duration"
        value={experience.duration}
        onChange={(e)=>
          setExperience({...experience,duration:e.target.value})
        }
      />

      <textarea
        rows="4"
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Describe your work..."
        value={experience.description}
        onChange={(e)=>
          setExperience({...experience,description:e.target.value})
        }
      />

      <button
        onClick={addExperience}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Add Experience
      </button>

      <div className="mt-5 space-y-4">

        {resume.experience.map((exp,index)=>(
          <div
            key={index}
            className="bg-blue-50 p-4 rounded-xl"
          >
            <h4 className="font-bold">
              {exp.role}
            </h4>

            <p>{exp.company}</p>

            <p>{exp.duration}</p>

            <p>{exp.description}</p>

          </div>
        ))}

      </div>

      {/* PROJECTS */}

      <h3 className="text-xl font-bold mt-10 mb-3">
        🚀 Projects
      </h3>

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Project Title"
        value={project.title}
        onChange={(e)=>
          setProject({...project,title:e.target.value})
        }
      />

      <textarea
        rows="4"
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Project Description"
        value={project.description}
        onChange={(e)=>
          setProject({...project,description:e.target.value})
        }
      />

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="Technologies Used"
        value={project.tech}
        onChange={(e)=>
          setProject({...project,tech:e.target.value})
        }
      />

      <input
        className="w-full border rounded-xl p-3 mb-3"
        placeholder="GitHub Link"
        value={project.github}
        onChange={(e)=>
          setProject({...project,github:e.target.value})
        }
      />

      <button
        onClick={addProject}
        className="bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Add Project
      </button>

      <div className="mt-5 space-y-4">

        {resume.projects.map((pro,index)=>(
          <div
            key={index}
            className="bg-green-50 p-4 rounded-xl"
          >
            <h4 className="font-bold">
              {pro.title}
            </h4>

            <p>{pro.description}</p>

            <p>
              <strong>Tech:</strong> {pro.tech}
            </p>

            <p className="text-blue-600 break-all">
              {pro.github}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ExperienceProjects;
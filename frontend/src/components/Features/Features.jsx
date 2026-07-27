import { useState } from "react";
import Modal from "../Modal/Modal";

const features = [
  {
    id: "roadmap",
    title: "AI Roadmaps",
    description: "Personalized learning roadmaps for any career."
  },
  {
    id: "courses",
    title: "Free Courses",
    description: "Find the best free resources from trusted platforms."
  },
  {
    id: "projects",
    title: "Project Ideas",
    description: "Build portfolio-worthy projects based on your role."
  },
  {
    id: "resume",
    title: "Resume Builder",
    description: "Generate ATS-friendly resumes."
  },
  {
    id: "interview",
    title: "Interview Prep",
    description: "Practice interview questions with AI."
  },
  {
    id: "jobs",
    title: "Job Openings",
    description: "Find companies hiring for your selected role."
  }
];

function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <section className="py-20 px-8 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Everything You Need in One Place
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setSelectedFeature(feature)}
              className="bg-slate-100 rounded-2xl p-6 shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Modal
        open={selectedFeature !== null}
        feature={selectedFeature || {}}
        onClose={() => setSelectedFeature(null)}
      />
    </>
  );
}

export default Features;
import { useState } from "react";
import Modal from "../Modal/Modal";

const features = [
  {
    id: "roadmap",
    title: "AI Roadmaps",
    description: "Personalized learning roadmaps for any career.",
  },
  {
    id: "courses",
    title: "Free Courses",
    description: "Find the best free resources from trusted platforms.",
  },
  {
    id: "projects",
    title: "Project Ideas",
    description: "Build portfolio-worthy projects based on your role.",
  },
  {
    id: "resume",
    title: "Resume Builder",
    description: "Generate ATS-friendly resumes.",
  },
  {
    id: "interview",
    title: "Interview Prep",
    description: "Practice interview questions with AI.",
  },
  {
    id: "jobs",
    title: "Job Openings",
    description: "Find companies hiring for your selected role.",
  },
];

function Features() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <section className="w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24 bg-slate-50">

        <div className="w-full max-w-[1600px] mx-auto">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-10 sm:mb-14 lg:mb-16">
            Everything You Need in One Place
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeature(feature)}
                className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-md hover:shadow-2xl lg:hover:scale-105 transition-all duration-300 cursor-pointer"
              >

                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base leading-6">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

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
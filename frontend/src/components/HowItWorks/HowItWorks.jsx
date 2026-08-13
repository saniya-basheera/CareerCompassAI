const steps = [
  {
    number: "1",
    title: "Choose a Career",
    description: "Enter the job role you want to become.",
  },
  {
    number: "2",
    title: "AI Analysis",
    description: "Gemini AI understands your goal and experience.",
  },
  {
    number: "3",
    title: "Get Roadmap",
    description: "Receive a personalized learning roadmap.",
  },
  {
    number: "4",
    title: "Build Projects",
    description: "Complete industry-level projects.",
  },
  {
    number: "5",
    title: "Apply for Jobs",
    description: "Get job openings and start applying.",
  },
];

function HowItWorks() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">

      <div className="w-full max-w-[1600px] mx-auto">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-10 sm:mb-14 lg:mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                {step.number}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mt-5 sm:mt-6 text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;
const steps = [
  {
    number: "1",
    title: "Choose a Career",
    description: "Enter the job role you want to become."
  },
  {
    number: "2",
    title: "AI Analysis",
    description: "Gemini AI understands your goal and experience."
  },
  {
    number: "3",
    title: "Get Roadmap",
    description: "Receive a personalized learning roadmap."
  },
  {
    number: "4",
    title: "Build Projects",
    description: "Complete industry-level projects."
  },
  {
    number: "5",
    title: "Apply for Jobs",
    description: "Get job openings and start applying."
  }
];

function HowItWorks() {
  return (
    <section className="bg-slate-100 py-24">

      <h2 className="text-5xl font-bold text-center mb-16">
        How It Works
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 px-8">

        {steps.map((step) => (

          <div
            key={step.number}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >

            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">

              {step.number}

            </div>

            <h3 className="text-2xl font-semibold mt-6">
              {step.title}
            </h3>

            <p className="mt-4 text-gray-600">
              {step.description}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;
function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-slate-100">

      <h1 className="text-6xl font-extrabold text-gray-900">
        Find Your Dream Career
      </h1>

      <span className="text-6xl font-extrabold text-blue-600 mt-2">
        with AI
      </span>

      <p className="mt-8 text-xl text-gray-600 max-w-3xl">
        Get personalized learning roadmaps, project ideas,
        free courses, resume templates, interview preparation,
        and live job openings — all in one place.
      </p>

      <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition">
        Get Started
      </button>

    </section>
  );
}

export default Hero;
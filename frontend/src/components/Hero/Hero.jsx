function Hero() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">

      <div className="text-center">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight">
          Find Your Dream Career
        </h1>

        <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-blue-600 mt-2 leading-tight">
          with AI
        </span>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
          Get personalized learning roadmaps, project ideas,
          free courses, resume templates, interview preparation,
          and live job openings — all in one place.
        </p>

        <button className="mt-8 sm:mt-10 bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>

      </div>

    </section>
  );
}

export default Hero;
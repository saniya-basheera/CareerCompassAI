function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-blue-600">
          CareerCompass AI
        </h1>

        <div className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">Roadmaps</a>
          <a href="#">Jobs</a>
          <a href="#">Resume</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
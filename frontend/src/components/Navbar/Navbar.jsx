function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="text-xl sm:text-2xl font-bold text-blue-600 whitespace-nowrap">
            CareerCompass AI
          </div>

          {/* Navigation */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-sm lg:text-base">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Roadmaps
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Jobs
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu label */}
          <div className="sm:hidden text-sm font-medium text-gray-500">
            Menu
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
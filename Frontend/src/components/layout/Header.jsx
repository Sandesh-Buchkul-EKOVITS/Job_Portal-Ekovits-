import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-800"
        >
          JobPortal
        </Link>

        {/* CENTER: Menu */}
        <nav className="hidden md:flex gap-6 text-sm text-gray-600">
          <Link to="/jobs" className="hover:text-black">
            Jobs
          </Link>
          <Link to="/about" className="hover:text-black">
            About
          </Link>
          <Link to="/pricing" className="hover:text-black">
            Pricing
          </Link>
          <Link to="/contact" className="hover:text-black">
            Contact
          </Link>
        </nav>

        {/* RIGHT: Login / Register */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="text-sm px-4 py-2 border rounded hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}

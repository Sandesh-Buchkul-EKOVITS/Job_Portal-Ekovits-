import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import SCV from "../../assets/SCV.png";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [showEmployerMenu, setShowEmployerMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const dropdownRef = useRef(null);

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowEmployerMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/">
          <img src={SCV} alt="Job Portal" className="h-20 md:h-15" />
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>

        {/* NAVIGATION */}
        <nav
          className={`${
            mobileMenu ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-none p-4 md:p-0`}
        >
          {/* ---------- LOGGED OUT ---------- */}
          {!user && (
            <>
              <Link to="/jobs">Jobs</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>

              <Link
                to="/login"
                className="border px-4 py-1.5 rounded font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{ background: gradient }}
                className="text-white px-4 py-1.5 rounded font-medium hover:opacity-90 transition"
              >
                Register
              </Link>

              {/* EMPLOYER DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowEmployerMenu(!showEmployerMenu)}
                  className="flex items-center gap-1 font-medium"
                >
                  For Employers
                  <span className="text-xs">▾</span>
                </button>

                {showEmployerMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50">
                    <Link
                      to="/login"
                      state={{ role: "employer" }}
                      onClick={() => setShowEmployerMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Employer Login
                    </Link>

                    <Link
                      to="/register/employer"
                      onClick={() => setShowEmployerMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Employer Register
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ---------- CANDIDATE ---------- */}
          {user?.role === "candidate" && (
            <>
              <Link to="/jobs">Jobs</Link>
              <Link to="/candidate/saved-jobs">Saved Jobs</Link>
              <Link to="/candidate/applications">Applications</Link>
              <Link to="/candidate/profile">Profile</Link>

              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}

          {/* ---------- EMPLOYER ---------- */}
          {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard">Dashboard</Link>
              <Link to="/employer/post-job">Post Job</Link>
              <Link to="/employer/my-jobs">My Jobs</Link>

              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}

          {/* ---------- ADMIN ---------- */}
          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard">Admin</Link>

              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

import "./Header.css"

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          JobPortal
        </Link>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-6 text-sm">
          {/* LOGGED OUT */}
          {!user && (
            <>
              <Link to="/jobs">Jobs</Link>
              <Link to="/about">About</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>

                <Link to="/login" className="border px-4 py-1.5 rounded"
                >  
                Login
              </Link>
              <Link
                to="/register"
                className="itsregister"
              >
                Register
              </Link>

              {/* Dropdown for Employers */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  // className="bg-blue-600 text-white px-4 py-1.5 rounded flex items-center gap-1"
                  className="itsemployer"
                >
                  For employers ▾
                </button>

                {open && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">

                     <li>
                      <Link
                        to="/Employer"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Employer Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/Byonline"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setOpen(false)}
                      >
                        Buy Online
                      </Link>
                    </li>
                   
                    
                  </ul>
                )}
              </div>

              
            </>
          )}

          {/* CANDIDATE */}
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

          {/* EMPLOYER */}
          {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard">Dashboard</Link>
              <Link to="/employer/post-job">Post Job</Link>
              <Link to="/employer/my-jobs">My Jobs</Link>
              <Link to="/employer/applicants">Applicants</Link>
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )}

          {/* ADMIN */}
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
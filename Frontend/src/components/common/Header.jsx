import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [empOpen, setEmpOpen] = useState(false);


  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

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
              <Link to="/login" className="border px-4 py-1.5 rounded">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1.5 rounded"
              >
                Register
              </Link>
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
          {/* {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard">Dashboard</Link>
              <Link to="/employer/post-job">Post Job</Link>
              <Link to="/employer/my-jobs">My Jobs</Link>
              <Link to="/employer/applicants">Applicants</Link>
              <button onClick={logout} className="text-red-600">
                Logout
              </button>
            </>
          )} */}


          {user?.role === "employer" && (
  <div className="relative">
    {/* Desktop Employer Nav */}
    <div className="hidden md:flex items-center gap-6">
      <Link to="/employer/dashboard">Dashboard</Link>
      <Link to="/employer/post-job">Post Job</Link>
      <Link to="/employer/my-jobs">My Jobs</Link>
      <Link to="/employer/applicants">Applicants</Link>
      <button onClick={logout} className="text-red-600">
        Logout
      </button>
    </div>

    {/* Mobile Hamburger */}
    <button
      className="md:hidden text-xl"
      onClick={() => setEmpOpen(!empOpen)}
    >
      ☰
    </button>

    {/* Mobile Employer Menu */}
    {empOpen && (
      <div className="absolute right-0 mt-3 w-48 bg-white border rounded shadow-md flex flex-col text-sm">
        <Link
          to="/employer/dashboard"
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => setEmpOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/employer/post-job"
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => setEmpOpen(false)}
        >
          Post Job
        </Link>
        <Link
          to="/employer/my-jobs"
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => setEmpOpen(false)}
        >
          My Jobs
        </Link>
        <Link
          to="/employer/applicants"
          className="px-4 py-2 hover:bg-gray-100"
          onClick={() => setEmpOpen(false)}
        >
          Applicants
        </Link>
        <button
          onClick={logout}
          className="px-4 py-2 text-left text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    )}
  </div>
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

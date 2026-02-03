import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

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

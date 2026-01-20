import { useNavigate } from "react-router-dom";

export default function DashboardLayout({ title, children }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-lg cursor-pointer" onClick={() => navigate("/")}>
            JobPortal
          </h1>

          <div className="flex items-center gap-4">
            {currentUser?.role === "candidate" && (
              <>
                <button
                  onClick={() => navigate("/jobs")}
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Browse Jobs
                </button>
                <button
                  onClick={() => navigate("/candidate/dashboard")}
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </button>
              </>
            )}

            <button
              onClick={logout}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {title && (
          <h2 className="text-xl font-semibold mb-6">{title}</h2>
        )}
        {children}
      </main>
    </div>
  );
}

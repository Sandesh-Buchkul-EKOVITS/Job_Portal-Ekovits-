import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- Public ---------- */
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ---------- Candidate ---------- */
import Jobs from "../pages/Jobs/Jobs";
import JobDetail from "../pages/Jobs/JobDetail";

/* ---------- Guards ---------- */
import RequireRole from "./guards/RequireRole";

/* ---------- Home Redirect ---------- */
function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return <Landing />;

  if (user.role === "candidate") return <Navigate to="/jobs" replace />;
  if (user.role === "employer") return <Navigate to="/employer/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return <Landing />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- Candidate ---------- */}
      <Route
        path="/jobs"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <Jobs />
          </RequireRole>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <JobDetail />
          </RequireRole>
        }
      />

      {/* ---------- Fallback ---------- */}
      <Route
        path="*"
        element={
          <div style={{ padding: 40 }}>
            Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

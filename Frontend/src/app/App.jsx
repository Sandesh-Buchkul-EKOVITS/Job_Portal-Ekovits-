import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- Public ---------- */
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ---------- Jobs ---------- */
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/jobs/JobDetail";

/* ---------- Candidate ---------- */
import CandidateDashboard from "../pages/candidate/Dashboard";
import CandidateProfile from "../pages/candidate/Profile";
import CandidateApplications from "../pages/candidate/Applications";
import SavedJobs from "../pages/candidate/SavedJobs";

/* ---------- Employer ---------- */
import EmployerDashboard from "../pages/employer/Dashboard";
import PostJob from "../pages/employer/PostJob";
import MyJobs from "../pages/employer/MyJobs";
import ViewApplicants from "../pages/employer/ViewApplicants";
import CandidateProfileView from "../pages/employer/CandidateProfileView";

/* ---------- Admin ---------- */
import AdminDashboard from "../pages/admin/Dashboard";

/* ---------- Guards ---------- */
import RequireRole from "./guards/RequireRole";

/* ---------- Home Redirect ---------- */
function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return <Landing />;

  if (user.role === "candidate") {
    return <Navigate to="/jobs" replace />;
  }

  if (user.role === "employer") {
    return <Navigate to="/employer/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Landing />;
}

/* ---------- Profile Completion Guard ---------- */
function RequireProfile({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const fullUser = users.find((u) => u.id === currentUser?.id);

  if (!fullUser) {
    return <Navigate to="/login" replace />;
  }

  if (
    fullUser.role === "candidate" &&
    fullUser.profileCompleted === false
  ) {
    return <Navigate to="/candidate/profile" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      {/* ---------- Home ---------- */}
      <Route path="/" element={<HomeRedirect />} />

      {/* ---------- Auth ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- Jobs (Candidates ONLY) ---------- */}
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

      {/* ---------- Candidate ---------- */}
      <Route
        path="/candidate/profile"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <CandidateProfile />
          </RequireRole>
        }
      />

      <Route
        path="/candidate/dashboard"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <RequireProfile>
              <CandidateDashboard />
            </RequireProfile>
          </RequireRole>
        }
      />

      <Route
        path="/candidate/applications"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <RequireProfile>
              <CandidateApplications />
            </RequireProfile>
          </RequireRole>
        }
      />

      <Route
        path="/candidate/saved-jobs"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <RequireProfile>
              <SavedJobs />
            </RequireProfile>
          </RequireRole>
        }
      />

      {/* ---------- Employer ---------- */}
      <Route
        path="/employer/dashboard"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <EmployerDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/employer/post-job"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <PostJob />
          </RequireRole>
        }
      />

      <Route
        path="/employer/my-jobs"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <MyJobs />
          </RequireRole>
        }
      />

      <Route
        path="/employer/applicants"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <ViewApplicants />
          </RequireRole>
        }
      />

      <Route
        path="/employer/candidate/:id"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <CandidateProfileView />
          </RequireRole>
        }
      />

      {/* ---------- Admin ---------- */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminDashboard />
          </RequireRole>
        }
      />

      {/* ---------- Fallback ---------- */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-gray-600">
            Page Not Found
          </div>
        }
      />
    </Routes>
  );
}

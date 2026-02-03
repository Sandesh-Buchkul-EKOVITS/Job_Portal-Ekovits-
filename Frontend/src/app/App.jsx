import { Routes, Route, Navigate } from "react-router-dom";

/* ---------- Public ---------- */
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* ---------- Candidate ---------- */
import Jobs from "../pages/Jobs";
import JobDetail from "../pages/jobs/JobDetail";
import ApplyJob from "../pages/candidate/ApplyJob";
import CandidateProfile from "../pages/candidate/Profile";
import CandidateApplications from "../pages/candidate/Applications";
import SavedJobs from "../pages/candidate/SavedJobs";

/* ---------- Employer ---------- */
import EmployerDashboard from "../pages/employer/Dashboard";
import EmployerProfile from "../pages/employer/Profile";
import EmployerSubscription from "../pages/employer/Subscription";
import PostJob from "../pages/employer/PostJob";
import MyJobs from "../pages/employer/MyJobs";
import ViewApplicants from "../pages/employer/MyJobs";
import EmployerCandidateProfileView from "../pages/employer/CandidateProfileView";


// "../pages/employer/ViewApplicants";
/* ---------- Admin ---------- */
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminCandidates from "../pages/admin/Candidates";
import AdminCandidateProfile from "../pages/admin/CandidateProfile";
import AdminJobs from "../pages/admin/Jobs";
import AdminEmployers from "../pages/admin/Employers";
import AdminEmployerProfile from "../pages/admin/EmployerProfile";

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

export default function App() {
  return (
    <Routes>
      {/* ---------- HOME ---------- */}
      <Route path="/" element={<HomeRedirect />} />

      {/* ---------- AUTH ---------- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- PUBLIC JOB BROWSING ---------- */}
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />

      {/* ---------- CANDIDATE ---------- */}
      <Route
        path="/candidate/apply/:id"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <ApplyJob />
          </RequireRole>
        }
      />

      <Route
        path="/candidate/profile"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <CandidateProfile />
          </RequireRole>
        }
      />

      <Route
        path="/candidate/applications"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <CandidateApplications />
          </RequireRole>
        }
      />

      <Route
        path="/candidate/saved-jobs"
        element={
          <RequireRole allowedRoles={["candidate"]}>
            <SavedJobs />
          </RequireRole>
        }
      />

      {/* ---------- EMPLOYER ---------- */}
      <Route
        path="/employer/dashboard"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <EmployerDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/employer/profile"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <EmployerProfile />
          </RequireRole>
        }
      />

      <Route
        path="/employer/subscription"
        element={
          <RequireRole allowedRoles={["employer"]}>
            <EmployerSubscription />
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
            <EmployerCandidateProfileView />
          </RequireRole>
        }
      />

      {/* ---------- ADMIN ---------- */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminDashboard />
          </RequireRole>
        }
      />

      <Route
        path="/admin/users"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminUsers />
          </RequireRole>
        }
      />

      <Route
        path="/admin/candidates"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminCandidates />
          </RequireRole>
        }
      />

      <Route
        path="/admin/candidate/:id"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminCandidateProfile />
          </RequireRole>
        }
      />

      <Route
        path="/admin/employers"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminEmployers />
          </RequireRole>
        }
      />

      <Route
        path="/admin/employer/:id"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminEmployerProfile />
          </RequireRole>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <RequireRole allowedRoles={["admin"]}>
            <AdminJobs />
          </RequireRole>
        }
      />

      {/* ---------- FALLBACK ---------- */}
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

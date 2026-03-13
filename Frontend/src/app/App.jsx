import { Routes, Route, Navigate } from "react-router-dom";


// this is for otp verify 
import ChooseRole from "../pages/auth/ChooseRole";
import VerifyEmail from "../pages/auth/VerifyEmail";
import EnterOtp from "../pages/auth/EnterOtp";

import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";



/* ---------- Public ---------- */
import Landing from "../pages/Landing";
{/* <Route path="/contact" element={<Contact />} /> */}
import Login from "../pages/auth/Login";
import CandidateRegister from "../pages/auth/Register";
import EmployerRegister from "../pages/auth/EmployerRegister";
import Pricing from "../pages/Pricing";   // ✅ ADDED
import Contact from "../pages/contactPage";
import UserQueries from "../pages/admin/UserQueries";

/* ---------- Candidate ---------- */
import Jobs from "../pages/jobs";
import JobDetail from "../pages/Jobs/JobDetail";
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
import EmployerViewApplicants from "../pages/employer/ViewApplicants";
import EmployerCandidateProfileView from "../pages/employer/CandidateProfileView";
// import VerifyEmployerOtp from "../pages/auth/VerifyEmployerOtp";
// import Contact from "./pages/Contact";

/* ---------- Admin ---------- */
// import AdminLogin from "../pages/admin/AdminLogin";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminCandidates from "../pages/admin/Candidates";
import AdminCandidateProfile from "../pages/admin/CandidateProfile";
import AdminJobs from "../pages/admin/Jobs";
import JobModeration from "../pages/admin/JobModeration";
import AdminEmployers from "../pages/admin/Employers";
import AdminEmployerProfile from "../pages/admin/EmployerProfile";
import QueryDetail from "../pages/admin/QueryDetail";
// import RequireAdmin from "./app/guards/RequireAdmin";

/* ---------- Guards ---------- */
import RequireRole from "./guards/RequireRole";

/* ---------- HOME LOGIC ---------- */
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

export default function App() {
  return (
    <Routes>
      {/* ---------- HOME ---------- */}
      <Route path="/" element={<HomeRedirect />} />

      {/* ---------- PUBLIC ---------- */}
      <Route path="/pricing" element={<Pricing />} />   {/* ✅ ADDED */}
      <Route path="/contact" element={<Contact />} />

      {/* ---------- AUTH ---------- */}

      <Route path="/choose-role" element={<ChooseRole />} />
<Route path="/verify-email" element={<VerifyEmail />} />
<Route path="/verify-otp" element={<EnterOtp />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<CandidateRegister />} />
      <Route path="/register/employer" element={<EmployerRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />


      {/* ---------- CANDIDATE ONLY JOBS ---------- */}
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


      {/* <Route path="/verify-employer-otp" element={<VerifyEmployerOtp />} /> */}

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
  path="/employer/applicants/:jobId"
  element={
    <RequireRole allowedRoles={["employer"]}>
      <EmployerViewApplicants />
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
  path="/employer/applicants"
  element={
    <RequireRole allowedRoles={["employer"]}>
      <EmployerViewApplicants />
    </RequireRole>
  }
/>

      <Route
        path="/admin/jobs"
        element={
          <RequireRole allowedRoles={["admin"]}>
                <JobModeration />
          </RequireRole>
        }
      />
      <Route
  path="/admin/query/:id"
  element={
    <RequireRole allowedRoles={["admin"]}>
      <QueryDetail />
    </RequireRole>
  }
/>
      <Route
path="/admin/queries"
element={
<RequireRole allowedRoles={["admin"]}>
<UserQueries/>
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

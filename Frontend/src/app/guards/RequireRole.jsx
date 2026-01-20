import { Navigate } from "react-router-dom";

export default function RequireRole({ allowedRoles, children }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "candidate") {
      return <Navigate to="/jobs" replace />;
    }
    if (user.role === "employer") {
      return <Navigate to="/employer/dashboard" replace />;
    }
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return children;
}

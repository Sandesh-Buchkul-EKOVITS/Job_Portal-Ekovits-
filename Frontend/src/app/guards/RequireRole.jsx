import { Navigate } from "react-router-dom";

export default function RequireRole({
  allowedRoles,
  children,
}) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  /* 🚫 BLOCK CHECK */
  if (currentUser.blocked) {
    localStorage.removeItem("currentUser");
    return <Navigate to="/login" replace />;
  }

  if (
    !allowedRoles.includes(currentUser.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

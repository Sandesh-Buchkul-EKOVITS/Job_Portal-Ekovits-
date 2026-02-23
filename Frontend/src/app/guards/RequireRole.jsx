// import { Navigate } from "react-router-dom";

// export default function RequireRole({
//   allowedRoles,
//   children,
// }) {
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   /* 🚫 BLOCK CHECK */
//   if (currentUser.blocked) {
//     localStorage.removeItem("currentUser");
//     return <Navigate to="/login" replace />;
//   }

//   if (
//     !allowedRoles.includes(currentUser.role)
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }



// export default function RequireAdmin({ children }) {
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// }







// import { Navigate } from "react-router-dom";

// /* ================= ROLE GUARD ================= */

// export default function RequireRole({
//   allowedRoles,
//   children,
// }) {
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   /* 🚫 BLOCK CHECK */
//   if (currentUser.blocked) {
//     localStorage.removeItem("currentUser");
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(currentUser.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// /* ================= ADMIN GUARD ================= */

// export function RequireAdmin({ children }) {
//   const user = JSON.parse(localStorage.getItem("currentUser"));

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/admin/login" replace />;
//   }

//   return children;
// }




import { Navigate } from "react-router-dom";

export default function RequireRole({ allowedRoles, children }) {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Blocked user
  if (currentUser.blocked) {
    localStorage.removeItem("currentUser");
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

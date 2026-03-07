// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // DEFAULT → CANDIDATE
//   const role = location.state?.role || "candidate";

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const user = users.find(
//       (u) =>
//         u.email === email &&
//         u.password === password &&
//         u.role === role
//     );

//     if (!user) {
//       setError("Invalid email, password, or role");
//       return;
//     }

//     if (user.blocked) {
//       setError("Your account has been blocked by admin.");
//       return;
//     }

//     localStorage.setItem("currentUser", JSON.stringify(user));

//     if (role === "candidate") navigate("/jobs");
//     if (role === "employer") navigate("/employer/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded-xl shadow w-full max-w-sm"
//       >
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div
//             className="h-14 w-14 mx-auto rounded-lg flex items-center justify-center mb-3"
//             style={{ background: gradient }}
//           >
//             {role === "employer" ? (
//               <svg
//                 className="h-7 w-7 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path d="M3 21h18M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12" />
//               </svg>
//             ) : (
//               <svg
//                 className="h-7 w-7 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
//                 <path d="M4 20a8 8 0 0116 0" />
//               </svg>
//             )}
//           </div>

//           <h2 className="text-xl font-semibold">
//             {role === "employer" ? "Employer Login" : "Candidate Login"}
//           </h2>
//         </div>

//         {error && (
//           <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 rounded w-full mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 rounded w-full mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           style={{ background: gradient }}
//           className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }











import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // DEFAULT → CANDIDATE
  const role = location.state?.role || "candidate";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const users = JSON.parse(localStorage.getItem("users")) || [];

  //   const user = users.find(
  //     (u) =>
  //       u.email === email &&
  //       u.password === password &&
  //       u.role === role
  //   );

  //   if (!user) {
  //     setError("Invalid email, password, or role");
  //     return;
  //   }

  //   if (user.blocked) {
  //     setError("Your account has been blocked by admin.");
  //     return;
  //   }

  //   localStorage.setItem("currentUser", JSON.stringify(user));

  //   if (role === "candidate") navigate("/jobs");
  //   if (role === "employer") navigate("/employer/dashboard");
  // };





//   const handleLogin = async (e) => {
//   e.preventDefault();

//   const res = await fetch("http://localhost:5000/api/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password, role })
//   });

//   const data = await res.json();

//   if (!data.success) {
//     setError(data.message);
//     return;
//   }

//   localStorage.setItem("token", data.token);
// localStorage.setItem("currentUser", JSON.stringify(data.user));


//  if (role === "candidate") navigate("/candidate/profile");

//   if (role === "employer") navigate("/employer/dashboard");
// };

















const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password,role })
  });

  const data = await res.json();

  if (!data.success) {
    setError(data.message);
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("currentUser", JSON.stringify(data.user));

  if (role === "candidate") navigate("/candidate/profile");
  if (role === "employer") navigate("/employer/dashboard");
  if (role === "admin") navigate("/admin/dashboard");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="h-14 w-14 mx-auto rounded-lg flex items-center justify-center mb-3"
            style={{ background: gradient }}
          >
            {role === "employer" ? (
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M3 21h18M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12" />
              </svg>
            ) : (
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                <path d="M4 20a8 8 0 0116 0" />
              </svg>
            )}
          </div>

          <h2 className="text-xl font-semibold">
            {role === "employer" ? "Employer Login" : "Candidate Login"}
          </h2>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 🔥 FORGOT PASSWORD LINK */}
        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          style={{ background: gradient }}
          className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

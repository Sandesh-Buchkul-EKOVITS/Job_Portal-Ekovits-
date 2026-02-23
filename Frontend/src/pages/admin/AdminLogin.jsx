// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const FIXED_ADMIN = {
//   id: "ADMIN_001",
//   name: "Ekovits",
//   email: "superadmin@ekovits.com",
//   password: "Ekovits@123",
//   role: "admin",
// };

// export default function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (
//       email !== FIXED_ADMIN.email ||
//       password !== FIXED_ADMIN.password
//     ) {
//       setError("Invalid admin credentials");
//       return;
//     }

//     localStorage.setItem(
//       "currentUser",
//       JSON.stringify(FIXED_ADMIN)
//     );

//     navigate("/admin/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 rounded shadow w-full max-w-sm"
//       >
//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Admin Login
//         </h2>

//         {error && (
//           <p className="text-red-600 text-sm mb-3">{error}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Admin Email"
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
//           className="bg-black text-white py-2 rounded w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }






















import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "admin",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      // ✅ Save user
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      navigate("/admin/dashboard");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

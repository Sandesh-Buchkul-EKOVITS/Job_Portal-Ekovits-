import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- FIXED SUPER ADMIN ---------- */
const FIXED_ADMIN = {
  id: "ADMIN_001",
  name: "Ekovits",
  email: "superadmin@ekovits.com",
  password: "Ekovits@123",
  role: "admin",
};

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    /* ---------- SUPER ADMIN LOGIN ---------- */
    if (
      email === FIXED_ADMIN.email &&
      password === FIXED_ADMIN.password
    ) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(FIXED_ADMIN)
      );
      navigate("/admin/dashboard");
      return;
    }

    /* ---------- NORMAL USERS ---------- */
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    /* ---------- BLOCK CHECK ---------- */
    if (user.blocked) {
      setError(
        "Your account has been blocked by admin. Please contact support."
      );
      localStorage.removeItem("currentUser");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    /* ---------- REDIRECT ---------- */
    if (user.role === "candidate") {
      navigate("/jobs");
    } else if (user.role === "employer") {
      navigate("/employer/dashboard");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

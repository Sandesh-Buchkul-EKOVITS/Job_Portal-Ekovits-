import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    /* 🔐 FIXED ADMIN LOGIN (ALWAYS WORKS) */
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

    /* 🔐 NORMAL USER LOGIN */
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>

        <p className="text-xs text-gray-500 text-center mt-2">
          Admin Login:<br />
          superadmin@jobportal.com / SuperAdmin@123
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleReset = async () => {
    if (password !== confirm)
      return alert("Passwords do not match");

    const res = await fetch("http://localhost:5000/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),


    });

    const data = await res.json();

    if (data.success) {
      alert("Password updated");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-lg font-semibold">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />







<button
  onClick={handleReset}
  style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
  className="w-full text-white py-2 rounded hover:opacity-90 transition"
>
  Reset Password
</button>

        {/* <button
          onClick={handleReset}
          
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Reset Password
        </button> */}
      </div>
    </div>
  );
}

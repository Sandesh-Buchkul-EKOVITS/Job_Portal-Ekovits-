import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    alert("If email exists, reset link sent");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h2 className="text-lg font-semibold">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />







<button
  onClick={handleSubmit}
  style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
  className="w-full text-white py-2 rounded hover:opacity-90 transition"
>
  Send Reset Link
</button>

        {/* <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-2 rounded"
        >
          Send Reset Link
        </button> */}
      </div>
    </div>
  );
}

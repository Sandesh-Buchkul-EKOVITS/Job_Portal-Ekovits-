import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("candidate");

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    designation: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === form.email)) {
      alert("User already exists");
      return;
    }

    let newUser = {
      id: Date.now(),
      role,
      name: form.name,
      email: form.email,
      contact: form.contact,
      password: form.password,
    };

    if (role === "candidate") {
      newUser = {
        ...newUser,
        skills: [],
        resume: "",
        photo: "",
        location: "",
        ctc: "",
        profileCompleted: false,
      };
    }

    if (role === "employer") {
      newUser = {
        ...newUser,
        companyName: form.companyName,
        designation: form.designation,
      };
    }

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        name: newUser.name,
      })
    );

    if (role === "candidate") {
      navigate("/candidate/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>

        <input
          required
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        {role === "employer" && (
          <>
            <input
              required
              name="companyName"
              placeholder="Company Name"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
            <input
              required
              name="designation"
              placeholder="Designation"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />
          </>
        )}

        <input
          required
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          required
          name="contact"
          placeholder="Contact Number"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          required
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          {role === "candidate"
            ? "Continue to Profile"
            : "Register"}
        </button>
      </form>
    </div>
  );
}

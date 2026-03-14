import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CandidateRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    status: "",
    updates: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.contact.match(/^[0-9]{10}$/))
      newErrors.contact = "Enter a valid 10-digit mobile number";
    if (!form.status) newErrors.status = "Please select work status";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const users = JSON.parse(localStorage.getItem("users")) || [];

  //   if (users.some((u) => u.email === form.email)) {
  //     alert("User already exists");
  //     return;
  //   }

  //   const newUser = {
  //     id: Date.now(),
  //     role: "candidate",
  //     name: form.name,
  //     email: form.email,
  //     contact: form.contact,
  //     password: form.password,
  //     status: form.status,
  //     updates: form.updates,
  //     skills: [],
  //     resume: "",
  //     photo: "",
  //     location: "",
  //     ctc: "",
  //     profileCompleted: false,
  //   };

  //   localStorage.setItem("users", JSON.stringify([...users, newUser]));
  //   localStorage.setItem(
  //     "currentUser",
  //     JSON.stringify({
  //       id: newUser.id,
  //       role: newUser.role,
  //       email: newUser.email,
  //       name: newUser.name,
  //     })
  //   );

  //   navigate("/candidate/profile");
  // };




const handleRegister = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "candidate",              // 🔥 VERY IMPORTANT
        email: form.email,
        password: form.password,
        name: form.name,
        contact: form.contact
      }),
    });

    const data = await res.json();
    const redirectPath = location.state?.from || null;

    if (data.success) {
      localStorage.setItem("token", data.token);
       localStorage.setItem("currentUser", JSON.stringify({
    ...data.user,
    contact: form.contact
  }));

      alert("Registered successfully");
       if (redirectPath) {
    navigate(redirectPath);
  } else {
    navigate("/jobs");
  }

      // DIRECT JOBS PAGE
     // navigate("/jobs");
      //alert("Registered successfully");
   //   navigate("/login", {
  //state: {
   // role: "candidate",
   // from: redirectPath
//  }
//});
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          Create your Candidate profile
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Take the next step in your career journey
        </p>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full name*</label>
          <input
            name="name"
            placeholder="What is your name?"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email ID*</label>
          <input
            name="email"
            type="email"
            placeholder="Tell us your Email ID"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password*</label>
          <input
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium">Mobile number*</label>
          <div className="flex">
            <span className="px-3 py-2 border border-r-0 rounded-l bg-gray-100">
              +91
            </span>
            <input
              name="contact"
              placeholder="Enter your mobile number"
              className="w-full border p-2 rounded-r"
              onChange={handleChange}
            />
          </div>
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact}</p>
          )}
        </div>

        {/* Work Status */}
        <div>
          <label className="block text-sm font-medium">Work status*</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="experienced"
                onChange={handleChange}
              />
              <span className="ml-2">I'm experienced</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="fresher"
                onChange={handleChange}
              />
              <span className="ml-2">I'm a fresher</span>
            </label>
          </div>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg,#ff0066,#8000ff)",
          }}
          className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
        >
          Register now
        </button>
      </form>
    </div>
  );
}

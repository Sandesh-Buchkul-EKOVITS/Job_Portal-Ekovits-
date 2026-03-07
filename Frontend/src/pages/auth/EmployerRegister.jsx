import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function EmployerRegister() {

const navigate = useNavigate();
// useEffect(() => {
//   const verifiedEmail = localStorage.getItem("verifiedEmail");

//   if (!verifiedEmail) {
//     navigate("/verify-email");
//   }
// }, [navigate]);


useEffect(() => {
  if (!sessionStorage.getItem("otpVerified")) {
    navigate("/verify-email");
  }
}, [navigate]);
useEffect(() => {
  if (!sessionStorage.getItem("otpVerified")) {
    navigate("/verify-email");
  }
}, [navigate]);


  

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  const [form, setForm] = useState({
    companyName: "",
    recruiterName: "",
    email: "",
    password: "",
    phone: "",
    industry: "",
    companySize: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!form.recruiterName.trim())
      newErrors.recruiterName = "Recruiter name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter a valid 10-digit mobile number";
    if (!form.industry)
      newErrors.industry = "Please select an industry";
    if (!form.companySize)
      newErrors.companySize = "Please select company size";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;

  //   const users = JSON.parse(localStorage.getItem("users")) || [];

  //   if (users.some((u) => u.email === form.email)) {
  //     alert("Employer already exists with this email");
  //     return;
  //   }

  //   const newEmployer = {
  //     id: Date.now(),
  //     role: "employer",
  //     companyName: form.companyName,
  //     recruiterName: form.recruiterName,
  //     email: form.email,
  //     phone: form.phone,
  //     industry: form.industry,
  //     companySize: form.companySize,
  //     password: form.password,
  //     subscription: "free",
  //     jobsPosted: 0,
  //     blocked: false,
  //     profileCompleted: false,
  //   };

  //   localStorage.setItem("users", JSON.stringify([...users, newEmployer]));
  //   localStorage.setItem("currentUser", JSON.stringify(newEmployer));

  //   navigate("/employer/dashboard");
  // };



const handleRegister = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  role: "employer",
  email: form.email,
  password: form.password,
  name: form.recruiterName,
  companyName: form.companyName,
  phone: form.phone,
  industry: form.industry,
  companySize: form.companySize
})
  });

  const data = await res.json();

  if (!data.success) {
    alert(data.message);
    return;
  }

  navigate("/login");
};








  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
      >
        {/* Header */}
        <div className="text-center">
          <div
            className="h-14 w-14 mx-auto rounded-lg flex items-center justify-center mb-3"
            style={{ background: gradient }}
          >
            {/* Building Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21h18M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12M9 10h.01M9 14h.01M15 10h.01M15 14h.01"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold">Employer Registration</h2>
          <p className="text-sm text-gray-500">
            Hire faster. Find the right talent.
          </p>
        </div>

        {/* Company Name */}
        <div>
          <input
            name="companyName"
            placeholder="Company name*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>

        {/* Recruiter Name */}
        <div>
          <input
            name="recruiterName"
            placeholder="Recruiter / HR name*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.recruiterName && (
            <p className="text-red-500 text-sm">{errors.recruiterName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            name="email"
            type="email"
            placeholder="Official email ID*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            name="phone"
            placeholder="Mobile number*"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Industry */}
        <div>
          <select
            name="industry"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select industry*</option>
            <option value="IT">IT / Software</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Other">Other</option>
          </select>
          {errors.industry && (
            <p className="text-red-500 text-sm">{errors.industry}</p>
          )}
        </div>

        {/* Company Size */}
        <div>
          <select
            name="companySize"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Company size*</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="201-500">201–500</option>
            <option value="500+">500+</option>
          </select>
          {errors.companySize && (
            <p className="text-red-500 text-sm">{errors.companySize}</p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          style={{ background: gradient }}
          className="w-full py-2 rounded text-white font-semibold hover:opacity-90 transition"
        >
          Register as Employer
        </button>
      </form>
    </div>
  );
}

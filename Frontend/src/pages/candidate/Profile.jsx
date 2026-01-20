import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function CandidateProfile() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const existingProfile = users.find(
    (u) => u.id === currentUser.id
  );

  const [form, setForm] = useState({
    name: existingProfile.name || "",
    email: existingProfile.email || "",
    contact: existingProfile.contact || "",
    location: existingProfile.location || "",
    ctc: existingProfile.ctc || "",
    skills: existingProfile.skills || [],
    photo: existingProfile.photo || "",
    resume: existingProfile.resume || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setForm({
      ...form,
      skills: e.target.value.split(",").map((s) => s.trim()),
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, [field]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUsers = users.map((u) =>
      u.id === currentUser.id
        ? {
            ...u,
            ...form,
            profileCompleted: true,
          }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    alert("Profile updated successfully");

    navigate("/jobs");
  };

  return (
    <DashboardLayout title="My Profile">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white p-6 rounded shadow space-y-4"
      >
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded"
            required
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="border p-2 rounded bg-gray-100"
          />

          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border p-2 rounded"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
          />

          <input
            name="ctc"
            value={form.ctc}
            onChange={handleChange}
            placeholder="Current CTC (Optional)"
            className="border p-2 rounded"
          />
        </div>

        {/* SKILLS */}
        <textarea
          value={form.skills.join(", ")}
          onChange={handleSkillsChange}
          placeholder="Key Skills (comma separated)"
          className="border p-2 rounded w-full"
          rows={3}
        />

        {/* FILE UPLOADS */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileUpload(e, "photo")
              }
            />
            {form.photo && (
              <img
                src={form.photo}
                alt="Profile"
                className="w-20 h-20 rounded-full mt-2"
              />
            )}
          </div>

          <div>
            <label className="text-sm font-medium">
              Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                handleFileUpload(e, "resume")
              }
            />
            {form.resume && (
              <p className="text-sm text-green-600 mt-2">
                Resume uploaded
              </p>
            )}
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Profile
        </button>
      </form>
    </DashboardLayout>
  );
}

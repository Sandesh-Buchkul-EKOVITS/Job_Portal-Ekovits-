import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    workMode: "Remote",
    location: "",
    industry: "",
    jobType: "Full-time",
    experience: "",
    salaryType: "Range",
    salaryPeriod: "Yearly",
    salaryMin: "",
    salaryMax: "",
    keySkills: "",
    highlights: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    const newJob = {
      id: Date.now(),
      title: form.title,
      company: form.company,
      workMode: form.workMode,
      location: form.location,
      industry: form.industry,
      jobType: form.jobType,
      experience: form.experience,
      salaryType: form.salaryType,
      salaryPeriod: form.salaryPeriod,
      salaryMin: form.salaryMin,
      salaryMax: form.salaryMax,
      keySkills: form.keySkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      highlights: form.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      description: form.description,
      status: "pending",
      postedBy: "employer_demo",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "jobs",
      JSON.stringify([newJob, ...existingJobs])
    );

    alert("Job submitted for admin approval");
    navigate("/employer/dashboard");
  };

  return (
    <DashboardLayout title="Post a Job">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-4"
      >
        {/* BASIC INFO */}
        <input
          name="title"
          required
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={handleChange}
        />

        <input
          name="company"
          required
          placeholder="Company Name"
          className="w-full border p-2 rounded"
          value={form.company}
          onChange={handleChange}
        />

        {/* WORK MODE & LOCATION */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="workMode"
            className="border p-2 rounded"
            value={form.workMode}
            onChange={handleChange}
          >
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>

          <input
            name="location"
            required
            placeholder="Location (City / Country)"
            className="border p-2 rounded"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* INDUSTRY & JOB TYPE */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="industry"
            required
            className="border p-2 rounded"
            value={form.industry}
            onChange={handleChange}
          >
            <option value="">Select Industry</option>
            <option>IT / Software</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>E-commerce</option>
            <option>Manufacturing</option>
            <option>Education</option>
            <option>Startup</option>
          </select>

          <select
            name="jobType"
            className="border p-2 rounded"
            value={form.jobType}
            onChange={handleChange}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        {/* EXPERIENCE */}
        <input
          name="experience"
          required
          placeholder="Experience required (e.g. 2–4 years)"
          className="w-full border p-2 rounded"
          value={form.experience}
          onChange={handleChange}
        />

        {/* SALARY */}
        <div className="grid md:grid-cols-4 gap-4">
          <select
            name="salaryType"
            className="border p-2 rounded"
            value={form.salaryType}
            onChange={handleChange}
          >
            <option>Range</option>
            <option>Fixed</option>
          </select>

          <select
            name="salaryPeriod"
            className="border p-2 rounded"
            value={form.salaryPeriod}
            onChange={handleChange}
          >
            <option>Yearly</option>
            <option>Monthly</option>
          </select>

          <input
            name="salaryMin"
            placeholder="Min Salary"
            className="border p-2 rounded"
            value={form.salaryMin}
            onChange={handleChange}
          />

          <input
            name="salaryMax"
            placeholder="Max Salary"
            className="border p-2 rounded"
            value={form.salaryMax}
            onChange={handleChange}
          />
        </div>

        {/* KEY SKILLS */}
        <textarea
          name="keySkills"
          placeholder="Key skills (comma separated)"
          rows={2}
          className="w-full border p-2 rounded"
          value={form.keySkills}
          onChange={handleChange}
        />

        {/* JOB HIGHLIGHTS */}
        <textarea
          name="highlights"
          placeholder="Short job highlights (one per line)"
          rows={3}
          className="w-full border p-2 rounded"
          value={form.highlights}
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          required
          placeholder="Detailed job description"
          rows={6}
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit Job for Approval
        </button>
      </form>
    </DashboardLayout>
  );
}

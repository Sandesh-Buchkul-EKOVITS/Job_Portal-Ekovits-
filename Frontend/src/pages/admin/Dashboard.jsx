import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];
    const jobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    setStats({
      users: users.length,
      candidates: users.filter(
        (u) => u.role === "candidate"
      ).length,
      employers: users.filter(
        (u) => u.role === "employer"
      ).length,
      jobs: jobs.length,
      pendingJobs: jobs.filter(
        (j) => j.status === "pending"
      ).length,
      approvedJobs: jobs.filter(
        (j) => j.status === "approved"
      ).length,
      rejectedJobs: jobs.filter(
        (j) => j.status === "rejected"
      ).length,
    });
  }, []);

  if (!stats) return null;

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="Total Users"
          value={stats.users}
          onClick={() =>
            navigate("/admin/users")
          }
        />

        <Card
          title="Candidates"
          value={stats.candidates}
          onClick={() =>
            navigate("/admin/candidates")
          }
        />

        {/* ✅ FIXED */}
        <Card
          title="Employers"
          value={stats.employers}
          onClick={() =>
            navigate("/admin/employers")
          }
        />

        <Card
          title="Total Jobs"
          value={stats.jobs}
          onClick={() =>
            navigate("/admin/jobs")
          }
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Pending Jobs"
          value={stats.pendingJobs}
          onClick={() =>
            navigate("/admin/jobs?status=pending")
          }
        />

        <Card
          title="Approved Jobs"
          value={stats.approvedJobs}
          onClick={() =>
            navigate("/admin/jobs?status=approved")
          }
        />

        <Card
          title="Rejected Jobs"
          value={stats.rejectedJobs}
          onClick={() =>
            navigate("/admin/jobs?status=rejected")
          }
        />
      </div>
    </DashboardLayout>
  );
}

function Card({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded shadow cursor-pointer hover:shadow-md"
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

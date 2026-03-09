import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [planRequests, setPlanRequests] = useState([]);


 useEffect(() => {
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
   setStats({
  users: data.stats.totalUsers,
  candidates: data.stats.candidates,
  employers: data.stats.employers,
  jobs: data.stats.jobs,
  pendingJobs: data.stats.pendingJobs,
  approvedJobs: data.stats.approvedJobs,
  rejectedJobs: data.stats.rejectedJobs,
  userQueries: data.stats.userQueries
});

      }
    } catch (err) {
      console.log("Dashboard Fetch Error:", err);
    }
  };

  fetchStats();
}, []);

// 🔥 YAHAN SE PASTE KARNA HAI
useEffect(() => {
  const fetchPlanRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/admin/plan-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setPlanRequests(data.requests);
      }
    } catch (err) {
      console.log("Plan Request Fetch Error:", err);
    }
  };

  fetchPlanRequests();
}, []);   // 👈 yahan khatam hoga second useEffect
















  if (!stats) return null;

  return (
    <DashboardLayout title="Admin Dashboard">

{planRequests.length > 0 && (
  <div className="bg-yellow-50 border border-yellow-300 p-4 rounded mb-6">
    <p className="font-semibold text-yellow-800 mb-2">
      🚀 Plan Upgrade Requests Pending
    </p>

    {planRequests.map((req) => (
      <div key={req.id} className="text-sm text-yellow-700 mb-2">
        <strong>{req.company_name}</strong> ({req.email}) requested upgrade to{" "}
        <strong>{req.plan_request}</strong>
      </div>
    ))}

    <button
      onClick={() => navigate("/admin/employers")}
      className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded text-sm"
    >
      Review Requests
    </button>
  </div>
)}







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

     <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
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
     <Card
  title="User Queries"
  value={stats.userQueries}
  onClick={() =>
    navigate("/admin/queries")
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

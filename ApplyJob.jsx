import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs.find((j) => j.id === id);

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");

  useEffect(() => {
    if (!user) return;

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const existing = applications.find(
      (a) => a.jobId === id && a.userId === user.id
    );

    if (existing) {
      setAlreadyApplied(true);
      setApplicationStatus(existing.status);
    }
  }, [id, user]);

  // ✅ JOB NOT FOUND (PINK BACKGROUND)
  if (!job) {
    return (
      <DashboardLayout title="Apply Job">
        <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center">
            <p className="text-gray-700 font-medium">Job not found.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const applyJob = () => {
    if (alreadyApplied) return;

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now().toString(),
      jobId: id,
      userId: user.id,
      employerId: job.employerId,
      status: "applied",
      appliedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "applications",
      JSON.stringify([...applications, newApplication])
    );

    setAlreadyApplied(true);
    setApplicationStatus("applied");

    navigate("/candidate/applications");
  };

  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <DashboardLayout title="Apply Job">
      {/* ✅ PINK BACKGROUND WRAPPER */}
      <div className="min-h-screen bg-pink-50 py-10 px-4">
        <div className="bg-white p-6 rounded-xl shadow space-y-4 max-w-3xl mx-auto">

          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.companyName}</p>

          {alreadyApplied && (
            <div
              className={`text-sm font-medium capitalize ${statusColor(
                applicationStatus
              )}`}
            >
              You have already applied for this job
              {applicationStatus && ` • Status: ${applicationStatus}`}
            </div>
          )}

          <button
            onClick={applyJob}
            disabled={alreadyApplied}
            className={`px-3 py-1 rounded text-white ${
              alreadyApplied
                ? "bg-[linear-gradient(90deg,#ff0066,#8000ff)]"
                : "bg-[linear-gradient(90deg,#ff0066,#8000ff)]"
            }`}
          >
            {alreadyApplied ? "Already Applied" : "Confirm & Apply"}
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}


import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <DashboardLayout title="Job Details">
        <div className="bg-white p-6 rounded shadow">
          Job not found.
        </div>
      </DashboardLayout>
    );
  }

  const application =
    user?.role === "candidate"
      ? applications.find(
          (a) => a.jobId === id && a.userId === user.id
        )
      : null;

  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <DashboardLayout title="Job Details">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold">
            {job.title}
          </h1>
          <p className="text-gray-600">
            {job.companyName}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {job.location} • {job.workMode}
          </p>
        </div>

        {/* META DETAILS (ABOVE APPLY) */}
        <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <strong>Experience:</strong>{" "}
            {job.experience}
          </div>
          <div>
            <strong>Salary:</strong>{" "}
            {job.salaryFrom} – {job.salaryTo}
          </div>
          <div>
            <strong>Industry:</strong>{" "}
            {job.industry}
          </div>
          <div>
            <strong>Skills:</strong>{" "}
            {job.skills?.join(", ") || "-"}
          </div>
        </div>

        {/* APPLY / STATUS SECTION */}
        {user?.role === "candidate" && (
          <div className="bg-white p-6 rounded shadow">
            {application ? (
              <div className="space-y-1">
                <p
                  className={`font-medium ${statusColor(
                    application.status
                  )}`}
                >
                  You have already applied for this job
                </p>
                <p
                  className={`text-sm capitalize ${statusColor(
                    application.status
                  )}`}
                >
                  Status: {application.status}
                </p>
              </div>
            ) : (
              <button
                onClick={() =>
                  navigate(`/candidate/apply/${job.id}`)
                }
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Apply Now
              </button>
            )}
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-2">
            Job Description
          </h2>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}

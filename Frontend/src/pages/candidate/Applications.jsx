import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function CandidateApplications() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const myApplications = applications
    .filter((a) => a.candidateId === currentUser.id)
    .map((app) => {
      const job = jobs.find((j) => j.id === app.jobId);
      return { ...app, job };
    })
    .filter((item) => item.job); // safety

  return (
    <DashboardLayout title="My Applications">
      {myApplications.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">
          You have not applied to any jobs yet.
        </div>
      ) : (
        <div className="space-y-4">
          {myApplications.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.job.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.job.company}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.job.location} • {item.job.jobType} •{" "}
                    {item.job.workMode}
                  </p>
                </div>

                <span className="text-sm font-medium text-blue-600">
                  {item.status}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-xs text-gray-500">
                  Applied on:{" "}
                  {new Date(item.appliedAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() =>
                    navigate(`/jobs/${item.job.id}`)
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

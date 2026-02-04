import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function CandidateApplications() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "candidate") {
    return (
      <DashboardLayout title="My Applications">
        <div className="bg-white p-6 rounded shadow text-gray-600">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const myApplications = applications.filter(
    (a) => a.userId === currentUser.id
  );

  const getJob = (jobId) =>
    jobs.find((j) => j.id === jobId);


  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <DashboardLayout title="My Applications">
      <div className="max-w-5xl mx-auto space-y-4">

        {myApplications.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-gray-600">
            You have not applied to any jobs yet.
          </div>
        ) : (
          myApplications.map((app) => {
            const job = getJob(app.jobId);

            if (!job) return null;

            return (
              <div
                key={app.id}
                className="bg-white p-5 rounded shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {job.companyName}
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied on{" "}
                      {new Date(
                        app.appliedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`text-sm font-medium capitalize ${statusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            );
          })
        )}

      </div>
    </DashboardLayout>
  );
}

import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs =
      JSON.parse(localStorage.getItem("jobs")) || [];

    const myJobs = storedJobs.filter(
      (job) => job.postedBy === "employer_demo"
    );

    setJobs(myJobs);
  }, []);

  const badgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout title="My Jobs">
      {jobs.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          You haven’t posted any jobs yet.
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}
                </p>
                <p className="text-xs text-gray-500">
                  {job.workMode} • {job.jobType}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded ${badgeClass(
                  job.status
                )}`}
              >
                {job.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

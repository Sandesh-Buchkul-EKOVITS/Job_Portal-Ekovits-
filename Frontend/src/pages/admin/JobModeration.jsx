import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";

export default function JobModeration() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
  }, []);

  const updateStatus = (id, status) => {
    const updated = jobs.map(job =>
      job.id === id ? { ...job, status } : job
    );
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  return (
    <DashboardLayout title="Job Moderation">
      <BackButton />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Company</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b">
              <td className="p-2">{job.title}</td>
              <td className="p-2">{job.company}</td>
              <td className="p-2 font-semibold">
                {job.status}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() =>
                    updateStatus(job.id, "approved")
                  }
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(job.id, "rejected")
                  }
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>

                <button
                  onClick={() =>
                    updateStatus(job.id, "stopped")
                  }
                  className="bg-gray-600 text-white px-2 py-1 rounded"
                >
                  Stop
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

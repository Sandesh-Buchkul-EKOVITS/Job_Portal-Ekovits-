import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useEffect, useState } from "react";

export default function AdminJobs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Jobs">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [viewJob, setViewJob] = useState(null); // ✅ MODAL STATE

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(data);
  }, []);

  const saveJobs = (updated) => {
    localStorage.setItem("jobs", JSON.stringify(updated));
    setJobs(updated);
  };

  const updateStatus = (id, status) => {
    const updated = jobs.map((j) =>
      j.id === id ? { ...j, status } : j
    );
    saveJobs(updated);
  };

  const deleteJob = (jobId) => {
    const confirm = window.confirm(
      "This will permanently delete the job and all its applications. This action cannot be undone. Continue?"
    );
    if (!confirm) return;

    const updatedJobs = jobs.filter((j) => j.id !== jobId);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplications = applications.filter(
      (a) => a.jobId !== jobId
    );
    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );
  };

  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((j) => j.status === filter);

  return (
    <DashboardLayout title="Job Moderation">
      {/* FILTERS */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {["all", "pending", "approved", "rejected", "closed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded border text-sm ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredJobs.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-gray-500"
                >
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <>
                  {/* MAIN ROW */}
                  <tr key={job.id} className="border-t">
                    <td className="p-3">{job.title}</td>
                    <td className="p-3">
                      {job.companyName || job.company}
                    </td>
                    <td className="p-3">{job.location}</td>
                    <td className="p-3 font-medium">
                      {job.status}
                    </td>
                    <td className="p-3 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() =>
                          setExpandedJobId(
                            expandedJobId === job.id
                              ? null
                              : job.id
                          )
                        }
                        className="text-blue-600 text-xs underline"
                      >
                        {expandedJobId === job.id
                          ? "Hide Details"
                          : "View Details"}
                      </button>

                      <button
                        onClick={() => setViewJob(job)}
                        className="text-indigo-600 text-xs underline"
                      >
                        View Full Description
                      </button>

                      {job.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(job.id, "approved")
                            }
                            className="text-green-600 text-xs underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(job.id, "rejected")
                            }
                            className="text-red-600 text-xs underline"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {job.status === "approved" && (
                        <button
                          onClick={() =>
                            updateStatus(job.id, "closed")
                          }
                          className="text-orange-600 text-xs underline"
                        >
                          Close
                        </button>
                      )}

                      {(job.status === "rejected" ||
                        job.status === "closed") && (
                        <button
                          onClick={() =>
                            updateStatus(job.id, "pending")
                          }
                          className="text-blue-600 text-xs underline"
                        >
                          Reopen
                        </button>
                      )}

                      <button
                        onClick={() => deleteJob(job.id)}
                        className="text-red-700 text-xs underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* EXPANDED DETAILS */}
                  {expandedJobId === job.id && (
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="p-4">
                        <div className="space-y-3">
                          <div className="text-sm text-gray-600">
                            <span>
                              Experience: {job.experience || "N/A"}
                            </span>{" "}
                            •{" "}
                            <span>
                              Work Mode: {job.workMode || "N/A"}
                            </span>{" "}
                            •{" "}
                            <span>
                              Salary: {job.salaryFrom} - {job.salaryTo}
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold">Skills</p>
                            <p className="text-sm text-gray-700">
                              {job.skills?.length
                                ? job.skills.join(", ")
                                : "Not specified"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== FULL DESCRIPTION MODAL ===== */}
      {viewJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full p-6 rounded shadow relative">
            <button
              onClick={() => setViewJob(null)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2">
              {viewJob.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {viewJob.companyName || viewJob.company} •{" "}
              {viewJob.location}
            </p>

            <div
              className="text-sm max-h-[60vh] overflow-y-auto prose"
              dangerouslySetInnerHTML={{
                __html: viewJob.description || "<p>No description provided</p>",
              }}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

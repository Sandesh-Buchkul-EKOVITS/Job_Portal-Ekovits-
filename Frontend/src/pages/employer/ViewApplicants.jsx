import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function ViewApplicants() {
  const navigate = useNavigate();

  const employer = JSON.parse(localStorage.getItem("currentUser"));

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
  }, []);

  // ✅ GET JOB IDS OWNED BY EMPLOYER
  const employerJobIds = jobs
    .filter((job) => job.employerId === employer.id)
    .map((job) => job.id);

  // ✅ GET APPLICATIONS FOR THOSE JOBS
  const employerApplications = applications.filter((app) =>
    employerJobIds.includes(app.jobId)
  );

  const updateStatus = (applicationId, status) => {
    const updated = applications.map((app) =>
      app.id === applicationId ? { ...app, status } : app
    );

    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
  };

  const getJob = (id) => jobs.find((j) => j.id === id);
  const getCandidate = (id) => users.find((u) => u.id === id);

  return (
    <DashboardLayout title="Applicants">
      {employerApplications.length === 0 && (
        <p className="text-gray-600">
          No applications received yet.
        </p>
      )}

      <div className="space-y-4">
        {employerApplications.map((app) => {
          const job = getJob(app.jobId);
          const candidate = getCandidate(app.candidateId);

          if (!job || !candidate) return null;

          return (
            <div
              key={app.id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {candidate.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Job: {job.title}
                </p>
                <p className="mt-1">
                  Status: <strong>{app.status}</strong>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    navigate(`/employer/candidate/${candidate.id}`)
                  }
                  className="border px-3 py-1 rounded"
                >
                  View Profile
                </button>

                {app.status === "Applied" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(app.id, "Shortlisted")
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app.id, "Rejected")
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

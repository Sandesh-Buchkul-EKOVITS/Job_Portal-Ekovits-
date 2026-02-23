import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getCandidateProfile } from "../../app/services/profileService";

export default function ViewApplicants() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "employer") {
    return null;
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications = JSON.parse(localStorage.getItem("applications")) || [];

  /* 🔒 STEP 1: ONLY jobs posted by THIS employer */
  const myJobs = jobs.filter(
    (job) => job.employerId === currentUser.id
  );

  /* 🔒 STEP 2: Job IDs owned by this employer */
  const myJobIds = myJobs.map((job) => job.id);

  /* 🔒 STEP 3: ONLY applications for employer’s jobs */
  const myApplications = applications.filter(
    (app) => myJobIds.includes(app.jobId)
  );

  const updateStatus = (appId, status) => {
    const updated = applications.map((a) =>
      a.id === appId ? { ...a, status } : a
    );
    localStorage.setItem("applications", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <DashboardLayout title="Applicants">
      <div className="max-w-5xl mx-auto space-y-4">

        {/* HEADER */}
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold">
            Applicants for Your Jobs
          </h2>
          <p className="text-sm text-gray-600">
            Showing candidates who applied to jobs posted by you
          </p>
        </div>

        {myApplications.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No applicants yet.
          </div>
        ) : (
          myApplications.map((app) => {
            const profile = getCandidateProfile(app.userId);
            const job = myJobs.find((j) => j.id === app.jobId);

            return (
              <div
                key={app.id}
                className="bg-white p-5 rounded shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {profile?.name || "Candidate"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied for <strong>{job?.title}</strong>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-sm capitalize text-blue-600">
                    {app.status}
                  </span>
                </div>

                <div className="flex gap-4 mt-4 text-sm">
                  <button
                    onClick={() =>
                      navigate(`/employer/candidate/${app.userId}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>

                  {app.status !== "shortlisted" && (
                    <button
                      onClick={() =>
                        updateStatus(app.id, "shortlisted")
                      }
                      className="text-green-600 hover:underline"
                    >
                      Shortlist
                    </button>
                  )}

                  {app.status !== "rejected" && (
                    <button
                      onClick={() =>
                        updateStatus(app.id, "rejected")
                      }
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        <button
          onClick={() => navigate("/employer/my-jobs")}
          className="text-sm text-blue-600 underline"
        >
          ← Back to My Jobs
        </button>
      </div>
    </DashboardLayout>
  );
}

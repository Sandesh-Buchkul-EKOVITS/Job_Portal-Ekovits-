import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function MyJobs() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "employer") {
    return (
      <DashboardLayout title="My Jobs">
        <div className="bg-white p-6 rounded shadow">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const myJobs = jobs.filter(
    (job) => job.employerId === currentUser.id
  );

  const applicantCount = (jobId) =>
    applications.filter((a) => a.jobId === jobId).length;

  const closeJob = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId
        ? { ...job, status: "closed" }
        : job
    );

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    window.location.reload();
  };

  return (
    <DashboardLayout title="My Jobs">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
     <h2 className="text-3xl font-bold text-slate-800 tracking-tight">

            Jobs Posted by You
          </h2>
          
          <button
            onClick={() => navigate("/employer/post-job")}
            className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] text-white px-4 py-2 rounded"

          >
            + Post New Job
          </button>
        </div>

        {myJobs.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            You have not posted any jobs yet.
          </div>
        ) : (
          myJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded shadow"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.companyName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {job.location} • {job.workMode}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">
                    {applicantCount(job.id)} Applicants
                  </p>
                  <p className="text-xs text-gray-500">
                    Status: {job.status}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 mt-4 text-sm">
                <button
                  onClick={() =>
                    // navigate(`/employer/applicants?jobId=${job.id}`)
                    navigate(`/employer/applicants/${job.id}`)

                  }
                  className="text-blue-600 hover:underline"
                >
                  View Applicants
                </button>

                {job.status !== "closed" && (
                  <button
                    onClick={() =>
                      navigate(`/employer/post-job?jobId=${job.id}`)
                    }
                    className="text-gray-700 hover:underline"
                  >
                    Edit Job
                  </button>
                )}

                {job.status !== "closed" && (
                  <button
                    onClick={() => closeJob(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Close Job
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

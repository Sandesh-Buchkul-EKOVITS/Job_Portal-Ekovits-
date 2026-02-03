import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";
import { getSavedJobs } from "../../utils/jobBookmarks";
import JobCard from "../../components/jobs/JobCard";

export default function SavedJobs() {
  const { user } = useCurrentUser();

  /* ---------- HARD GUARD ---------- */
  if (!user || !user.id) {
    return (
      <DashboardLayout title="Saved Jobs">
        <div className="bg-white p-6 rounded shadow text-gray-600">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const saved = getSavedJobs(user.id) || [];

  const savedJobs = jobs.filter(
    (job) =>
      job &&
      job.id &&
      saved.some(
        (s) => s && s.jobId === job.id
      )
  );

  return (
    <DashboardLayout title="Saved Jobs">
      {savedJobs.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">
          No saved jobs yet. Browse jobs and save the ones you like.
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getSavedJobs } from "../../utils/jobBookmarks";
import JobCard from "../../components/jobs/JobCard";

export default function SavedJobs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const saved = getSavedJobs(currentUser.id);

  const savedJobs = jobs.filter((job) =>
    saved.some((s) => s.jobId === job.id)
  );

  return (
    <DashboardLayout title="Saved Jobs">
      {savedJobs.length === 0 ? (
        <p className="text-gray-600">No saved jobs yet</p>
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

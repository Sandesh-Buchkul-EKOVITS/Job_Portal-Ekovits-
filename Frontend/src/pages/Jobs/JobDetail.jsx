import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  isJobSaved,
  toggleSaveJob,
} from "../../utils/jobBookmarks";
import {
  hasApplied,
  applyToJob,
} from "../../utils/jobApplications";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const found = jobs.find(
      (j) => j.id === Number(id) && j.status === "approved"
    );

    if (!found) navigate("/jobs");
    else setJob(found);
  }, [id, navigate]);

  if (!job) return null;

  const isCandidate = currentUser?.role === "candidate";
  const saved = isCandidate
    ? isJobSaved(currentUser.id, job.id)
    : false;

  const applied = isCandidate
    ? hasApplied(currentUser.id, job.id)
    : false;

  const handleSave = () => {
    toggleSaveJob(currentUser.id, job.id);
    window.location.reload();
  };

  const handleApply = () => {
    const success = applyToJob(currentUser.id, job.id);

    if (!success) {
      alert("You have already applied to this job");
      return;
    }

    alert("Application submitted successfully");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <p className="text-gray-600">
              {job.company} • {job.location}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {job.jobType} • {job.workMode}
            </p>
          </div>

          {isCandidate && (
            <button
              onClick={handleSave}
              className="text-lg"
            >
              {saved ? "★ Saved" : "☆ Save Job"}
            </button>
          )}
        </div>

        {/* Apply Section */}
        {isCandidate && (
          <div className="border p-4 rounded bg-gray-50">
            {applied ? (
              <div className="text-green-600 font-medium">
                ✅ You have already applied for this job
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Apply Job
              </button>
            )}
          </div>
        )}

        {/* Job Description */}
        <div>
          <h3 className="font-semibold mb-2">Job Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
}

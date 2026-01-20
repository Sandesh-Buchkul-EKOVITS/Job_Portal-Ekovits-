import { useNavigate } from "react-router-dom";
import { isJobSaved, toggleSaveJob } from "../../utils/jobBookmarks";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const isCandidate = currentUser?.role === "candidate";
  const saved = isCandidate
    ? isJobSaved(currentUser.id, job.id)
    : false;

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSaveJob(currentUser.id, job.id);
    window.location.reload();
  };

  return (
    <div
      className="bg-white p-5 rounded shadow hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company}</p>
          <p className="text-xs text-gray-500 mt-1">
            {job.location} • {job.jobType}
          </p>
        </div>

        {isCandidate && (
          <button
            onClick={handleSave}
            className="text-xl"
            title={saved ? "Unsave Job" : "Save Job"}
          >
            {saved ? "★" : "☆"}
          </button>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {job.description}
      </p>
    </div>
  );
}

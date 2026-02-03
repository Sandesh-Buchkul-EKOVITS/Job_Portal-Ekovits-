import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../app/auth/useCurrentUser";
import { isJobSaved, toggleSaveJob } from "../../utils/jobBookmarks";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user?.id && job?.id) {
      setSaved(isJobSaved(user.id, job.id));
    }
  }, [user, job?.id]);

  const handleSave = (e) => {
    e.stopPropagation();
    toggleSaveJob(user.id, job.id);
    setSaved((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition cursor-pointer space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600">
            {job.companyName}
          </p>
        </div>

        {user && (
          <button
            onClick={handleSave}
            className={`text-sm ${
              saved ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        )}
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <Meta
          label="Experience"
          value={job.experience || "-"}
        />
        <Meta
          label="Salary"
          value={
            job.salaryFrom && job.salaryTo
              ? `${job.salaryFrom} - ${job.salaryTo}`
              : "-"
          }
        />
        <Meta
          label="Work Mode"
          value={job.workMode || "-"}
        />
        <Meta
          label="Location"
          value={job.location || "-"}
        />
      </div>

      {/* Short Description */}
      {job.shortDescription && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.shortDescription}
        </p>
      )}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        {label}
      </p>
      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}

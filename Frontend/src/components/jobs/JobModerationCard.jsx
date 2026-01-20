export default function JobModerationCard({ job, onAction }) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold">{job.title}</h4>
          <p className="text-sm text-gray-600">{job.company}</p>
          <p className="text-xs text-gray-500">
            {job.workMode} • {job.location}
          </p>
        </div>

        <span
          className={`text-xs px-2 py-1 rounded ${
            job.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : job.status === "approved"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="text-xs text-gray-600">
        Industry: {job.industry}
      </div>

      {job.status === "pending" && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onAction(job.id, "approved")}
            className="bg-green-600 text-white px-3 py-1 text-xs rounded"
          >
            Approve
          </button>
          <button
            onClick={() => onAction(job.id, "rejected")}
            className="bg-red-600 text-white px-3 py-1 text-xs rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

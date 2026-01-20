export default function ApplicantCard({ applicant, onAction }) {
  return (
    <div className="bg-white p-3 rounded shadow space-y-1">
      <h4 className="font-semibold">{applicant.name}</h4>
      <p className="text-sm text-gray-600">{applicant.role}</p>
      <p className="text-xs text-gray-500">{applicant.experience}</p>

      {applicant.status === "Applied" && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAction(applicant.id, "Shortlisted")}
            className="bg-green-600 text-white px-2 py-1 text-xs rounded"
          >
            Shortlist
          </button>
          <button
            onClick={() => onAction(applicant.id, "Rejected")}
            className="bg-red-600 text-white px-2 py-1 text-xs rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function CandidateProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const candidate = users.find(
    (u) => u.id === Number(id) && u.role === "candidate"
  );

  if (!candidate) {
    return (
      <DashboardLayout title="Candidate Profile">
        <p className="text-red-600">Candidate not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Candidate Profile">
      <div className="max-w-3xl bg-white p-6 rounded shadow space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          {candidate.photo && (
            <img
              src={candidate.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{candidate.name}</h2>
            <p className="text-sm text-gray-600">{candidate.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Contact Number" value={candidate.contact} />
          <Field label="Location" value={candidate.location || "N/A"} />
          <Field label="Current CTC" value={candidate.ctc || "N/A"} />
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold mb-2">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills?.length > 0 ? (
              candidate.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills added</p>
            )}
          </div>
        </div>

        {/* Resume */}
        {candidate.resume && (
          <div>
            <a
              href={candidate.resume}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm"
            >
              View Resume
            </a>
          </div>
        )}

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

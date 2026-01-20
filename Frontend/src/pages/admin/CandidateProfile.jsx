import { useParams } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";

export default function AdminCandidateProfile() {
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const candidate = users.find(
    (u) => String(u.id) === String(id)
  );

  if (!candidate || !candidate.profile) {
    return (
      <DashboardLayout title="Candidate Profile">
        <BackButton />
        <p className="text-gray-600">Profile not found.</p>
      </DashboardLayout>
    );
  }

  const {
    photo,
    location,
    phone,
    skills,
    experience,
    resume,
    completeness,
  } = candidate.profile;

  return (
    <DashboardLayout title="Candidate Profile (Read Only)">
      <BackButton />

      <div className="bg-white p-6 rounded shadow max-w-3xl">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Photo</span>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold">
              {candidate.name}
            </h2>
            <p className="text-sm text-gray-600">
              {candidate.email}
            </p>
            <p className="text-sm text-gray-600">
              📞 {phone || "N/A"}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="space-y-3">
          <Info label="Location" value={location} />
          <Info label="Experience" value={experience} />
          <Info label="Skills" value={skills?.join(", ")} />

          <Info
            label="Profile Completeness"
            value={`${completeness || 0}%`}
          />

          {resume && (
            <div>
              <p className="font-medium">Resume</p>
              <a
                href={resume}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-sm text-gray-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}

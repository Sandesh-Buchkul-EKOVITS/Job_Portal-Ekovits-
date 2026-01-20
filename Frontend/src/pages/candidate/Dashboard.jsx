import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { calculateProfileCompletion } from "../../utils/profileCompletion";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const profile = users.find(
    (u) => u.id === currentUser.id
  );

  const completion = calculateProfileCompletion(profile);

  return (
    <DashboardLayout title="Candidate Dashboard">
      {/* PROFILE COMPLETION */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">
            Profile Completion
          </h3>
          <span className="text-sm font-medium">
            {completion}%
          </span>
        </div>

        <div className="w-full bg-gray-200 h-3 rounded">
          <div
            className="bg-green-600 h-3 rounded"
            style={{ width: `${completion}%` }}
          />
        </div>

        <div className="mt-3 text-sm text-gray-600">
          Keep your profile updated to get better job recommendations
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <ActionCard
          title="Browse Jobs"
          description="Explore available opportunities"
          buttonLabel="View Jobs"
          onClick={() => navigate("/jobs")}
        />

        <ActionCard
          title="Saved Jobs"
          description="Jobs you bookmarked"
          buttonLabel="View Saved"
          onClick={() =>
            navigate("/candidate/saved-jobs")
          }
        />

        <ActionCard
          title="My Applications"
          description="Track your application status"
          buttonLabel="View Applications"
          onClick={() =>
            navigate("/candidate/applications")
          }
        />

        {/* ✅ VIEW / EDIT PROFILE */}
        <ActionCard
          title="My Profile"
          description="View or update your profile details"
          buttonLabel="View / Edit Profile"
          onClick={() =>
            navigate("/candidate/profile")
          }
        />
      </div>
    </DashboardLayout>
  );
}

function ActionCard({
  title,
  description,
  buttonLabel,
  onClick,
}) {
  return (
    <div className="bg-white p-5 rounded shadow flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
      </div>

      <button
        onClick={onClick}
        className="bg-blue-600 text-white py-2 rounded w-full"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

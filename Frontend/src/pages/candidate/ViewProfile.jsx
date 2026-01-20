import DashboardLayout from "../../app/layouts/DashboardLayout";
import { calculateProfileCompletion } from "../../utils/profileCompletion";

export default function ViewProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const profile = users.find((u) => u.id === currentUser.id);

  if (!profile) return null;

  const completion = calculateProfileCompletion(profile);

  return (
    <DashboardLayout title="My Profile">
      {/* Completeness */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Profile Completion</span>
          <span className="text-sm">{completion}%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-green-600 h-2 rounded"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Profile */}
      <div className="max-w-3xl bg-white p-6 rounded shadow space-y-6">
        <div className="flex items-center gap-4">
          {profile.photo && (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Contact Number" value={profile.contact} />
          <Field label="Location" value={profile.location} />
          <Field label="Current CTC" value={profile.ctc || "N/A"} />
          <Field label="Resume" value={profile.resume || "Not uploaded"} />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.length > 0 ? (
              profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills added</p>
            )}
          </div>
        </div>
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

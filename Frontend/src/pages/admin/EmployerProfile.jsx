import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import {
  getEmployerProfile,
} from "../../app/services/employerProfileService";

export default function AdminEmployerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Company Profile">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];
  const employer = users.find(
    (u) => String(u.id) === String(id)
  );

  const profile = getEmployerProfile(id);

  if (!employer) {
    return (
      <DashboardLayout title="Company Profile">
        <div className="bg-white p-6 rounded shadow">
          Employer not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Company Profile">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 border rounded bg-gray-100 flex items-center justify-center overflow-hidden">
            {profile?.logo ? (
              <img
                src={profile.logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400">
                No Logo
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {profile?.companyName || "Company Name"}
            </h2>
            <p className="text-sm text-gray-600">
              {employer.email}
            </p>

            <div className="flex gap-3 mt-2">
              <span
                className={`text-xs px-3 py-1 rounded ${
                  profile?.verified
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {profile?.verified
                  ? "Verified"
                  : "Not Verified"}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded ${
                  employer.blocked
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {employer.blocked
                  ? "Blocked"
                  : "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <Section title="Company Details">
          <Field label="Phone" value={profile?.phone} />
          <Field label="Website" value={profile?.website} />
          <Field label="Location" value={profile?.location} />
        </Section>

        <Section title="About Company">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {profile?.description || "Not provided"}
          </p>
        </Section>

        <button
          onClick={() => navigate(-1)}
          className="border px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </DashboardLayout>
  );
}

/* ---------- SHARED ---------- */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p>{value || "-"}</p>
    </div>
  );
}

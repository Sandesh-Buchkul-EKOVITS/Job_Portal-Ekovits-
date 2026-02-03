import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCandidateProfile } from "../../app/services/profileService";

export default function AdminCandidates() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Candidates">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const candidates = users.filter(
    (u) => u.role === "candidate"
  );

  const [query, setQuery] = useState("");

  const filteredCandidates = candidates.filter((c) => {
    const profile = getCandidateProfile(c.id);
    const q = query.toLowerCase();

    return (
      c.name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      profile?.phone?.includes(q) ||
      profile?.skills?.some((s) =>
        s.toLowerCase().includes(q)
      )
    );
  });

  return (
    <DashboardLayout title="Candidates">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* SEARCH */}
        <input
          placeholder="Search by name, email, phone or skill"
          className="border p-3 rounded w-full"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        {filteredCandidates.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No candidates found.
          </div>
        ) : (
          filteredCandidates.map((c) => {
            const profile = getCandidateProfile(c.id);

            return (
              <div
                key={c.id}
                className="bg-white p-5 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {profile?.name || c.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {profile?.email || c.email}
                  </p>

                  {profile?.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.skills.slice(0, 5).map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() =>
                    navigate(`/admin/candidate/${c.id}`)
                  }
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Profile
                </button>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}

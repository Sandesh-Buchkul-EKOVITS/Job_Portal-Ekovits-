import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useParams, useNavigate } from "react-router-dom";
import { getCandidateProfile } from "../../app/services/profileService";

export default function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  /* ---------- HARD GUARD ---------- */
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Candidate Profile">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  /* ---------- FIXED ID MATCH ---------- */
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const baseUser = users.find(
    (u) => String(u.id) === String(id)
  );

  const savedProfile =
    getCandidateProfile(id) || {};

  if (!baseUser) {
    return (
      <DashboardLayout title="Candidate Profile">
        <div className="bg-white p-6 rounded shadow">
          Candidate not found.
        </div>
      </DashboardLayout>
    );
  }

  /* ---------- MERGED VIEW MODEL ---------- */
  const profile = {
    id,
    name: savedProfile.name || baseUser.name || "N/A",
    email: savedProfile.email || baseUser.email || "N/A",
    phone: savedProfile.phone || baseUser.phone || "N/A",
    location: savedProfile.location || "",
    currentCTC: savedProfile.currentCTC || "",
    summary: savedProfile.summary || "",
    skills: savedProfile.skills || [],
    experience: savedProfile.experience || [],
    education: savedProfile.education || [],
    resume: savedProfile.resume || null,
    photo: savedProfile.photo || "",
    profileCompleted:
      savedProfile.profileCompleted ?? false,
  };

  return (
    <DashboardLayout title="Candidate Profile">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-6">

        {/* BASIC INFO */}
        <div className="flex items-center gap-4">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Photo
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-600">
              {profile.email}
            </p>
            <p className="text-sm text-gray-600">
              {profile.phone}
            </p>
          </div>
        </div>

        {/* SUMMARY */}
        <Section title="Professional Summary">
          <p className="whitespace-pre-wrap text-sm text-gray-700">
            {profile.summary || "Not provided"}
          </p>
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No skills added
            </p>
          )}
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work Experience">
          {profile.experience.length > 0 ? (
            profile.experience.map((e, i) => (
              <div
                key={i}
                className="border-b pb-3 mb-3"
              >
                <p className="font-medium">
                  {e.role} – {e.company}
                </p>
                <p className="text-xs text-gray-500">
                  {e.start} –{" "}
                  {e.current ? "Present" : e.end}
                </p>
                <p className="text-sm text-gray-700">
                  {e.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No experience added
            </p>
          )}
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {profile.education.length > 0 ? (
            profile.education.map((e, i) => (
              <div key={i}>
                <p className="font-medium">{e.degree}</p>
                <p className="text-xs text-gray-500">
                  {e.institute} • {e.year}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No education added
            </p>
          )}
        </Section>

        {/* RESUME */}
        <Section title="Resume">
          {profile.resume ? (
            <a
              href={profile.resume.data}
              download={profile.resume.name}
              className="text-blue-600 underline text-sm"
            >
              Download Resume
            </a>
          ) : (
            <p className="text-sm text-gray-500">
              Resume not uploaded
            </p>
          )}
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

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

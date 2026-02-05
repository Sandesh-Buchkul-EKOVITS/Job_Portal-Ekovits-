import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getCandidateProfile } from "../../app/services/profileService";

export default function EmployerCandidateProfileView() {
  const { id } = useParams(); // candidate userId
  const navigate = useNavigate();

  const profile = getCandidateProfile(id);

  if (!profile) {
    return (
      <DashboardLayout title="Candidate Profile">
        <div className="bg-white p-6 rounded shadow text-gray-600">
          Candidate profile not found.
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 underline"
          >
            ← Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Candidate Profile">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded shadow flex gap-6 items-center">
          <div className="w-32 h-32 rounded-full border overflow-hidden bg-gray-100 flex items-center justify-center">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">No Photo</span>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.location}</p>
          </div>
        </div>

        {/* SUMMARY */}
        <Section title="Professional Summary">
          <p className="whitespace-pre-wrap">
            {profile.summary || "No summary provided"}
          </p>
        </Section>

        {/* EXPERIENCE */}
        <Section title="Work Experience">
          {profile.experience.length > 0 ? (
            profile.experience.map((e, i) => (
              <div key={i} className="border p-3 rounded mb-2">
                <p className="font-medium">
                  {e.role} – {e.company}
                </p>
                <p className="text-xs text-gray-500">
                  {e.start} – {e.current ? "Present" : e.end}
                </p>
                <p className="text-sm">{e.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No experience added</p>
          )}
        </Section>

        {/* EDUCATION */}
        <Section title="Education">
          {profile.education.length > 0 ? (
            profile.education.map((e, i) => (
              <div key={i} className="border p-3 rounded mb-2">
                <p className="font-medium">{e.degree}</p>
                <p className="text-xs text-gray-500">
                  {e.institute} • {e.year}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No education added</p>
          )}
        </Section>

        {/* SKILLS */}
        <Section title="Skills">
          {profile.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills added</p>
          )}
        </Section>

        {/* RESUME */}
        <Section title="Resume">
          {profile.resume ? (
            <a
              href={profile.resume.data}
              download={profile.resume.name}
              className="text-blue-600 underline"
            >
              {profile.resume.name}
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No resume uploaded</p>
          )}
        </Section>

        {/* BACK BUTTON – BOTTOM */}
        <div className="pt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7A004B] to-[#CC0047]
             text-white px-4 py-2 rounded-lg text-sm font-medium
             hover:opacity-90 transition shadow"
          >
            ← Back to Applicants
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded border">
      <h2 className="font-semibold mb-3">{title}</h2>
      {children}
    </div>
  );
}

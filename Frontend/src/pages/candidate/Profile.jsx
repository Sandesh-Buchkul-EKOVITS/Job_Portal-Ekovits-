import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import {
  getCandidateProfile,
  saveCandidateProfile,
} from "../../app/services/profileService";

/* =====================================================
   CANDIDATE PROFILE – STABLE + SKILLS
===================================================== */

export default function CandidateProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || !currentUser.id) {
    return (
      <DashboardLayout title="My Profile">
        <div className="p-6 text-gray-600">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const userId = currentUser.id;

  const emptyProfile = {
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    location: "",
    currentCTC: "",
    summary: "",
    education: [],
    experience: [],
    skills: [],
    resume: null,
    photo: "",
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [draft, setDraft] = useState(emptyProfile);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = getCandidateProfile(userId);
    if (saved) {
      setProfile(saved);
      setDraft(saved);
    }
  }, [userId]);

  const saveProfile = () => {
    setProfile(draft);
    saveCandidateProfile(userId, draft);
    setEditMode(false);
  };

  const completion = calculateProfileCompletion(
    editMode ? draft : profile
  );

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* PROFILE COMPLETION */}
        <div className="bg-green-50 border border-green-200 p-4 rounded flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-green-600 flex items-center justify-center font-bold text-green-700">
            {completion}%
          </div>
          <div>
            <p className="font-semibold">
              Your profile is getting stronger
            </p>
            <p className="text-sm text-gray-600">
              Complete all sections to reach 100%
            </p>
          </div>
        </div>

        {/* BASIC INFO */}
        <Section>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-green-600 overflow-hidden bg-gray-100 flex items-center justify-center">
                {draft.photo ? (
                  <img
                    src={draft.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    Add Photo
                  </span>
                )}
              </div>

              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () =>
                      setDraft({
                        ...draft,
                        photo: reader.result,
                      });
                    reader.readAsDataURL(file);
                  }}
                />
              )}
            </div>

            <div className="flex-1 w-full">
              <h1 className="text-2xl font-semibold">
                {profile.name}
              </h1>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Field label="Email" value={draft.email} readOnly />
                <Field
                  label="Mobile"
                  value={draft.phone}
                  editMode={editMode}
                  onChange={(v) =>
                    setDraft({ ...draft, phone: v })
                  }
                />
                <Field
                  label="Location"
                  value={draft.location}
                  editMode={editMode}
                  onChange={(v) =>
                    setDraft({ ...draft, location: v })
                  }
                />
                <Field
                  label="Current CTC"
                  value={draft.currentCTC}
                  editMode={editMode}
                  onChange={(v) =>
                    setDraft({ ...draft, currentCTC: v })
                  }
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ACTION BUTTONS */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="border px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={saveProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setDraft(profile);
                setEditMode(false);
              }}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        )}

        {/* SUMMARY */}
        <Section title="Professional Summary">
          {!editMode ? (
            <p className="whitespace-pre-wrap">
              {profile.summary ||
                "Add your professional summary"}
            </p>
          ) : (
            <textarea
              className="w-full border p-3 rounded"
              rows={4}
              value={draft.summary}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  summary: e.target.value,
                })
              }
            />
          )}
        </Section>

        <WorkExperienceSection
          editMode={editMode}
          experience={draft.experience}
          onChange={(experience) =>
            setDraft({ ...draft, experience })
          }
        />

        <EducationSection
          editMode={editMode}
          education={draft.education}
          onChange={(education) =>
            setDraft({ ...draft, education })
          }
        />

        {/* SKILLS */}
        <SkillsSection
          skills={draft.skills}
          editMode={editMode}
          onChange={(skills) =>
            setDraft({ ...draft, skills })
          }
        />

        {/* RESUME */}
        <Section title="Resume / CV">
          {!editMode ? (
            profile.resume ? (
              <a
                href={profile.resume.data}
                download={profile.resume.name}
                className="text-blue-600 underline"
              >
                {profile.resume.name}
              </a>
            ) : (
              <p className="text-gray-500">
                No resume uploaded
              </p>
            )
          ) : (
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () =>
                  setDraft({
                    ...draft,
                    resume: {
                      name: file.name,
                      data: reader.result,
                    },
                  });
                reader.readAsDataURL(file);
              }}
            />
          )}
        </Section>
      </div>
    </DashboardLayout>
  );
}

/* =====================================================
   WORK EXPERIENCE
===================================================== */

function WorkExperienceSection({ experience, onChange, editMode }) {
  const empty = {
    role: "",
    company: "",
    start: "",
    end: "",
    current: false,
    description: "",
  };
  const [form, setForm] = useState(empty);

  const add = () => {
    if (!form.role || !form.company || !form.start) return;
    onChange([...experience, form]);
    setForm(empty);
  };

  const remove = (i) =>
    onChange(experience.filter((_, x) => x !== i));

  return (
    <Section title="Work Experience">
      {experience.map((e, i) => (
        <div
          key={i}
          className="border p-3 rounded mb-2 flex justify-between"
        >
          <div>
            <p className="font-medium">
              {e.role} – {e.company}
            </p>
            <p className="text-xs text-gray-500">
              {e.start} – {e.current ? "Present" : e.end}
            </p>
            <p className="text-sm">{e.description}</p>
          </div>
          {editMode && (
            <button
              className="text-red-600 text-sm"
              onClick={() => remove(i)}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {editMode && (
        <div className="border p-4 rounded mt-4 space-y-3">
          <Input
            label="Role"
            value={form.role}
            onChange={(v) =>
              setForm({ ...form, role: v })
            }
          />
          <Input
            label="Company"
            value={form.company}
            onChange={(v) =>
              setForm({ ...form, company: v })
            }
          />

          <div className="flex gap-2">
            <input
              type="date"
              className="border p-2 rounded w-full"
              value={form.start}
              onChange={(e) =>
                setForm({
                  ...form,
                  start: e.target.value,
                })
              }
            />
            {!form.current && (
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={form.end}
                onChange={(e) =>
                  setForm({
                    ...form,
                    end: e.target.value,
                  })
                }
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.current}
              onChange={(e) =>
                setForm({
                  ...form,
                  current: e.target.checked,
                  end: "",
                })
              }
            />
            Currently working here
          </label>

          <textarea
            className="border p-2 rounded w-full"
            rows={3}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <button
            onClick={add}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Experience
          </button>
        </div>
      )}
    </Section>
  );
}

/* =====================================================
   EDUCATION
===================================================== */

function EducationSection({ education, onChange, editMode }) {
  const empty = { degree: "", institute: "", year: "" };
  const [form, setForm] = useState(empty);

  const add = () => {
    if (!form.degree || !form.institute || !form.year) return;
    onChange([...education, form]);
    setForm(empty);
  };

  const remove = (i) =>
    onChange(education.filter((_, x) => x !== i));

  return (
    <Section title="Education">
      {education.map((e, i) => (
        <div
          key={i}
          className="border p-3 rounded mb-2 flex justify-between"
        >
          <div>
            <p className="font-medium">{e.degree}</p>
            <p className="text-xs text-gray-500">
              {e.institute} • {e.year}
            </p>
          </div>
          {editMode && (
            <button
              className="text-red-600 text-sm"
              onClick={() => remove(i)}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {editMode && (
        <div className="border p-4 rounded mt-4 space-y-3">
          <Input
            label="Degree"
            value={form.degree}
            onChange={(v) =>
              setForm({ ...form, degree: v })
            }
          />
          <Input
            label="Institute"
            value={form.institute}
            onChange={(v) =>
              setForm({ ...form, institute: v })
            }
          />
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={form.year}
            onChange={(e) =>
              setForm({
                ...form,
                year: e.target.value,
              })
            }
          />
          <button
            onClick={add}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Education
          </button>
        </div>
      )}
    </Section>
  );
}

/* =====================================================
   SKILLS
===================================================== */

function SkillsSection({ skills, onChange, editMode }) {
  const [input, setInput] = useState("");

  const addSkill = () => {
    const value = input.trim();
    if (!value || skills.includes(value)) return;
    onChange([...skills, value]);
    setInput("");
  };

  const removeSkill = (skill) =>
    onChange(skills.filter((s) => s !== skill));

  return (
    <Section title="Skills">
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              {editMode && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-600 text-xs"
                >
                  ✕
                </button>
              )}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No skills added
        </p>
      )}

      {editMode && (
        <div className="flex gap-2">
          <input
            className="border p-2 rounded flex-1"
            placeholder="Add a skill"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && addSkill()
            }
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      )}
    </Section>
  );
}

/* =====================================================
   SHARED
===================================================== */

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded border">
      {title && (
        <h2 className="font-semibold mb-3">{title}</h2>
      )}
      {children}
    </div>
  );
}

function Field({ label, value, editMode, onChange, readOnly }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      {readOnly ? (
        <p>{value}</p>
      ) : !editMode ? (
        <p>{value || "-"}</p>
      ) : (
        <input
          className="border p-2 rounded w-full"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
        />
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <input
        className="border p-2 rounded w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function calculateProfileCompletion(p) {
  let score = 0;
  if (p.photo) score += 10;
  if (p.summary) score += 10;
  if (p.phone && p.location && p.currentCTC) score += 20;
  if (p.experience.length) score += 25;
  if (p.education.length) score += 20;
   if (p.education.length) score += 5;
  if (p.resume) score += 15;
  return Math.min(score, 100);
}

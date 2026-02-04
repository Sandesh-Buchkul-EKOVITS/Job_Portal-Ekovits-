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
    contact: currentUser.contact || "",
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
       setProfile({ ...emptyProfile, ...saved });
    setDraft({ ...emptyProfile, ...saved });
    }
    }
  , [userId]);

  const saveProfile = () => {
    setProfile(draft);
    saveCandidateProfile(userId, draft);
    setEditMode(false);
  };

  const completion = calculateProfileCompletion(editMode ? draft : profile);

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* PROFILE COMPLETION */}
        <div className="bg-blue-50 border border-[#2A4D69] p-4 rounded-lg flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-full border-4 border-[#1E3A5F] -600 flex items-center justify-center font-bold text-green-700">
            {completion}%
          </div>
          <div>
            <p className="font-semibold">Your profile is getting stronger</p>
            <p className="text-sm text-gray-600">
              Complete all sections to reach 100%
            </p>
          </div>
        </div>

        {/* BASIC INFO */}
        <Section>
  <div className="flex flex-col md:flex-row gap-6 items-center">
    
    {/* PHOTO */}
    <div className="relative">
      <div className="w-32 h-32 rounded-full border-4 border-[#1E3A5F] overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
        {draft.photo ? (
          <img
            src={draft.photo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-400">Add Photo</span>
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

    {/* BASIC FIELDS */}
    <div className="flex-1 w-full">
      <h1 className="text-2xl font-semibold">{profile.name}</h1>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Field label="Email" value={draft.email} readOnly />

        <Field
          label="Mobile"
          value={draft.contact}
          editMode={editMode}
          onChange={(v) => setDraft({ ...draft, contact: v })}
        />

        <Field
          label="Location"
          value={draft.location}
          editMode={editMode}
          onChange={(v) => setDraft({ ...draft, location: v })}
        />

        <Field
          label="Current CTC"
          value={draft.currentCTC}
          editMode={editMode}
          onChange={(v) => setDraft({ ...draft, currentCTC: v })}
        />
      </div>
    </div>
  </div>
</Section>


        {/* ACTION BUTTONS */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white font-semibold px-4 py-2 rounded-md shadow-md"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={saveProfile}
              className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white font-semibold px-3 py-1 rounded-md shadow-md"

            >
              Save
            </button>

            <button
              onClick={() => {
                setDraft(profile);
                setEditMode(false);
              }}
            className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white font-semibold px-3 py-1 rounded-md shadow-md ">

              Cancel
            </button>
          </div>
        )}

        {/* SUMMARY */}
        <ProfessionalSummarySection
          summary={draft.summary}
          editMode={editMode}
          onChange={(summary) =>
          setDraft({ ...draft, summary })
          }
        />

        <WorkExperienceSection
          editMode={editMode}
          experience={draft.experience}
          onChange={(experience) => setDraft({ ...draft, experience })}
        />

        <EducationSection
          editMode={editMode}
          education={draft.education}
          onChange={(education) => setDraft({ ...draft, education })}
        />

        <SkillsSection
          skills={draft.skills}
          editMode={editMode}
          onChange={(skills) => setDraft({ ...draft, skills })}
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
              <p className="text-gray-500">No resume uploaded</p>
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
        {/* 🔥 SAVE BUTTON BELOW RESUME */}
         {editMode && (
          <div className="flex justify-start mt-6">
          <button
            onClick={saveProfile}
            className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white font-semibold px-3 py-1.5 rounded-md shadow-md"
    >
      Save All Changes
    </button>
  </div>
)}

      </div>
    </DashboardLayout>
  );
}
      
     /* =====================================================
                PROFESSIONAL SUMMARY 
     ===================================================== */

     function ProfessionalSummarySection({ summary, onChange, editMode }) {
     const [text, setText] = useState(summary || "");
     const [showForm, setShowForm] = useState(false);

      useEffect(() => {
      setText(summary || "");
       }, [summary]);

       const save = () => {
       if (!text.trim()) return;
       onChange(text);
       setShowForm(false);
       };

      const remove = () => {
      onChange("");
      setText("");
      setShowForm(false);
      };

  return (
    <Section title="Professional Summary">
      {!showForm && summary && (
        <div className="space-y-3">
          <p className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {summary}
          </p>

          {editMode && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                 className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] border border-[#155385] text-white font-semibold text-sm px-2 py-1 rounded-md"
              >
                Update
              </button>

              <button
                onClick={remove}
                className="bg-[#FEEAEA] border border-[#E53935] text-[#E53935] font-semibold text-sm px-2 py-1 rounded-md hover:bg-[#FBCBCB] hover:border-[#B71C1C] transition duration-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}

      {!showForm && !summary && editMode && (
        <button
          onClick={() => setShowForm(true)}
            className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
        >
          Add Summary
        </button>
      )}

      {!summary && !editMode && (
        <p className="text-gray-500">No professional summary added</p>
      )}

      {showForm && editMode && (
        <div className="space-y-3">
          <textarea
           rows={4}
           className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
           value={text}
          onChange={(e) => setText(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={save}
               className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
            >
              {summary ? "Update" : "Add Summary"}
            </button>

            <button
              onClick={() => {
                setText(summary || "");
                setShowForm(false);
              }}
              className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm ">
              Cancel
            </button>
          </div>
        </div>
      )}
    </Section>
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
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false); // 🔥 NEW: toggle form visibility

  // ✅ ADD OR UPDATE
  const addOrUpdate = () => {
    if (!form.role || !form.company || !form.start) return;

    if (editIndex !== null) {
      const updated = experience.map((exp, index) =>
        index === editIndex ? form : exp
      );
      onChange(updated);
      setEditIndex(null);
    } else {
      onChange([...experience, form]);
    }

    setForm(empty);
    setShowForm(false); // hide form after add/update
  };

  // ✅ DELETE
  const remove = (i) => onChange(experience.filter((_, x) => x !== i));

  // ✅ START UPDATE
  const handleUpdate = (i) => {
    setForm(experience[i]);
    setEditIndex(i);
    setShowForm(true); // show form when updating
  };

  return (
    <Section title="Work Experience">
      {experience.map((e, i) => (
        <div
          key={i}
          className="border p-3 rounded mb-2 flex justify-between items-center"
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
            <div className="flex gap-3">
              <button
                className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] border border-[#155385] text-white font-semibold text-sm px-1 py-1 rounded-md"
                Update
                onClick={() => handleUpdate(i)}
              >
                Update
              </button>

              <button
                className="bg-[#FEEAEA] border border-[#E53935] text-[#E53935] font-semibold text-sm px-1 py-1 rounded-md hover:bg-[#FBCBCB] hover:border-[#B71C1C] transition duration-200"
                onClick={() => remove(i)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {editMode && (
        <>
          {/* 🔥 ADD EXPERIENCE BUTTON */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
             className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm "
            >
              Add Experience
            </button>
          )}

          {/* 🔥 EXPERIENCE FORM */}
          {showForm && (
            <div className="border p-4 rounded mt-4 space-y-3">
              <Input
                label="Role"
                value={form.role}
                onChange={(v) => setForm({ ...form, role: v })}
              />
              <Input
                label="Company"
                value={form.company}
                onChange={(v) => setForm({ ...form, company: v })}
              />

              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
                  value={form.start}
                  onChange={(e) =>
                    setForm({ ...form, start: e.target.value })
                  }
                />
                {!form.current && (
                  <input
                    type="date"
                    className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
                    value={form.end}
                    onChange={(e) =>
                      setForm({ ...form, end: e.target.value })
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
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <button
                onClick={addOrUpdate}
                className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
              >
                {editIndex !== null ? "Update Experience" : "Add Experience"}
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

/* =====================================================
   EDUCATION
===================================================== */
function EducationSection({ education, onChange, editMode }) {
  const empty = {
    degree: "",
    institute: "",
    year: "",
  };

  const [form, setForm] = useState(empty);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false); // NEW: toggle form visibility

  // ADD OR UPDATE
  const addOrUpdate = () => {
    if (!form.degree || !form.institute || !form.year) return;

    if (editIndex !== null) {
      const updated = education.map((item, i) =>
        i === editIndex ? form : item
      );
      onChange(updated);
      setEditIndex(null);
    } else {
      onChange([...education, form]);
    }

    setForm(empty);
    setShowForm(false); // hide form after adding/updating
  };

  const remove = (i) => onChange(education.filter((_, x) => x !== i));

  const edit = (i) => {
    setForm(education[i]);
    setEditIndex(i);
    setShowForm(true); // open form when editing
  };

  return (
    <Section title="Education">
      {education.map((e, i) => (
        <div
          key={i}
          className="border p-3 rounded mb-2 flex justify-between items-center"
        >
          <div>
          <p className="font-medium">{e.degree}</p>
          <p className="text-sm text-gray-500">{e.institute}</p>
          <p className="text-xs text-gray-400">{e.year}</p>
          </div>

          {editMode && (
            <div className="flex gap-3">
              <button
                  className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] border border-[#155385] 
             text-white font-semibold text-sm px-2 py-1 rounded-md"
                onClick={() => edit(i)}
              >
                Update
              </button>

              <button
                className="bg-[#FEEAEA] border border-[#E53935] text-[#E53935] font-semibold text-sm px-2 py-1 rounded-md hover:bg-[#FBCBCB] hover:border-[#B71C1C] transition duration-200"
                onClick={() => remove(i)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      {editMode && (
        <>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
             className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
            >
              Add Education
            </button>
          )}

          {showForm && (
            <div className="border p-4 rounded mt-4 space-y-3">
              <Input
                label="Degree"
                value={form.degree}
                onChange={(v) => setForm({ ...form, degree: v })}
              />

              <Input
                label="Institute"
                value={form.institute}
                onChange={(v) => setForm({ ...form, institute: v })}
              />
              <input
                type="date"
                className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value })
                }
              />

              <button
                onClick={addOrUpdate}
                className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
              >
                {editIndex !== null ? "Update Education" : "Add Education"}
              </button>
            </div>
          )}
        </>
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
        <p className="text-sm text-gray-500">No skills added</p>
      )}

      {editMode && (
        <div className="flex gap-2">
          <input
           className="w-full p-3 rounded-md bg-gray-100 text-gray-800 
             placeholder-gray-500 resize-none
             outline-none focus:outline-none 
             focus:bg-white focus:ring-1 focus:ring-blue-600"
            placeholder="Add a skill"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />

          <button
            onClick={addSkill}
            className="bg-[linear-gradient(90deg,#ff0066,#8000ff)] text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm"
          >
            Add
          </button>
         
        </div>
      )}
    </Section>
  );
}

/* =====================================================
   SHARED COMPONENTS
===================================================== */

function Section({ title, children }) {
  return (
    <div className="bg-white p-6 rounded border">
      {title && <h2 className="font-semibold mb-3">{title}</h2>}
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
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
function Input({ label, value, onChange, className = "" }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 rounded-md 
          bg-gray-100 text-gray-800
          focus:bg-white focus:ring-1 focus:ring-blue-600
          outline-none ${className}`}
      />
    </div>
  );
}


function calculateProfileCompletion(p) {
  let score = 0;

  if (p.photo) score += 10;
  if (p.summary) score += 10;
  if (p.contact && p.location && p.currentCTC) score += 20;
  if (p.experience.length) score += 25;
  if (p.education.length) score += 20;
  if (p.skills.length) score += 5;
  if (p.resume) score += 10;

  return Math.min(score, 100);
}

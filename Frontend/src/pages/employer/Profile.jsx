// import { useEffect, useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import {
//   getEmployerProfile,
//   saveEmployerProfile,
// } from "../../app/services/employerProfileService";

// export default function EmployerProfile() {
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   /* ---------- HARD GUARD ---------- */
//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="Company Profile">
//         <div className="bg-white p-6 rounded shadow">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const employerId = currentUser.id;

//   const emptyProfile = {
//     companyName: "",
//     email: currentUser.email || "",
//     phone: "",
//     website: "",
//     location: "",
//     description: "",
//     logo: "",
//     verified: false,
//   };

//   const [profile, setProfile] =
//     useState(emptyProfile);
//   const [draft, setDraft] =
//     useState(emptyProfile);
//   const [editMode, setEditMode] =
//     useState(false);

//   useEffect(() => {
//     const saved =
//       getEmployerProfile(employerId);
//     if (saved) {
//       setProfile(saved);
//       setDraft(saved);
//     } else {
//       setProfile(emptyProfile);
//       setDraft(emptyProfile);
//     }
//   }, [employerId]);

//   const saveProfile = () => {
//     setProfile(draft);
//     saveEmployerProfile(employerId, draft);
//     setEditMode(false);
//   };

//   return (
//     <DashboardLayout title="Company Profile">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* HEADER */}
//         <div className="flex items-center gap-6">
//           <div className="relative">
//             <div className="w-28 h-28 rounded border bg-gray-100 flex items-center justify-center overflow-hidden">
//               {draft.logo ? (
//                 <img
//                   src={draft.logo}
//                   alt="Logo"
//                   className="w-full h-full object-contain"
//                 />
//               ) : (
//                 <span className="text-xs text-gray-400">
//                   Logo
//                 </span>
//               )}
//             </div>

//             {editMode && (
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 onChange={(e) => {
//                   const file =
//                     e.target.files[0];
//                   if (!file) return;
//                   const reader =
//                     new FileReader();
//                   reader.onload = () =>
//                     setDraft({
//                       ...draft,
//                       logo: reader.result,
//                     });
//                   reader.readAsDataURL(file);
//                 }}
//               />
//             )}
//           </div>

//           <div>
//             <h1 className="text-2xl font-semibold">
//               {profile.companyName ||
//                 "Company Name"}
//             </h1>
//             <p className="text-sm text-gray-600">
//               {profile.email}
//             </p>

//             <span
//               className={`inline-block mt-2 text-xs px-3 py-1 rounded ${
//                 profile.verified
//                   ? "bg-green-100 text-green-700"
//                   : "bg-yellow-100 text-yellow-700"
//               }`}
//             >
//               {profile.verified
//                 ? "Verified Company"
//                 : "Verification Pending"}
//             </span>
//           </div>
//         </div>

//         {/* ACTIONS */}
//         {!editMode ? (
//           <button
//             onClick={() => setEditMode(true)}
//             className="border px-4 py-2 rounded"
//           >
//             Edit Profile
//           </button>
//         ) : (
//           <div className="flex gap-3">
//             <button
//               onClick={saveProfile}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => {
//                 setDraft(profile);
//                 setEditMode(false);
//               }}
//               className="border px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {/* DETAILS */}
//         <Section title="Company Details">
//           <Field
//             label="Company Name"
//             value={draft.companyName}
//             editMode={editMode}
//             onChange={(v) =>
//               setDraft({
//                 ...draft,
//                 companyName: v,
//               })
//             }
//           />

//           <Field
//             label="Phone"
//             value={draft.phone}
//             editMode={editMode}
//             onChange={(v) =>
//               setDraft({
//                 ...draft,
//                 phone: v,
//               })
//             }
//           />

//           <Field
//             label="Website"
//             value={draft.website}
//             editMode={editMode}
//             onChange={(v) =>
//               setDraft({
//                 ...draft,
//                 website: v,
//               })
//             }
//           />

//           <Field
//             label="Location"
//             value={draft.location}
//             editMode={editMode}
//             onChange={(v) =>
//               setDraft({
//                 ...draft,
//                 location: v,
//               })
//             }
//           />
//         </Section>

//         <Section title="About Company">
//           {!editMode ? (
//             <p className="text-sm text-gray-700 whitespace-pre-wrap">
//               {profile.description ||
//                 "No description added"}
//             </p>
//           ) : (
//             <textarea
//               rows={4}
//               className="border p-3 rounded w-full"
//               value={draft.description}
//               onChange={(e) =>
//                 setDraft({
//                   ...draft,
//                   description:
//                     e.target.value,
//                 })
//               }
//             />
//           )}
//         </Section>
//       </div>
//     </DashboardLayout>
//   );
// }

// /* ---------- SHARED ---------- */

// function Section({ title, children }) {
//   return (
//     <div className="bg-white p-6 rounded border space-y-4">
//       <h2 className="font-semibold">
//         {title}
//       </h2>
//       {children}
//     </div>
//   );
// }

// function Field({
//   label,
//   value,
//   editMode,
//   onChange,
// }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500">
//         {label}
//       </p>
//       {!editMode ? (
//         <p>{value || "-"}</p>
//       ) : (
//         <input
//           className="border p-2 rounded w-full"
//           value={value}
//           onChange={(e) =>
//             onChange(e.target.value)
//           }
//         />
//       )}
//     </div>
//   );
// }






import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import {
  getEmployerProfile,
  saveEmployerProfile,
} from "../../app/services/employerProfileService";

export default function EmployerProfile() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  /* ---------- HARD GUARD ---------- */
  if (!currentUser || currentUser.role !== "employer") {
    return (
      <DashboardLayout title="Company Profile">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-lg font-semibold text-gray-800">
            Session expired
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Please login again to continue.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const employerId = currentUser.id;

  const emptyProfile = {
    companyName: "",
    email: currentUser.email || "",
    phone: "",
    website: "",
    location: "",
    description: "",
    logo: "",
    verified: false,

    // extra realistic fields
    industry: "",
    companySize: "",
    foundedYear: "",
    linkedin: "",
    twitter: "",
    gstNumber: "",
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [draft, setDraft] = useState(emptyProfile);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const saved = getEmployerProfile(employerId);
    if (saved) {
      setProfile({ ...emptyProfile, ...saved });
      setDraft({ ...emptyProfile, ...saved });
    } else {
      setProfile(emptyProfile);
      setDraft(emptyProfile);
    }
    // eslint-disable-next-line
  }, [employerId]);

  const saveProfile = () => {
    setProfile(draft);
    saveEmployerProfile(employerId, draft);
    setEditMode(false);
  };

  const cancelEdit = () => {
    setDraft(profile);
    setEditMode(false);
  };

  const removeLogo = () => {
    setDraft({ ...draft, logo: "" });
  };

  // Profile Completion (simple scoring)
  const completion = useMemo(() => {
    const fields = [
      draft.companyName,
      draft.phone,
      draft.website,
      draft.location,
      draft.description,
      draft.industry,
      draft.companySize,
      draft.foundedYear,
      draft.linkedin,
    ];
    const filled = fields.filter((f) => (f || "").trim().length > 0).length;
    return Math.round((filled / fields.length) * 100);
  }, [draft]);

  return (
    <DashboardLayout title="Company Profile">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* PAGE HEADER (Improved Title UI) */}
        <div className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] border border-[#7A004B] text-white p-6 rounded-xl mb-6">

          <h1 className="text-3xl font-bold tracking-tight">
            Company Profile
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Manage your company details, verification and public profile visibility.
          </p>

          {/* Completion */}
          <div className="mt-4 bg-white/15 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Profile Completion
              </p>
              <p className="text-sm font-semibold">
                {completion}%
              </p>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <BadgeLight text={draft.verified ? "Verified" : "Not Verified"} />
              <BadgeLight text={draft.email || "No Email"} />
              <BadgeLight text={draft.location || "Location Missing"} />
            </div>
          </div>
        </div>

        {/* TOP PROFILE CARD */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Logo */}
            <div className="relative w-28 h-28 rounded-2xl border bg-gray-50 flex items-center justify-center overflow-hidden">
              {draft.logo ? (
                <img
                  src={draft.logo}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">Logo</span>
              )}

              {editMode && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () =>
                        setDraft({ ...draft, logo: reader.result });
                      reader.readAsDataURL(file);
                    }}
                  />

                  {draft.logo && (
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute bottom-1 right-1 text-xs bg-black/70 text-white px-2 py-1 rounded-lg hover:bg-black"
                    >
                      Remove
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Company info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
          {!editMode ? (
  <h1 className="text-2xl font-semibold">
    {profile.companyName || "Company Name"}
  </h1>
) : (
  <input
    className="text-2xl font-semibold border-none outline-none bg-transparent"
    value={draft.companyName}
    placeholder="Company Name"
    onChange={(e) =>
      setDraft({ ...draft, companyName: e.target.value })
    }
  />
)}




                  <p className="text-sm text-gray-600 mt-1">
                    {profile.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <StatusPill verified={profile.verified} />
                    {profile.industry && <Pill text={profile.industry} />}
                    {profile.companySize && <Pill text={profile.companySize} />}
                  </div>
                </div>

                {/* Actions */}
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-5 py-2.5 rounded-xl border bg-white hover:bg-gray-50 font-medium transition"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={saveProfile}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="border px-5 py-2.5 rounded-xl hover:bg-gray-50 transition font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Verification Box */}
              <div className="mt-5 rounded-xl border bg-gray-50 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Verification Status
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {profile.verified
                        ? "Your company is verified. You can post jobs publicly."
                        : "Your verification is pending. Complete your profile and request verification."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        "Verification request submitted! (You can connect this with backend later)"
                      );
                    }}
                    className={`px-4 py-2 rounded-xl font-medium transition ${
                      profile.verified
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                    disabled={profile.verified}
                  >
                    {profile.verified ? "Verified" : "Request Verification"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Company Details */}
          <Section title="Company Details" subtitle="Basic company information for job postings">
            <Field
              label="Company Name"
              placeholder="e.g. TechNova Pvt Ltd"
              value={draft.companyName}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, companyName: v })}
            />

            <Field
              label="Phone"
              placeholder="e.g. +91 98765 43210"
              value={draft.phone}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, phone: v })}
            />

            <Field
              label="Website"
              placeholder="e.g. https://company.com"
              value={draft.website}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, website: v })}
            />

            <Field
              label="Location"
              placeholder="e.g. Noida, India"
              value={draft.location}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, location: v })}
            />
          </Section>

          {/* Company Info */}
          <Section title="Company Info" subtitle="Extra details used for trust & authenticity">
            <Field
              label="Industry"
              placeholder="e.g. IT Services / EdTech / FinTech"
              value={draft.industry}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, industry: v })}
            />

            <Field
              label="Company Size"
              placeholder="e.g. 11-50 employees"
              value={draft.companySize}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, companySize: v })}
            />

            <Field
              label="Founded Year"
              placeholder="e.g. 2021"
              value={draft.foundedYear}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, foundedYear: v })}
            />

            <Field
              label="GST Number"
              placeholder="e.g. 07ABCDE1234F1Z5"
              value={draft.gstNumber}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, gstNumber: v })}
            />
          </Section>
        </div>

        {/* About Company */}
        <Section
          title="About Company"
          subtitle="This description will be shown to candidates on your job posts"
        >
          {!editMode ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {profile.description || "No description added"}
            </p>
          ) : (
            <textarea
              rows={5}
              className="border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={draft.description}
              placeholder="Write about your company, culture, mission, benefits, etc..."
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
            />
          )}
        </Section>

        {/* Social Links */}
        <Section
          title="Social & Links"
          subtitle="Add links to build credibility (LinkedIn recommended)"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="LinkedIn"
              placeholder="e.g. https://linkedin.com/company/your-company"
              value={draft.linkedin}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, linkedin: v })}
            />
            <Field
              label="Twitter / X"
              placeholder="e.g. https://x.com/yourcompany"
              value={draft.twitter}
              editMode={editMode}
              onChange={(v) => setDraft({ ...draft, twitter: v })}
            />
          </div>

          {!editMode && (
            <div className="mt-3 text-sm text-gray-600">
              Tip: Candidates trust companies that have verified links.
            </div>
          )}
        </Section>

        {/* Sticky Save Bar (only in edit mode) */}
        {editMode && (
          <div className="sticky bottom-4">
            <div className="bg-white border shadow-lg rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900">
                  You have unsaved changes
                </p>
                <p className="text-sm text-gray-600">
                  Save to update your public company profile.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={saveProfile}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelEdit}
                  className="border px-5 py-2.5 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

/* ---------- SHARED UI COMPONENTS ---------- */

function Section({ title, subtitle, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
      <div>
        <h2 className="font-bold text-gray-900 text-lg">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, editMode, onChange, placeholder }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      {!editMode ? (
        <p className="text-sm text-gray-900">{value || "-"}</p>
      ) : (
        <input
          className="border p-2.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={value ?? ""}

          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function StatusPill({ verified }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full font-medium ${
        verified
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          verified ? "bg-green-600" : "bg-yellow-600"
        }`}
      />
      {verified ? "Verified Company" : "Verification Pending"}
    </span>
  );
}

function Pill({ text }) {
  return (
    <span className="inline-flex text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
      {text}
    </span>
  );
}

function BadgeLight({ text }) {
  return (
    <span className="inline-flex text-xs px-3 py-1 rounded-full bg-white/20 text-white font-medium">
      {text}
    </span>
  );
}


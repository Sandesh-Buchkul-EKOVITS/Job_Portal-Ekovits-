// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { getEmployerProfile } from "../../app/services/employerProfileService";

// /* ================= CONSTANTS ================= */

// const EXPERIENCE_RANGES = [
//   "0 – 1 Year",
//   "1 – 3 Years",
//   "3 – 5 Years",
//   "5 – 8 Years",
//   "8+ Years",
// ];

// const WORK_MODES = ["Remote", "Hybrid", "On Site"];

// const INDUSTRIES = [
//   "IT Software Development",
//   "IT Services",
//   "Healthcare",
//   "Real Estate",
//   "Construction",
//   "Manufacturing",
//   "BPO / KPO",
//   "E-commerce",
//   "Retail",
//   "Logistics",
//   "Education / EdTech",
//   "FinTech",
//   "Banking",
//   "Insurance",
//   "Hospitality",
//   "Travel & Tourism",
//   "Media & Advertising",
//   "Telecom",
//   "Automobile",
//   "Pharmaceutical",
// ];

// const QUALIFICATIONS = ["Diploma", "Graduate", "Post Graduate"];
// const GENDERS = ["Any", "Male", "Female"];

// const BENEFITS = [
//   "Work From Home",
//   "PF",
//   "Health Insurance",
//   "Cab Facility",
//   "Paid Leave",
// ];

// const LANGUAGES = [
//   "English",
//   "Hindi",
//   "Marathi",
//   "Gujarati",
//   "Tamil",
//   "Telugu",
//   "Malayalam",
// ];

// const QUESTION_TEMPLATES = [
//   "What is your notice period?",
//   "What is your current CTC?",
//   "What is your expected salary?",
//   "Are you willing to relocate?",
// ];

// const MAX_CHARS = 250;

// /* ================= COMPONENT ================= */

// export default function PostJob() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editorRef = useRef(null);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const users = JSON.parse(localStorage.getItem("users")) || [];

//   const employer = users.find(
//     (u) => u.id === currentUser?.id && u.role === "employer"
//   );
//   const companyName = employer?.companyName || "";

//   const query = new URLSearchParams(location.search);
//   const editJobId = query.get("jobId");

//   if (!currentUser || currentUser.role !== "employer" || !companyName) {
//     return (
//       <DashboardLayout title="Post Job">
//         <div className="bg-white p-6 rounded shadow">
//           Invalid session. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const employerProfile = getEmployerProfile(currentUser.id);
//   if (!employerProfile?.verified) {
//     return (
//       <DashboardLayout title="Post Job">
//         <div className="bg-yellow-50 border border-yellow-300 p-6 rounded">
//           Company verification required to post jobs.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const jobToEdit = editJobId
//     ? jobs.find(
//         (j) => j.id === editJobId && j.employerId === currentUser.id
//       )
//     : null;

//   /* ================= STATE ================= */

//   const [form, setForm] = useState({
//     title: jobToEdit?.title || "",
//     experience: jobToEdit?.experience || "",
//     industry: jobToEdit?.industry || "",
//     qualification: jobToEdit?.qualification || "",
//     gender: jobToEdit?.gender || "Any",

//     // ✅ NEW REQUIRED FIELDS
//     workMode: jobToEdit?.workMode || "",
//     location: jobToEdit?.location || "",

//     salaryType: jobToEdit?.salaryType || "Monthly",
//     salaryFrom: jobToEdit?.salaryFrom || "",
//     salaryTo: jobToEdit?.salaryTo || "",

//     skills: jobToEdit?.skills || [],
//     benefits: jobToEdit?.benefits || [],
//     languages: jobToEdit?.languages || [],

//     questions: jobToEdit?.questions || [],

//     aboutCompany: jobToEdit?.aboutCompany || "",
//     description: jobToEdit?.description || "",
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const [customQuestion, setCustomQuestion] = useState("");
//   const [charCount, setCharCount] = useState(0);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (editorRef.current && form.description) {
//       editorRef.current.innerHTML = form.description;
//       setCharCount(editorRef.current.innerText.length);
//     }
//   }, []);

//   /* ================= EDITOR ================= */

//   const updateDescription = () => {
//     const text = editorRef.current.innerText || "";
//     setCharCount(text.length);
//     setForm({ ...form, description: editorRef.current.innerHTML });
//   };

//   const exec = (cmd) => {
//     editorRef.current.focus();
//     document.execCommand(cmd, false, null);
//     updateDescription();
//   };

//   const handleKeyDown = (e) => {
//     if (
//       charCount >= MAX_CHARS &&
//       !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
//     ) {
//       e.preventDefault();
//     }
//   };

//   /* ================= SUBMIT ================= */

//   const submit = () => {
//     if (
//       !form.title ||
//       !form.experience ||
//       !form.industry ||
//       !form.workMode ||
//       !form.location ||
//       !form.salaryFrom ||
//       !form.salaryTo ||
//       !editorRef.current.innerText.trim()
//     ) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     const payload = {
//       ...form,
//       companyName,
//       employerId: currentUser.id,
//       status: "pending",
//       createdAt: new Date().toISOString(),
//     };

//     const updatedJobs = jobToEdit
//       ? jobs.map((j) => (j.id === jobToEdit.id ? payload : j))
//       : [...jobs, { ...payload, id: Date.now().toString() }];

//     localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//     navigate("/employer/my-jobs");
//   };

//   /* ================= UI ================= */

//   return (
//     <DashboardLayout title={jobToEdit ? "Edit Job" : "Post Job"}>
//       <div className="max-w-5xl bg-white p-6 rounded shadow space-y-6">

//         {error && <p className="text-red-600">{error}</p>}

//         <Input label="Job Title *" value={form.title}
//           onChange={(v) => setForm({ ...form, title: v })} />

//         <ReadOnly label="Company Name" value={companyName} />

//         <Select label="Work Experience *" value={form.experience}
//           onChange={(v) => setForm({ ...form, experience: v })}
//           options={EXPERIENCE_RANGES} />

//         {/* ✅ WORK MODE */}
//         <Select
//           label="Work Mode *"
//           value={form.workMode}
//           onChange={(v) => setForm({ ...form, workMode: v })}
//           options={WORK_MODES}
//         />

//         {/* ✅ LOCATION */}
//         <Input
//           label="Job Location *"
//           value={form.location}
//           onChange={(v) => setForm({ ...form, location: v })}
//         />

//         <Select label="Industry *" value={form.industry}
//           onChange={(v) => setForm({ ...form, industry: v })}
//           options={INDUSTRIES} />

//         <Select label="Qualification" value={form.qualification}
//           onChange={(v) => setForm({ ...form, qualification: v })}
//           options={QUALIFICATIONS} />

//         <Select label="Gender" value={form.gender}
//           onChange={(v) => setForm({ ...form, gender: v })}
//           options={GENDERS} />

//         <div className="grid grid-cols-3 gap-4">
//           <Select label="Salary Type *" value={form.salaryType}
//             onChange={(v) => setForm({ ...form, salaryType: v })}
//             options={["Monthly", "Yearly"]} />
//           <Input label="From *" value={form.salaryFrom}
//             onChange={(v) => setForm({ ...form, salaryFrom: v })} />
//           <Input label="To *" value={form.salaryTo}
//             onChange={(v) => setForm({ ...form, salaryTo: v })} />
//         </div>

//         <TagInput
//           label="Candidate Preference / Skills"
//           values={form.skills}
//           input={skillInput}
//           setInput={setSkillInput}
//           onChange={(v) => setForm({ ...form, skills: v })}
//         />

//         <MultiSelect
//           label="Benefits"
//           options={BENEFITS}
//           values={form.benefits}
//           onChange={(v) => setForm({ ...form, benefits: v })}
//         />

//         <MultiSelect
//           label="Languages Known"
//           options={LANGUAGES}
//           values={form.languages}
//           onChange={(v) => setForm({ ...form, languages: v })}
//         />

//         <div>
//           <p className="font-medium mb-2">Job Description *</p>
//           <div
//             ref={editorRef}
//             contentEditable
//             className="border p-3 min-h-[160px] outline-none"
//             onInput={updateDescription}
//             onKeyDown={handleKeyDown}
//             suppressContentEditableWarning
//           />
//         </div>

//         <Textarea
//           label="About Company (Optional)"
//           value={form.aboutCompany}
//           onChange={(v) => setForm({ ...form, aboutCompany: v })}
//         />

//         <button
//           onClick={submit}
//           className="bg-green-600 text-white px-6 py-2 rounded"
//         >
//           {jobToEdit ? "Update Job" : "Publish Job"}
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }

// /* ================= SHARED ================= */

// function Input({ label, value, onChange }) {
//   return (
//     <div>
//       <p className="text-sm font-medium mb-1">{label}</p>
//       <input
//         className="border p-2 rounded w-full"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }

// function Textarea({ label, value, onChange }) {
//   return (
//     <div>
//       <p className="text-sm font-medium mb-1">{label}</p>
//       <textarea
//         className="border p-2 rounded w-full"
//         rows={3}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// }

// function Select({ label, value, onChange, options }) {
//   return (
//     <div>
//       <p className="text-sm font-medium mb-1">{label}</p>
//       <select
//         className="border p-2 rounded w-full"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         <option value="">Select</option>
//         {options.map((o) => (
//           <option key={o} value={o}>{o}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function ReadOnly({ label, value }) {
//   return (
//     <div>
//       <p className="text-sm font-medium mb-1">{label}</p>
//       <div className="border p-2 rounded bg-gray-100">{value}</div>
//     </div>
//   );
// }

// function MultiSelect({ label, options, values, onChange }) {
//   return (
//     <div>
//       <p className="font-medium mb-1">{label}</p>
//       <div className="flex gap-2 flex-wrap">
//         {options.map((o) => (
//           <button
//             key={o}
//             onClick={() =>
//               onChange(
//                 values.includes(o)
//                   ? values.filter((v) => v !== o)
//                   : [...values, o]
//               )
//             }
//             className={`px-3 py-1 text-xs border rounded ${
//               values.includes(o) ? "bg-blue-600 text-white" : ""
//             }`}
//           >
//             {o}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function TagInput({ label, values, input, setInput, onChange }) {
//   return (
//     <div>
//       <p className="font-medium mb-1">{label}</p>
//       <div className="flex gap-2 mb-2">
//         <input
//           className="border p-2 flex-1"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button
//           onClick={() => {
//             if (!input) return;
//             onChange([...values, input]);
//             setInput("");
//           }}
//           className="border px-4"
//         >
//           Add
//         </button>
//       </div>
//       <div className="flex gap-2 flex-wrap">
//         {values.map((v) => (
//           <span key={v} className="bg-gray-200 px-2 py-1 text-xs rounded">
//             {v}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }








import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getEmployerProfile } from "../../app/services/employerProfileService";

/* ================= CONSTANTS ================= */

const EXPERIENCE_RANGES = [
  "0 – 1 Year",
  "1 – 3 Years",
  "3 – 5 Years",
  "5 – 8 Years",
  "8+ Years",
];

const WORK_MODES = ["Remote", "Hybrid", "On Site"];

const INDUSTRIES = [
  "IT Software Development",
  "IT Services",
  "Healthcare",
  "Real Estate",
  "Construction",
  "Manufacturing",
  "BPO / KPO",
  "E-commerce",
  "Retail",
  "Logistics",
  "Education / EdTech",
  "FinTech",
  "Banking",
  "Insurance",
  "Hospitality",
  "Travel & Tourism",
  "Media & Advertising",
  "Telecom",
  "Automobile",
  "Pharmaceutical",
];

const QUALIFICATIONS = ["Diploma", "Graduate", "Post Graduate"];
const GENDERS = ["Any", "Male", "Female"];

const BENEFITS = [
  "Work From Home",
  "PF",
  "Health Insurance",
  "Cab Facility",
  "Paid Leave",
];

const LANGUAGES = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Telugu",
  "Malayalam",
];

const QUESTION_TEMPLATES = [
  "What is your notice period?",
  "What is your current CTC?",
  "What is your expected salary?",
  "Are you willing to relocate?",
];

const MAX_CHARS = 250;

// ✅ Subscription Limits
const PLAN_LIMITS = {
  FREE: 1,
  BASIC: 5,
  PREMIUM: 10,
};

/* ================= COMPONENT ================= */

export default function PostJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const employer = users.find(
    (u) => u.id === currentUser?.id && u.role === "employer"
  );
  const companyName = employer?.companyName || "";

  const query = new URLSearchParams(location.search);
  const editJobId = query.get("jobId");

  if (!currentUser || currentUser.role !== "employer" || !companyName) {
    return (
      <DashboardLayout title="Post Job">







        <div className="bg-white p-6 rounded-xl shadow">
          Invalid session. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const employerProfile = getEmployerProfile(currentUser.id);
  if (!employerProfile?.verified) {
    return (
      <DashboardLayout title="Post Job">







        
        <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-xl">
          <p className="font-semibold text-yellow-800">
            Company verification required to post jobs.
          </p>
          <p className="text-sm text-yellow-700 mt-1">
            Please verify your company profile first.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const jobToEdit = editJobId
    ? jobs.find((j) => j.id === editJobId && j.employerId === currentUser.id)
    : null;

  // ✅ Current Plan & Limits
  const currentPlan = currentUser.plan || "FREE";
  const maxJobsAllowed = PLAN_LIMITS[currentPlan] || 1;

  const employerJobs = jobs.filter((j) => j.employerId === currentUser.id);
  const activeJobsCount = employerJobs.length;

  const isLimitReached = !jobToEdit && activeJobsCount >= maxJobsAllowed;

  /* ================= STATE ================= */

  const [form, setForm] = useState({
    title: jobToEdit?.title || "",
    experience: jobToEdit?.experience || "",
    industry: jobToEdit?.industry || "",
    qualification: jobToEdit?.qualification || "",
    gender: jobToEdit?.gender || "Any",

    // REQUIRED
    workMode: jobToEdit?.workMode || "",
    location: jobToEdit?.location || "",

    salaryType: jobToEdit?.salaryType || "Monthly",
    salaryFrom: jobToEdit?.salaryFrom || "",
    salaryTo: jobToEdit?.salaryTo || "",

    skills: jobToEdit?.skills || [],
    benefits: jobToEdit?.benefits || [],
    languages: jobToEdit?.languages || [],

    questions: jobToEdit?.questions || [],

    aboutCompany: jobToEdit?.aboutCompany || "",
    description: jobToEdit?.description || "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editorRef.current && form.description) {
      editorRef.current.innerHTML = form.description;
      setCharCount(editorRef.current.innerText.length);
    }
  }, []);

  /* ================= EDITOR ================= */

  const updateDescription = () => {
    const text = editorRef.current?.innerText || "";
    setCharCount(text.length);
    setForm({ ...form, description: editorRef.current?.innerHTML || "" });
  };

  const exec = (cmd) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(cmd, false, null);
    updateDescription();
  };

  const handleKeyDown = (e) => {
    if (
      charCount >= MAX_CHARS &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  /* ================= SUBMIT ================= */

  const submit = () => {
    setError("");

    // ✅ Plan Limit Check (Only for NEW job posting)
    if (!jobToEdit && activeJobsCount >= maxJobsAllowed) {
      setError(
        `Your ${currentPlan} plan allows only ${maxJobsAllowed} job post(s). Please upgrade to post more jobs.`
      );
      return;
    }

    if (
      !form.title ||
      !form.experience ||
      !form.industry ||
      !form.workMode ||
      !form.location ||
      !form.salaryFrom ||
      !form.salaryTo ||
      !editorRef.current?.innerText?.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const payload = {
      ...form,
      companyName,
      employerId: currentUser.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updatedJobs = jobToEdit
      ? jobs.map((j) => (j.id === jobToEdit.id ? { ...j, ...payload } : j))
      : [...jobs, { ...payload, id: Date.now().toString() }];

    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    navigate("/employer/my-jobs");
  };

  /* ================= UI ================= */

  return (
    <DashboardLayout title={jobToEdit ? "Edit Job" : "Post Job"}>

{/* PAGE HEADING */}
<div className="mb-8">
  <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
    Post a New Job
  </h2>
  <p className="text-sm text-slate-500 mt-1">
    Create and publish a job opening to hire the right candidates
  </p>
</div>






      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Plan Banner */}
        <div className="rounded-2xl p-5 text-white shadow bg-gradient-to-r from-[#7A004B] to-[#CC0047]">

          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Current Plan: {currentPlan}
              </h2>
              <p className="text-sm opacity-90 mt-1">
                Jobs Posted: {activeJobsCount}/{maxJobsAllowed}
              </p>
            </div>

            {!jobToEdit && (
              <button
                onClick={() => navigate("/employer/subscription")}
                className="bg-white/15 hover:bg-white/25 px-4 py-2 rounded-xl text-sm font-medium transition"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>

        {/* Limit Reached Banner */}
        {isLimitReached && (
          <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-2xl shadow-sm">
            <p className="font-semibold">
              You have reached your job posting limit for {currentPlan}.
            </p>
            <p className="text-sm mt-1">
              Upgrade your plan to post more jobs.
            </p>
            <div className="mt-3">
              <button
                onClick={() => navigate("/employer/subscription")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-2xl">
            <p className="font-semibold">⚠ {error}</p>
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-6 border">
          {/* Job Title */}
          <Input
            label="Job Title *"
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          {/* Company */}
          <ReadOnly label="Company Name" value={companyName} />

          {/* Experience */}
          <Select
            label="Work Experience *"
            value={form.experience}
            onChange={(v) => setForm({ ...form, experience: v })}
            options={EXPERIENCE_RANGES}
          />

          {/* Work Mode */}
          <Select
            label="Work Mode *"
            value={form.workMode}
            onChange={(v) => setForm({ ...form, workMode: v })}
            options={WORK_MODES}
          />

          {/* Location */}
          <Input
            label="Job Location *"
            value={form.location}
            onChange={(v) => setForm({ ...form, location: v })}
          />

          {/* Industry */}
          <Select
            label="Industry *"
            value={form.industry}
            onChange={(v) => setForm({ ...form, industry: v })}
            options={INDUSTRIES}
          />

          {/* Qualification */}
          <Select
            label="Qualification"
            value={form.qualification}
            onChange={(v) => setForm({ ...form, qualification: v })}
            options={QUALIFICATIONS}
          />

          {/* Gender */}
          <Select
            label="Gender"
            value={form.gender}
            onChange={(v) => setForm({ ...form, gender: v })}
            options={GENDERS}
          />

          {/* Salary */}
          <div className="grid md:grid-cols-3 gap-4">
            <Select
              label="Salary Type *"
              value={form.salaryType}
              onChange={(v) => setForm({ ...form, salaryType: v })}
              options={["Monthly", "Yearly"]}
            />
            <Input
              label="From *"
              value={form.salaryFrom}
              onChange={(v) => setForm({ ...form, salaryFrom: v })}
            />
            <Input
              label="To *"
              value={form.salaryTo}
              onChange={(v) => setForm({ ...form, salaryTo: v })}
            />
          </div>

          {/* Skills */}
          <TagInput
            label="Candidate Preference / Skills"
            values={form.skills}
            input={skillInput}
            setInput={setSkillInput}
            onChange={(v) => setForm({ ...form, skills: v })}
          />

          {/* Benefits */}
          <MultiSelect
            label="Benefits"
            options={BENEFITS}
            values={form.benefits}
            onChange={(v) => setForm({ ...form, benefits: v })}
          />

          {/* Languages */}
          <MultiSelect
            label="Languages Known"
            options={LANGUAGES}
            values={form.languages}
            onChange={(v) => setForm({ ...form, languages: v })}
          />

          {/* Job Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">Job Description *</p>
              <p className="text-xs text-gray-500">
                {charCount}/{MAX_CHARS}
              </p>
            </div>

            {/* Editor toolbar (UI improve) */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => exec("bold")}
                className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
              >
                Bold
              </button>
              <button
                type="button"
                onClick={() => exec("italic")}
                className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
              >
                Italic
              </button>
              <button
                type="button"
                onClick={() => exec("underline")}
                className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-50"
              >
                Underline
              </button>
            </div>

            <div
              ref={editorRef}
              contentEditable
              className="border p-3 min-h-[160px] rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
              onInput={updateDescription}
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning
            />
          </div>

          {/* About Company */}
          <Textarea
            label="About Company (Optional)"
            value={form.aboutCompany}
            onChange={(v) => setForm({ ...form, aboutCompany: v })}
          />

          {/* Submit */}
          <button
            onClick={submit}
            disabled={isLimitReached}
            className={`w-full px-6 py-3 rounded-xl font-semibold transition
              ${
                isLimitReached
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] text-white hover:opacity-95"
              }
            `}
          >
            {jobToEdit ? "Update Job" : "Publish Job"}
          </button>

          {!jobToEdit && (
            <p className="text-xs text-gray-500 text-center">
              Your plan allows {maxJobsAllowed} job post(s). Upgrade anytime for
              more.
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ================= SHARED ================= */

function Input({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1 text-gray-700">{label}</p>
      <input
        className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1 text-gray-700">{label}</p>
      <textarea
        className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 outline-none"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1 text-gray-700">{label}</p>
      <select
        className="border p-2 rounded-xl w-full focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ReadOnly({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium mb-1 text-gray-700">{label}</p>
      <div className="border p-2 rounded-xl bg-gray-100 text-gray-800">
        {value}
      </div>
    </div>
  );
}

function MultiSelect({ label, options, values, onChange }) {
  return (
    <div>
      <p className="font-medium mb-2 text-gray-700">{label}</p>
      <div className="flex gap-2 flex-wrap">
        {options.map((o) => {
          const active = values.includes(o);
          return (
            <button
              type="button"
              key={o}
              onClick={() =>
                onChange(
                  active ? values.filter((v) => v !== o) : [...values, o]
                )
              }
              className={`px-3 py-1 text-xs border rounded-full transition
                ${
                  active
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white hover:bg-gray-50"
                }
              `}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TagInput({ label, values, input, setInput, onChange }) {
  return (
    <div>
      <p className="font-medium mb-2 text-gray-700">{label}</p>

      <div className="flex gap-2 mb-3">
        <input
          className="border p-2 flex-1 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a skill and click Add"
        />
        <button
          type="button"
          onClick={() => {
            const trimmed = input.trim();
            if (!trimmed) return;

            // avoid duplicates
            if (values.includes(trimmed)) {
              setInput("");
              return;
            }

            onChange([...values, trimmed]);
            setInput("");
          }}
         className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-95 text-white px-4 rounded-xl transition"

        >
          Add
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {values.map((v) => (
          <span
            key={v}
            className="bg-gray-100 border px-3 py-1 text-xs rounded-full text-gray-700"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

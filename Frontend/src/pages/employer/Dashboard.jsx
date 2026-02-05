// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { getEmployerProfile } from "../../app/services/employerProfileService";

// export default function EmployerDashboard() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="Employer Dashboard">
//         <div className="bg-white p-6 rounded shadow">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const profile = getEmployerProfile(currentUser.id);
//   const jobs =
//     JSON.parse(localStorage.getItem("jobs")) || [];

//   const activeJobs = jobs.filter(
//     (j) =>
//       j.employerId === currentUser.id &&
//       j.status === "approved"
//   ).length;

//   const plan = currentUser.plan || "FREE";
//   const planLimit =
//     plan === "FREE"
//       ? 1
//       : plan === "BASIC"
//       ? 5
//       : "Unlimited";

//   return (
//     <DashboardLayout title="Employer Dashboard">
//       {/* HEADER */}
//       <div className="bg-white p-5 rounded shadow mb-6 flex flex-col md:flex-row justify-between gap-4">
//         <div>
//           <h2 className="text-xl font-semibold">
//             Welcome, {currentUser.name}
//           </h2>
//           <p className="text-sm text-gray-600">
//             Manage your company, jobs and applicants
//           </p>
//         </div>

//         <div className="flex gap-3 flex-wrap items-center">
//           <Badge label={`Plan: ${plan}`} color="blue" />
//           <Badge
//             label={
//               profile?.verified
//                 ? "Verified"
//                 : "Not Verified"
//             }
//             color={
//               profile?.verified ? "green" : "yellow"
//             }
//           />
//           <Badge
//             label={`Jobs: ${activeJobs}/${planLimit}`}
//             color="gray"
//           />
//         </div>
//       </div>

//       {/* DASHBOARD CARDS */}
//       <div className="grid md:grid-cols-4 gap-6">
//         {/* COMPANY PROFILE */}
//         <ActionCard
//           title="Company Profile"
//           description="Manage company details, logo & description"
//           buttonText="View Profile"
//           buttonClass="bg-indigo-600"
//           onClick={() =>
//             navigate("/employer/profile")
//           }
//         />

//         {/* POST JOB */}
//         <ActionCard
//           title="Post a Job"
//           description="Create and publish a new job opening"
//           buttonText="Create Job"
//           buttonClass="bg-blue-600"
//           onClick={() =>
//             navigate("/employer/post-job")
//           }
//         />

//         {/* MY JOBS */}
//         <ActionCard
//           title="My Jobs"
//           description="View job status and manage postings"
//           buttonText="View Jobs"
//           buttonClass="bg-gray-800"
//           onClick={() =>
//             navigate("/employer/my-jobs")
//           }
//         />

//         {/* APPLICANTS */}
//         <ActionCard
//           title="Applicants"
//           description="Review and manage job applicants"
//           buttonText="View Applicants"
//           buttonClass="bg-green-600"
//           onClick={() =>
//             navigate("/employer/applicants")
//           }
//         />
//       </div>

//       {/* SUBSCRIPTION */}
//       <div className="mt-8">
//         <ActionCard
//           title="Subscription"
//           description="View your current plan and limits"
//           buttonText="View Subscription"
//           buttonClass="bg-purple-600"
//           onClick={() =>
//             navigate("/employer/subscription")
//           }
//         />
//       </div>
//     </DashboardLayout>
//   );
// }

// /* ---------- SHARED ---------- */

// function ActionCard({
//   title,
//   description,
//   buttonText,
//   buttonClass,
//   onClick,
// }) {
//   return (
//     <div className="bg-white p-5 rounded shadow flex flex-col justify-between">
//       <div>
//         <h3 className="font-semibold mb-1">
//           {title}
//         </h3>
//         <p className="text-sm text-gray-600 mb-4">
//           {description}
//         </p>
//       </div>

//       <button
//         onClick={onClick}
//         className={`${buttonClass} text-white px-4 py-2 rounded`}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// }

// function Badge({ label, color }) {
//   const colors = {
//     blue: "bg-blue-100 text-blue-700",
//     green: "bg-green-100 text-green-700",
//     yellow:
//       "bg-yellow-100 text-yellow-700",
//     gray: "bg-gray-200 text-gray-700",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}
//     >
//       {label}
//     </span>
//   );
// }




// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { getEmployerProfile } from "../../app/services/employerProfileService";

// export default function EmployerDashboard() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="Employer Dashboard">
//         <div className="bg-white p-6 rounded shadow">
//           Session expired. Please login again.
//         </div>



//       </DashboardLayout>
//     );
//   }

//   const profile = getEmployerProfile(currentUser.id);
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

//   const employerJobs = jobs.filter(
//     (j) => j.employerId === currentUser.id
//   );

//   const activeJobs = employerJobs.filter(
//     (j) => j.status === "approved"
//   ).length;

//   const pendingJobs = employerJobs.filter(
//     (j) => j.status === "pending"
//   ).length;

//   const plan = currentUser.plan || "FREE";
//   const planLimit =
//     plan === "FREE" ? 1 : plan === "BASIC" ? 5 : "Unlimited";

//   return (
//     <DashboardLayout title="Employer Dashboard">
//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 rounded-xl mb-6">
//         <h2 className="text-2xl font-semibold">
//           Welcome back, {currentUser.name} 👋
//         </h2>
//         <p className="text-sm opacity-90">
//           Manage jobs, applicants & company profile from here
//         </p>

//         <div className="flex gap-3 mt-4 flex-wrap">
//           <Badge label={`Plan: ${plan}`} color="blue" />
//           <Badge
//             label={profile?.verified ? "Verified Company" : "Not Verified"}
//             color={profile?.verified ? "green" : "yellow"}
//           />
//           <Badge
//             label={`Active Jobs: ${activeJobs}/${planLimit}`}
//             color="gray"
//           />
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Jobs" value={employerJobs.length} />
//         <StatCard title="Active Jobs" value={activeJobs} />
//         <StatCard title="Pending Approval" value={pendingJobs} />
//         <StatCard title="Total Applicants" value="—" />
//       </div>

//       {/* ACTION CARDS */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <ActionCard
//           title="Company Profile"
//           description="Update company details, logo & description"
//           buttonText="View Profile"
//           buttonClass="bg-indigo-600"
//           onClick={() => navigate("/employer/profile")}
//         />

//         <ActionCard
//           title="Post a Job"
//           description="Create and publish a new job opening"
//           buttonText="Create Job"
//           buttonClass="bg-blue-600"
//           onClick={() => navigate("/employer/post-job")}
//         />

//         <ActionCard
//           title="My Jobs"
//           description="Manage job status & edit postings"
//           buttonText="View Jobs"
//           buttonClass="bg-gray-800"
//           onClick={() => navigate("/employer/my-jobs")}
//         />

//         <ActionCard
//           title="Applicants"
//           description="Review and shortlist candidates"
//           buttonText="View Applicants"
//           buttonClass="bg-green-600"
//           onClick={() => navigate("/employer/applicants")}
//         />
//       </div>

//       {/* SUBSCRIPTION */}
//       <div className="mt-8">
//         <ActionCard
//           title="Subscription & Billing"
//           description="View plan benefits, limits & upgrade"
//           buttonText="Manage Plan"
//           buttonClass="bg-purple-600"
//           onClick={() => navigate("/employer/subscription")}
//         />
//       </div>
//     </DashboardLayout>
//   );
// }

// /* ---------- SHARED ---------- */

// function ActionCard({ title, description, buttonText, buttonClass, onClick }) {
//   return (
//     <div className="bg-white p-5 rounded-xl border hover:shadow-md transition flex flex-col justify-between">
//       <div>
//         <h3 className="font-semibold mb-1">{title}</h3>
//         <p className="text-sm text-gray-600 mb-4">{description}</p>
//       </div>

//       <button
//         onClick={onClick}
//         className={`${buttonClass} text-white px-4 py-2 rounded-lg hover:opacity-90 transition`}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-xl border">
//       <p className="text-sm text-gray-500">{title}</p>
//       <h3 className="text-2xl font-semibold mt-1">{value}</h3>
//     </div>
//   );
// }

// function Badge({ label, color }) {
//   const colors = {
//     blue: "bg-blue-100 text-blue-700",
//     green: "bg-green-100 text-green-700",
//     yellow: "bg-yellow-100 text-yellow-700",
//     gray: "bg-gray-200 text-gray-700",
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}>
//       {label}
//     </span>
//   );
// }







// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { getEmployerProfile } from "../../app/services/employerProfileService";

// export default function EmployerDashboard() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="Employer Dashboard">
//         <div className="bg-white p-6 rounded shadow">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const profile = getEmployerProfile(currentUser.id);
//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

//   const employerJobs = jobs.filter((j) => j.employerId === currentUser.id);

//   const activeJobs = employerJobs.filter((j) => j.status === "approved").length;

//   const pendingJobs = employerJobs.filter((j) => j.status === "pending").length;

//   const plan = currentUser.plan || "FREE";
//   const planLimit = plan === "FREE" ? 1 : plan === "BASIC" ? 5 : "Unlimited";

//   // ✅ Verification Flow States
//   const verificationKey = `verification_request_${currentUser.id}`;
//   const verificationRequest = JSON.parse(localStorage.getItem(verificationKey));

//   const isVerified = profile?.verified === true;
//   const isPending = verificationRequest?.status === "pending";

//   // ✅ Request Verification Handler
//   const handleRequestVerification = () => {
//     if (isVerified) return;
//     if (isPending) return;

//     const newRequest = {
//       status: "pending",
//       requestedAt: new Date().toISOString(),
//       companyName: profile?.companyName || profile?.name || "Company",
//       employerId: currentUser.id,
//     };

//     localStorage.setItem(verificationKey, JSON.stringify(newRequest));

//     alert("✅ Verification request submitted! Status: Pending");
//     window.location.reload();
//   };

//   return (
//     <DashboardLayout title="Employer Dashboard">
//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 text-gray-800 p-6 rounded-xl mb-6">
//         <h2 className="text-2xl font-semibold">
//           Welcome back, {currentUser.name} 👋
//         </h2>
//         <p className="text-sm text-gray-600 mt-1">
//           Manage jobs, applicants & company profile from here
//         </p>

//         <div className="flex gap-3 mt-4 flex-wrap">
//           <Badge label={`Plan: ${plan}`} color="blue" />

//           {/* ✅ Verified Badge Logic */}
//           <Badge
//             label={
//               isVerified
//                 ? "Verified Company"
//                 : isPending
//                 ? "Verification Pending"
//                 : "Not Verified"
//             }
//             color={isVerified ? "green" : isPending ? "gray" : "yellow"}
//           />

//           <Badge label={`Active Jobs: ${activeJobs}/${planLimit}`} color="gray" />
//         </div>
//       </div>

//       {/* ✅ VERIFICATION FLOW CARD */}
//       {!isVerified && (
//         <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h3 className="font-semibold text-lg text-gray-800">
//                 {isPending ? "Verification Request Pending ⏳" : "Get Verified ✅"}
//               </h3>

//               <p className="text-sm text-gray-600 mt-1">
//                 {isPending
//                   ? "Your verification request is under review. Once approved, your company will show as Verified."
//                   : "Verified companies look more trusted and can post jobs without restrictions."}
//               </p>

//               {!isPending && (
//                 <p className="text-xs text-gray-500 mt-2">
//                   Tip: Complete company profile details before requesting verification.
//                 </p>
//               )}
//             </div>

//             <div className="flex gap-3 flex-wrap">
//               {/* View Profile Button */}
//               <button
//                 onClick={() => navigate("/employer/profile")}
//                 className="bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition"
//               >
//                 Complete Profile
//               </button>

//               {/* Request Verification Button */}
//               <button
//                 onClick={handleRequestVerification}
//                 disabled={isPending}
//                 className={`px-4 py-2 rounded-lg transition border ${
//                   isPending
//                     ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
//                     : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
//                 }`}
//               >
//                 {isPending ? "Request Sent" : "Request Verification"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* STATS */}
//       <div className="grid md:grid-cols-4 gap-6 mb-8">
//         <StatCard title="Total Jobs" value={employerJobs.length} />
//         <StatCard title="Active Jobs" value={activeJobs} />
//         <StatCard title="Pending Approval" value={pendingJobs} />
//         <StatCard title="Total Applicants" value="—" />
//       </div>

//       {/* ACTION CARDS */}
//       <div className="grid md:grid-cols-4 gap-6">
//         <ActionCard
//           title="Company Profile"
//           description="Update company details, logo & description"
//           buttonText="View Profile"
//           buttonClass="bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
//           onClick={() => navigate("/employer/profile")}
//         />

//         {/* Post Job restriction */}
//         <ActionCard
//           title="Post a Job"
//           description={
//             isVerified
//               ? "Create and publish a new job opening"
//               : isPending
//               ? "You can post jobs after verification approval"
//               : "Verify your company to post jobs"
//           }
//           buttonText={isVerified ? "Create Job" : "Get Verified First"}
//           buttonClass={
//             isVerified
//               ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
//               : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
//           }
//           onClick={() => {
//             if (!isVerified) {
//               alert("⚠️ Please verify your company before posting a job.");
//               navigate("/employer/profile");
//               return;
//             }
//             navigate("/employer/post-job");
//           }}
//         />

//         <ActionCard
//           title="My Jobs"
//           description="Manage job status & edit postings"
//           buttonText="View Jobs"
//           buttonClass="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
//           onClick={() => navigate("/employer/my-jobs")}
//         />

//         <ActionCard
//           title="Applicants"
//           description="Review and shortlist candidates"
//           buttonText="View Applicants"
//           buttonClass="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
//           onClick={() => navigate("/employer/applicants")}
//         />
//       </div>

//       {/* SUBSCRIPTION */}
//       <div className="mt-8">
//         <ActionCard
//           title="Subscription & Billing"
//           description="View plan benefits, limits & upgrade"
//           buttonText="Manage Plan"
//           buttonClass="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
//           onClick={() => navigate("/employer/subscription")}
//         />
//       </div>
//     </DashboardLayout>
//   );
// }

// /* ---------- SHARED ---------- */

// function ActionCard({ title, description, buttonText, buttonClass, onClick }) {
//   return (
//     <div className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-sm transition flex flex-col justify-between">
//       <div>
//         <h3 className="font-semibold mb-1 text-gray-800">{title}</h3>
//         <p className="text-sm text-gray-600 mb-4">{description}</p>
//       </div>

//       <button
//         onClick={onClick}
//         className={`px-4 py-2 rounded-lg transition border ${buttonClass}`}
//       >
//         {buttonText}
//       </button>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-xl border border-gray-200">
//       <p className="text-sm text-gray-500">{title}</p>
//       <h3 className="text-2xl font-semibold mt-1 text-gray-800">{value}</h3>
//     </div>
//   );
// }

// function Badge({ label, color }) {
//   const colors = {
//     blue: "bg-blue-50 text-blue-700 border border-blue-200",
//     green: "bg-green-50 text-green-700 border border-green-200",
//     yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//     gray: "bg-gray-50 text-gray-700 border border-gray-200",
//   };

//   return (
//     <span
//       className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}
//     >
//       {label}
//     </span>
//   );
// }










import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getEmployerProfile } from "../../app/services/employerProfileService";

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "employer") {
    return (
      // <DashboardLayout title="Employer Dashboard">
      <DashboardLayout>


        

        <div className="bg-white p-6 rounded shadow">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  const profile = getEmployerProfile(currentUser.id);
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const employerJobs = jobs.filter((j) => j.employerId === currentUser.id);

  const activeJobs = employerJobs.filter((j) => j.status === "approved").length;

  const pendingJobs = employerJobs.filter((j) => j.status === "pending").length;

  const plan = currentUser.plan || "FREE";
  const planLimit = plan === "FREE" ? 1 : plan === "BASIC" ? 5 : "Unlimited";

  // ✅ Verification Flow States
  const verificationKey = `verification_request_${currentUser.id}`;
  const verificationRequest = JSON.parse(localStorage.getItem(verificationKey));

  const isVerified = profile?.verified === true;
  const isPending = verificationRequest?.status === "pending";

  // ✅ Request Verification Handler
  const handleRequestVerification = () => {
    if (isVerified) return;
    if (isPending) return;

    const newRequest = {
      status: "pending",
      requestedAt: new Date().toISOString(),
      companyName: profile?.companyName || profile?.name || "Company",
      employerId: currentUser.id,
    };

    localStorage.setItem(verificationKey, JSON.stringify(newRequest));

    alert("✅ Verification request submitted! Status: Pending");
    window.location.reload();
  };

  return (
    // <DashboardLayout title="Employer Dashboard">
    <DashboardLayout>


{/* PAGE HEADING */}
<div className="mb-8">
  <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
    Employer Dashboard
  </h2>
  <p className="text-sm text-slate-500 mt-1">
    Manage jobs, applicants and your company profile
  </p>
</div>



      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#7a0054] via-[#9c005e] to-[#d1004f] text-white p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold">
          Welcome back, {currentUser.name} 👋
        </h2>
        <p className="text-sm text-white/90 mt-1">
          Manage jobs, applicants & company profile from here
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge label={`Plan: ${plan}`} color="blue" />

          {/* ✅ Verified Badge Logic */}
          <Badge
            label={
              isVerified
                ? "Verified Company"
                : isPending
                ? "Verification Pending"
                : "Not Verified"
            }
            color={isVerified ? "green" : isPending ? "gray" : "yellow"}
          />

          <Badge label={`Active Jobs: ${activeJobs}/${planLimit}`} color="gray" />
        </div>
      </div>

      {/* ✅ VERIFICATION FLOW CARD */}
      {!isVerified && (
        <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {isPending ? "Verification Request Pending ⏳" : "Get Verified ✅"}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {isPending
                  ? "Your verification request is under review. Once approved, your company will show as Verified."
                  : "Verified companies look more trusted and can post jobs without restrictions."}
              </p>

              {!isPending && (
                <p className="text-xs text-gray-500 mt-2">
                  Tip: Complete company profile details before requesting verification.
                </p>
              )}
            </div>

            <div className="flex gap-3 flex-wrap">
              {/* View Profile Button */}
              <button
                onClick={() => navigate("/employer/profile")}
                className="bg-[#9C005E] text-white px-4 py-2 rounded-lg hover:bg-[#7f004c] transition"
              >
                Complete Profile
              </button>

              {/* Request Verification Button */}
              <button
                onClick={handleRequestVerification}
                disabled={isPending}
                className={`px-4 py-2 rounded-lg transition ${
                  isPending
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#9C005E] text-white hover:bg-[#7f004c]"
                }`}
              >
                {isPending ? "Request Sent" : "Request Verification"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Jobs" value={employerJobs.length} />
        <StatCard title="Active Jobs" value={activeJobs} />
        <StatCard title="Pending Approval" value={pendingJobs} />
        <StatCard title="Total Applicants" value="—" />
      </div>

      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <ActionCard
          title="Company Profile"
          description="Update company details, logo & description"
          buttonText="View Profile"
          buttonClass="bg-[#9C005E] text-white hover:bg-[#7f004c]"
          onClick={() => navigate("/employer/profile")}
        />

        {/* Post Job restriction */}
        <ActionCard
          title="Post a Job"
          description={
            isVerified
              ? "Create and publish a new job opening"
              : isPending
              ? "You can post jobs after verification approval"
              : "Verify your company to post jobs"
          }
          buttonText={isVerified ? "Create Job" : "Get Verified First"}
          buttonClass={
            isVerified
              ? "bg-[#9C005E] text-white hover:bg-[#7f004c]"
              : "bg-[#9C005E] text-white hover:bg-[#7f004c]"
          }
          onClick={() => {
            if (!isVerified) {
              alert("⚠️ Please verify your company before posting a job.");
              navigate("/employer/profile");
              return;
            }
            navigate("/employer/post-job");
          }}
        />

        <ActionCard
          title="My Jobs"
          description="Manage job status & edit postings"
          buttonText="View Jobs"
          buttonClass="bg-[#9C005E] text-white hover:bg-[#7f004c]"
          onClick={() => navigate("/employer/my-jobs")}
        />

        <ActionCard
          title="Applicants"
          description="Review and shortlist candidates"
          buttonText="View Applicants"
          buttonClass="bg-[#9C005E] text-white hover:bg-[#7f004c]"
          onClick={() => navigate("/employer/applicants")}
        />
      </div>

      {/* SUBSCRIPTION */}
      <div className="mt-8">
        <ActionCard
          title="Subscription & Billing"
          description="View plan benefits, limits & upgrade"
          buttonText="Manage Plan"
          buttonClass="bg-[#9C005E] text-white hover:bg-[#7f004c]"
          onClick={() => navigate("/employer/subscription")}
        />
      </div>
    </DashboardLayout>
  );
}

/* ---------- SHARED ---------- */

function ActionCard({ title, description, buttonText, buttonClass, onClick }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-sm transition flex flex-col justify-between">
      <div>
        <h3 className="font-semibold mb-1 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>

      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg transition ${buttonClass}`}
      >
        {buttonText}
      </button>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-1 text-gray-800">{value}</h3>
    </div>
  );
}

function Badge({ label, color }) {
  const colors = {
    blue: "bg-white/20 text-white border border-white/30",
    green: "bg-white/20 text-white border border-white/30",
    yellow: "bg-white/20 text-white border border-white/30",
    gray: "bg-white/20 text-white border border-white/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[color]}`}
    >
      {label}
    </span>
  );
}

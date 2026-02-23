// import DashboardLayout from "../../app/layouts/DashboardLayout";

// export default function EmployerSubscription() {
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="Subscription">
//         <div className="bg-white p-6 rounded shadow">
//           Access denied.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const plan = currentUser.plan || "FREE";

//   const plans = [
//     {
//       name: "FREE",
//       jobs: "1 Active Job",
//       price: "₹0",
//     },
//     {
//       name: "BASIC",
//       jobs: "5 Active Jobs",
//       price: "Admin Assigned",
//     },
//     {
//       name: "PREMIUM",
//       jobs: "Unlimited Jobs",
//       price: "Admin Assigned",
//     },
//   ];

//   return (
//     <DashboardLayout title="Subscription">
//       <div className="max-w-5xl mx-auto">
//         <h2 className="text-xl font-semibold mb-6">
//           Your Subscription Plan
//         </h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((p) => (
//             <div
//               key={p.name}
//               className={`border rounded p-6 ${
//                 plan === p.name
//                   ? "border-blue-600 bg-blue-50"
//                   : "bg-white"
//               }`}
//             >
//               <h3 className="text-lg font-semibold mb-2">
//                 {p.name}
//               </h3>
//               <p className="text-sm mb-1">
//                 {p.jobs}
//               </p>
//               <p className="text-sm mb-4">
//                 Price: {p.price}
//               </p>

//               {plan === p.name ? (
//                 <span className="text-xs font-medium text-green-600">
//                   Current Plan
//                 </span>
//               ) : (
//                 <button
//                   disabled
//                   className="text-xs text-gray-500 border px-3 py-1 rounded cursor-not-allowed"
//                 >
//                   Contact Admin to Upgrade
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }





// import { useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";

// export default function EmployerSubscription() {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout>
//         <div className="bg-white p-6 rounded shadow">
//           Access denied.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const plan = currentUser.plan || "FREE";

//   const plans = [
//     {
//       name: "FREE",
//       price: "₹0",
//       jobs: "1 Active Job",
//       features: [
//         "Post 1 job only",
//       "Limited applicants access",
//       "Email notifications",
//       ],
//     },
//     {
//       name: "BASIC",
//       price: "Admin Assigned",
//       jobs: "5 Active Jobs",
//       features: [
//          "Post up to 5 jobs",
//       "View applicant profiles",
//       "Priority job approval",
//       ],
//     },
//     {
//       name: "PREMIUM",
//       price: "Admin Assigned",
//       jobs: "10 Active Jobs",
//       features: [
//          "Post up to 10 jobs",
//       "Full applicant access",
//       "Featured employer profile",
//       "Priority support",
//       ],
//     },
//   ];

//   const handlePlanClick = (planName) => {
//     setSelectedPlan(planName);
//   };

//   return (
//     <DashboardLayout title="Subscription">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADING */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
//             Subscription & Billing Overview
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">
//             Manage your plan, limits and platform access
//           </p>
//         </div>

//         {/* CURRENT PLAN INFO */}
//         <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-6 rounded-xl mb-8">
//           <h3 className="text-xl font-semibold">
//             Current Plan: {plan}
//           </h3>
//           <p className="text-sm opacity-90">
//             Upgrade to unlock more hiring power 🚀
//           </p>
//         </div>

//         {/* PLANS */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((p) => {
//             const isCurrent = plan === p.name;
//             const isSelected = selectedPlan === p.name;

//             return (
//               <div
//                 key={p.name}
//                 onClick={() => handlePlanClick(p.name)}
//                 className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300
//                   hover:scale-[1.03] hover:shadow-xl
//                   ${
//                     isCurrent
//                       ? "border-indigo-600 bg-indigo-50"
//                       : isSelected
//                       ? "border-violet-600 bg-violet-50"
//                       : "bg-white hover:border-indigo-400"
//                   }
//                 `}
//               >
//                 {isCurrent && (
//                   <span className="absolute top-3 right-3 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
//                     Current Plan
//                   </span>
//                 )}

//                 <h3 className="text-xl font-semibold mb-1">
//                   {p.name}
//                 </h3>

//                 <p className="text-sm text-gray-600 mb-1">
//                   {p.jobs}
//                 </p>

//                 <p className="text-lg font-bold mb-4">
//                   {p.price}
//                 </p>

//                 <ul className="text-sm text-gray-600 space-y-2 mb-6">
//                   {p.features.map((f, idx) => (
//                     <li key={idx} className="flex gap-2">
//                       <span className="text-green-600">✔</span>
//                       {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   onClick={() =>
//                     alert(
//                       "Please contact admin to change your subscription plan."
//                     )
//                   }
//                   className={`w-full py-2 rounded-lg text-sm font-medium transition
//                     ${
//                       isCurrent
//                         ? "bg-gray-300 text-gray-700"
//                         : "bg-indigo-600 text-white hover:bg-indigo-700"
//                     }
//                   `}
//                 >
//                   {isCurrent ? "Active Plan" : "Request Upgrade"}
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* INFO */}
//         <div className="mt-10 bg-white border rounded-xl p-6">
//           <h3 className="font-semibold mb-2">
//             Billing & Subscription Notes
//           </h3>
//           <ul className="text-sm text-gray-600 space-y-2">
//             <li>• Plans are managed by platform admin</li>
//             <li>• Higher plans get faster approvals</li>
//             <li>• Premium employers get better visibility</li>
//             <li>• Billing handled manually or via admin</li>
//           </ul>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }







// import { useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";

// export default function EmployerSubscription() {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout>
//         <div className="bg-white p-6 rounded shadow">
//           Access denied.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const plan = currentUser.plan || "FREE";

//   const plans = [
//     {
//       name: "FREE",
//       price: "₹0",
//       jobs: "1 Active Job",
//       features: [
//         "Post 1 job only",
//         "Limited applicants access",
//         "Email notifications",
//       ],
//     },
//     {
//       name: "BASIC",
//       price: "Admin Assigned",
//       jobs: "5 Active Jobs",
//       features: [
//         "Post up to 5 jobs",
//         "View applicant profiles",
//         "Priority job approval",
//       ],
//     },
//     {
//       name: "PREMIUM",
//       price: "Admin Assigned",
//       jobs: "10 Active Jobs",
//       features: [
//         "Post up to 10 jobs",
//         "Full applicant access",
//         "Featured employer profile",
//         "Priority support",
//       ],
//     },
//   ];

//   const handlePlanClick = (planName) => {
//     setSelectedPlan(planName);
//   };

//   return (
//     <DashboardLayout title="Subscription">
//       <div className="max-w-6xl mx-auto">
//         {/* HEADING */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
//             Subscription & Billing Overview
//           </h2>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage your plan, limits and platform access
//           </p>
//         </div>

//         {/* CURRENT PLAN INFO */}
//         <div className="bg-slate-50 border border-slate-200 text-slate-700 p-6 rounded-xl mb-8">
//           <h3 className="text-xl font-semibold">
//             Current Plan: <span className="text-slate-800">{plan}</span>
//           </h3>
//           <p className="text-sm text-slate-500 mt-1">
//             Upgrade to unlock more hiring power 🚀
//           </p>
//         </div>

//         {/* PLANS */}
//         <div className="grid md:grid-cols-3 gap-6">
//           {plans.map((p) => {
//             const isCurrent = plan === p.name;
//             const isSelected = selectedPlan === p.name;

//             return (
//               <div
//                 key={p.name}
//                 onClick={() => handlePlanClick(p.name)}
//                 className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300
//                   hover:shadow-lg hover:-translate-y-1
//                   ${
//                     isCurrent
//                       ? "border-blue-300 bg-blue-50"
//                       : isSelected
//                       ? "border-indigo-200 bg-indigo-50"
//                       : "bg-white border-slate-200 hover:border-slate-300"
//                   }
//                 `}
//               >
//                 {isCurrent && (
//                   <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
//                     Current Plan
//                   </span>
//                 )}

//                 <h3 className="text-xl font-semibold mb-1 text-slate-800">
//                   {p.name}
//                 </h3>

//                 <p className="text-sm text-slate-500 mb-1">{p.jobs}</p>

//                 <p className="text-lg font-bold mb-4 text-slate-700">
//                   {p.price}
//                 </p>

//                 <ul className="text-sm text-slate-600 space-y-2 mb-6">
//                   {p.features.map((f, idx) => (
//                     <li key={idx} className="flex gap-2 items-start">
//                       <span className="text-emerald-500">✔</span>
//                       {f}
//                     </li>
//                   ))}
//                 </ul>

//                 <button
//                   onClick={() =>
//                     alert(
//                       "Please contact admin to change your subscription plan."
//                     )
//                   }
//                   className={`w-full py-2 rounded-lg text-sm font-medium transition
//                     ${
//                       isCurrent
//                         ? "bg-slate-200 text-slate-600 cursor-not-allowed"
//                         : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                     }
//                   `}
//                 >
//                   {isCurrent ? "Active Plan" : "Request Upgrade"}
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* INFO */}
//         <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6">
//           <h3 className="font-semibold mb-2 text-slate-800">
//             Billing & Subscription Notes
//           </h3>
//           <ul className="text-sm text-slate-600 space-y-2">
//             <li>• Plans are managed by platform admin</li>
//             <li>• Higher plans get faster approvals</li>
//             <li>• Premium employers get better visibility</li>
//             <li>• Billing handled manually or via admin</li>
//           </ul>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }
















import { useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function EmployerSubscription() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (!currentUser || currentUser.role !== "employer") {
    return (
      <DashboardLayout>
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const plan = currentUser.plan || "FREE";

  const plans = [
    {
      name: "FREE",
      price: "₹0",
      jobs: "1 Active Job",
      features: [
        "Post 1 job only",
        "Limited applicants access",
        "Email notifications",
      ],
    },
    {
      name: "BASIC",
      price: "Admin Assigned",
      jobs: "5 Active Jobs",
      features: [
        "Post up to 5 jobs",
        "View applicant profiles",
        "Priority job approval",
      ],
    },
    {
      name: "PREMIUM",
      price: "Admin Assigned",
      jobs: "10 Active Jobs",
      features: [
        "Post up to 10 jobs",
        "Full applicant access",
        "Featured employer profile",
        "Priority support",
      ],
    },
  ];

  const handlePlanClick = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <DashboardLayout title="Subscription">
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Subscription & Billing Overview
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your plan, limits and platform access
          </p>
        </div>

        {/* CURRENT PLAN INFO */}
        <div className="bg-gradient-to-r from-[#7a0054] via-[#9c005e] to-[#d1004f] text-white p-6 rounded-xl mb-8">
          <h3 className="text-xl font-semibold">
            Current Plan: <span className="text-white">{plan}</span>
          </h3>
          <p className="text-sm text-white/90 mt-1">
            Upgrade to unlock more hiring power 🚀
          </p>
        </div>

        {/* PLANS */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => {
            const isCurrent = plan === p.name;
            const isSelected = selectedPlan === p.name;

            return (
              <div
                key={p.name}
                onClick={() => handlePlanClick(p.name)}
                className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300
                  hover:shadow-lg hover:-translate-y-1
                  ${
                    isCurrent
                      ? "border-blue-300 bg-blue-50"
                      : isSelected
                      ? "border-indigo-200 bg-indigo-50"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }
                `}
              >
                {isCurrent && (
                  <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                    Current Plan
                  </span>
                )}

                <h3 className="text-xl font-semibold mb-1 text-slate-800">
                  {p.name}
                </h3>

                <p className="text-sm text-slate-500 mb-1">{p.jobs}</p>

                <p className="text-lg font-bold mb-4 text-slate-700">
                  {p.price}
                </p>

                <ul className="text-sm text-slate-600 space-y-2 mb-6">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-emerald-500">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    alert(
                      "Please contact admin to change your subscription plan."
                    )
                  }
                  className={`w-full py-2 rounded-lg text-sm font-medium transition text-white
                    ${
                      isCurrent
                        ? "bg-[#9C005E]/70 cursor-not-allowed"
                        : "bg-[#9C005E] hover:bg-[#7f004c]"
                    }
                  `}
                >
                  {isCurrent ? "Active Plan" : "Request Upgrade"}
                </button>
              </div>
            );
          })}
        </div>

        {/* INFO */}
        <div className="mt-10 bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-semibold mb-2 text-slate-800">
            Billing & Subscription Notes
          </h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• Plans are managed by platform admin</li>
            <li>• Higher plans get faster approvals</li>
            <li>• Premium employers get better visibility</li>
            <li>• Billing handled manually or via admin</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}

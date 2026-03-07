// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";
// import { isJobSaved, toggleSaveJob } from "../../utils/jobBookmarks";

// export default function JobCard({ job }) {
//   const navigate = useNavigate();
//   const { user } = useCurrentUser();
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     if (user?.id && job?.id) {
//       setSaved(isJobSaved(user.id, job.id));
//     }
//   }, [user, job?.id]);

//   const handleSave = (e) => {
//     e.stopPropagation();
//     toggleSaveJob(user.id, job.id);
//     setSaved((prev) => !prev);
//   };

//   return (
//     <div
//       onClick={() => navigate(`/jobs/${job.id}`)}
//       className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition cursor-pointer space-y-4"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-semibold">
//             {job.title}
//           </h3>
//           <p className="text-sm text-gray-600">
//             {job.companyName}
//           </p>
//         </div>

//         {user && (
//           <button
//             onClick={handleSave}
//             className={`text-sm ${
//               saved ? "text-blue-600" : "text-gray-400"
//             }`}
//           >
//             {saved ? "Saved" : "Save"}
//           </button>
//         )}
//       </div>

//       {/* Meta */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
//         <Meta
//           label="Experience"
//           value={job.experience || "-"}
//         />
//         <Meta
//           label="Salary"
//           value={
//             job.salaryFrom && job.salaryTo
//               ? `${job.salaryFrom} - ${job.salaryTo}`
//               : "-"
//           }
//         />
//         <Meta
//           label="Work Mode"
//           value={job.workMode || "-"}
//         />
//         <Meta
//           label="Location"
//           value={job.location || "-"}
//         />
//       </div>

//       {/* Short Description */}
//       {job.shortDescription && (
//         <p className="text-sm text-gray-600 line-clamp-2">
//           {job.shortDescription}
//         </p>
//       )}
//     </div>
//   );
// }

// function Meta({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500">
//         {label}
//       </p>
//       <p className="font-medium">
//         {value}
//       </p>
//     </div>
//   );
// }
















// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";

// export default function JobCard({ job }) {
//   const navigate = useNavigate();
//   const { user } = useCurrentUser();
//   const [saved, setSaved] = useState(false);

//   /* ================= CHECK IF SAVED ================= */

//   useEffect(() => {
//     const checkSaved = async () => {
//       if (!user?.id || !job?.id) return;

//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch(
//           "http://localhost:5000/api/saved-jobs",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const data = await res.json();

//         if (data.success) {
//           const isSaved = data.savedJobs?.some(
//             (s) => s.job_id === job.id
//           );
//           setSaved(isSaved);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     checkSaved();
//   }, [user, job?.id]);

//   /* ================= SAVE / UNSAVE ================= */

//   const handleSave = async (e) => {
//     e.stopPropagation();

//     if (!user) return;

//     try {
//       const token = localStorage.getItem("token");

//       if (!saved) {
//         // SAVE
//         await fetch(
//           `http://localhost:5000/api/saved-jobs/${job.id}`,
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setSaved(true);
//       } else {
//         // UNSAVE
//         await fetch(
//           `http://localhost:5000/api/saved-jobs/${job.id}`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setSaved(false);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div
//       onClick={() => navigate(`/jobs/${job.id}`)}
//       className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition cursor-pointer space-y-4"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-lg font-semibold">
//             {job.title}
//           </h3>

//           {/* ✅ FIXED: backend field */}
//           <p className="text-sm text-gray-600">
//             {job.about_company || "Company"}
//           </p>
//         </div>

//         {user && (
//           <button
//             onClick={handleSave}
//             className={`text-sm ${
//               saved ? "text-blue-600" : "text-gray-400"
//             }`}
//           >
//             {saved ? "Saved" : "Save"}
//           </button>
//         )}
//       </div>

//       {/* Meta */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
//         <Meta label="Experience" value={job.experience || "-"} />

//         <Meta
//           label="Salary"
//           value={
//             job.salary_from && job.salary_to
//               ? `${job.salary_from} - ${job.salary_to}`
//               : "-"
//           }
//         />

//         {/* ✅ FIXED: backend field */}
//         <Meta label="Work Mode" value={job.work_mode || "-"} />

//         <Meta label="Location" value={job.location || "-"} />
//       </div>

//       {job.description && (
//         <p className="text-sm text-gray-600 line-clamp-2">
//           {job.description}
//         </p>
//       )}
//     </div>
//   );
// }

// function Meta({ label, value }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="font-medium">{value}</p>
//     </div>
//   );
// }




















import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../../app/auth/useCurrentUser";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (!user?.id || !job?.id) return;

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
  "http://localhost:5000/api/saved-jobs",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

/* 🔐 AUTO LOGOUT CHECK */
if (res.status === 401) {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
  return;
}

        const data = await res.json();

        if (data.success) {
          const isSaved = data.savedJobs?.some(
            (s) => s.job_id === job.id
          );
          setSaved(isSaved);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkSaved();
  }, [user, job?.id]);

  const handleSave = async (e) => {
    e.stopPropagation();

    if (!user) return;

    try {
      const token = localStorage.getItem("token");

      if (!saved) {
        await fetch(
          `http://localhost:5000/api/saved-jobs/${job.id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSaved(true);
      } else {
        await fetch(
          `http://localhost:5000/api/saved-jobs/${job.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="border rounded-lg p-4 md:p-5 bg-white shadow-sm hover:shadow-md transition cursor-pointer space-y-4"
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-base md:text-lg font-semibold">
            {job.title}
          </h3>

          <p className="text-sm text-gray-600">
            {job.about_company || "Company"}
          </p>
        </div>

        {user && (
          <button
            onClick={handleSave}
            className={`text-xs md:text-sm ${
              saved ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <Meta label="Experience" value={job.experience || "-"} />

        <Meta
          label="Salary"
          value={
            job.salary_from && job.salary_to
              ? `${job.salary_from} - ${job.salary_to}`
              : "-"
          }
        />

        <Meta label="Work Mode" value={job.work_mode || "-"} />

        <Meta label="Location" value={job.location || "-"} />
      </div>

      {job.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      )}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
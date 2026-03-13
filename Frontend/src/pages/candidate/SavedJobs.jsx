// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";
// // import { getSavedJobs } from "../../utils/jobBookmarks";
// import JobCard from "../../components/jobs/JobCard";

// export default function SavedJobs() {
//   const { user } = useCurrentUser();

//   /* ---------- HARD GUARD ---------- */
//   if (!user || !user.id) {
//     return (
//       <DashboardLayout title="Saved Jobs">
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   // const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   // const saved = getSavedJobs(user.id) || [];

//   // const savedJobs = jobs.filter(
//   //   (job) =>
//   //     job &&
//   //     job.id &&
//   //     saved.some(
//   //       (s) => s && s.jobId === job.id
//   //     )
//   // );

//   return (
//     <DashboardLayout title="Saved Jobs">
//       {savedJobs.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           No saved jobs yet. Browse jobs and save the ones you like.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {savedJobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }












// import { useEffect, useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";
// import JobCard from "../../components/jobs/JobCard";

// export default function SavedJobs() {
//   const { user } = useCurrentUser();
//   const [savedJobs, setSavedJobs] = useState([]);

//   if (!user || !user.id) {
//     return (
//       <DashboardLayout title="Saved Jobs">
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
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
//           setSavedJobs(data.jobs);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchSavedJobs();
//   }, []);

//   return (
//     <DashboardLayout title="Saved Jobs">
//       {savedJobs.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           No saved jobs yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {savedJobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }












// import { useEffect, useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";
// import JobCard from "../../components/jobs/JobCard";

// export default function SavedJobs() {
//   const { user } = useCurrentUser();
//   const [savedJobs, setSavedJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ================= AUTH GUARD ================= */

//   if (!user || !user.id) {
//     return (
//       <DashboardLayout title="Saved Jobs">
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   /* ================= FETCH SAVED JOBS ================= */

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
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
//           setSavedJobs(data.Jobs); // ✅ important fix
//         }
//       } catch (err) {
//         console.log("Saved jobs fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSavedJobs();
//   }, []);

//   /* ================= RENDER ================= */

//   return (
//     <DashboardLayout title="Saved Jobs">
//       {loading ? (
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           Loading...
//         </div>
//       ) : savedJobs.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-gray-600">
//           No saved jobs yet.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {savedJobs.map((job) => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>
//       )}
//     </DashboardLayout>
//   );
// }






















import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";
import JobCard from "../../components/jobs/JobCard";

export default function SavedJobs() {
  const { user } = useCurrentUser();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!user || !user.id) {
    return (
      <DashboardLayout title="Saved Jobs">
        <div className="bg-white p-6 rounded shadow text-gray-600">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    const fetchSavedJobs = async () => {
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

        const data = await res.json();

        if (data.success) {
          // 🔥 HANDLE BOTH POSSIBILITIES
          setSavedJobs(data.savedJobs || data.jobs || []);
        }
      } catch (err) {
        console.log("Saved jobs fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <DashboardLayout title="Saved Jobs">
      {loading ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">
          Loading...
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-600">
          No saved jobs yet.
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

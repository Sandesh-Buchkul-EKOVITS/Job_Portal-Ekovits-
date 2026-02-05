// import { useLocation, useNavigate } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { getCandidateProfile } from "../../app/services/profileService";

// export default function ViewApplicants() {
//   const navigate = useNavigate();
//   const query = new URLSearchParams(useLocation().search);
//   const jobId = query.get("jobId");

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const applications =
//     JSON.parse(localStorage.getItem("applications")) || [];

//   // const job = jobs.find((j) => j.id === jobId);

//   // const jobApplications = applications.filter(
//   //   (a) => a.jobId === jobId
//   // );


//   const job = jobs.find(
//   (j) => String(j.id) === String(jobId)
// );

// const jobApplications = applications.filter(
//   (a) => String(a.jobId) === String(jobId)
// );


//   const updateStatus = (appId, status) => {
//     const updated = applications.map((a) =>
//       a.id === appId ? { ...a, status } : a
//     );
//     localStorage.setItem(
//       "applications",
//       JSON.stringify(updated)
//     );
//     window.location.reload();
//   };

//   if (!job) {
//     return (
//       <DashboardLayout title="Applicants">
//         <div className="bg-white p-6 rounded shadow">
//           Job not found.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout title="Applicants">
//       <div className="max-w-5xl mx-auto space-y-4">

//         {/* JOB HEADER */}
//         <div className="bg-white p-5 rounded shadow">
//           <h2 className="text-lg font-semibold">{job.title}</h2>
//           <p className="text-sm text-gray-600">
//             {job.companyName}
//           </p>
//         </div>

//         {jobApplications.length === 0 ? (
//           <div className="bg-white p-6 rounded shadow">
//             No applicants yet.
//           </div>
//         ) : (
//           jobApplications.map((app) => {
//             const profile = getCandidateProfile(app.userId);

//             return (
//               <div
//                 key={app.id}
//                 className="bg-white p-5 rounded shadow"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold">
//                       {profile?.name || "Candidate"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Applied on{" "}
//                       {new Date(
//                         app.appliedAt
//                       ).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <span className="text-sm capitalize text-blue-600">
//                     {app.status}
//                   </span>
//                 </div>

//                 <div className="flex gap-4 mt-4 text-sm">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         `/employer/candidate/${app.userId}`
//                       )
//                     }
//                     className="text-blue-600 hover:underline"
//                   >
//                     View Profile
//                   </button>

//                   {app.status !== "shortlisted" && (
//                     <button
//                       onClick={() =>
//                         updateStatus(app.id, "shortlisted")
//                       }
//                       className="text-green-600 hover:underline"
//                     >
//                       Shortlist
//                     </button>
//                   )}

//                   {app.status !== "rejected" && (
//                     <button
//                       onClick={() =>
//                         updateStatus(app.id, "rejected")
//                       }
//                       className="text-red-600 hover:underline"
//                     >
//                       Reject
//                     </button>
//                   )}
//                 </div>
//               </div>
//             );
//           })
//         )}

//         {/* BACK */}
//         <button
//           onClick={() => navigate("/employer/my-jobs")}
//           className="text-sm text-blue-600 underline"
//         >
//           ← Back to My Jobs
//         </button>
//       </div>
//     </DashboardLayout>
//   );
// }










import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getCandidateProfile } from "../../app/services/profileService";

export default function ViewApplicants() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const job = jobs.find(
    (j) => String(j.id) === String(jobId)
  );

  const jobApplications = applications.filter(
    (a) => String(a.jobId) === String(jobId)
  );

  const updateStatus = (appId, status) => {
    const updated = applications.map((a) =>
      a.id === appId ? { ...a, status } : a
    );
    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );
    window.location.reload();
  };

  if (!job) {
    return (
      <DashboardLayout title="Applicants">
        <div className="bg-white p-6 rounded shadow">
          Job not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Applicants">
      <div className="max-w-5xl mx-auto space-y-4">

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p className="text-sm text-gray-600">
            {job.companyName}
          </p>
        </div>

        {jobApplications.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No applicants yet.
          </div>
        ) : (
          jobApplications.map((app) => {
            const profile = getCandidateProfile(app.userId);

            return (
              <div
                key={app.id}
                className="bg-white p-5 rounded shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">
                      {profile?.name || "Candidate"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Applied on{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="text-sm capitalize text-blue-600">
                    {app.status}
                  </span>
                </div>

                <div className="flex gap-4 mt-4 text-sm">
                  <button
                    onClick={() =>
                      navigate(`/employer/candidate/${app.userId}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </button>

                  {app.status !== "shortlisted" && (
                    <button
                      onClick={() =>
                        updateStatus(app.id, "shortlisted")
                      }
                      className="text-green-600 hover:underline"
                    >
                      Shortlist
                    </button>
                  )}

                  {app.status !== "rejected" && (
                    <button
                      onClick={() =>
                        updateStatus(app.id, "rejected")
                      }
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* <button
          onClick={() => navigate("/employer/my-jobs")}
          className="text-sm text-blue-600 underline"
        >
          ← Back to My Jobs
        </button> */}


       <button
  onClick={() => navigate("/employer/my-jobs")}
  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#7A004B] to-[#CC0047] 
             text-white px-4 py-2 rounded-lg text-sm font-medium 
             hover:opacity-90 transition shadow"
>
  ← Back to My Jobs
</button>


      </div>
    </DashboardLayout>
  );
}

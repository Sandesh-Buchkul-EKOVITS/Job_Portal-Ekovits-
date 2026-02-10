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
import { useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { getCandidateProfile } from "../../app/services/profileService";
import { useCurrentUser } from "../../app/auth/useCurrentUser";


export default function ViewApplicants() {
  // 🔍 FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("all");


const { user } = useCurrentUser();

  const navigate = useNavigate();
  const { jobId } = useParams();

  // const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];

// ✅ Sirf employer ki company ke jobs
const jobs = allJobs.filter(
  (job) => job.employerId === user?.id
);

  // const applications =
  //   JSON.parse(localStorage.getItem("applications")) || [];
  const allApplications =
  JSON.parse(localStorage.getItem("applications")) || [];

// ✅ Sirf employer ke jobs ke applications
const applications = allApplications.filter((app) =>
  jobs.some((job) => String(job.id) === String(app.jobId))
);



  const job = jobs.find(
    (j) => String(j.id) === String(jobId)
  );

  const jobApplications = applications.filter(
    (a) => String(a.jobId) === String(jobId)
  );

  // 🔥 NEW filter ke liye last 7 days
const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 7);



  //// addd onnn
  // 🔥 Sirf wahi jobs jinpe applicants aaye hain
// const appliedJobIds = [
//   ...new Set(applications.map((a) => String(a.jobId))),
// ];

// const appliedJobs = jobs.filter((job) =>
//   appliedJobIds.includes(String(job.id))
// );






// ✅ Sirf current employer ki jobs jinpe applicants aaye hain
// ✅ Sirf current employer ki jobs jinpe applicants aaye hain
const employerJobs = jobs.filter(
  (job) => String(job.employerId) === String(user?.id)
);

const employerJobIds = employerJobs.map((job) => String(job.id));

const appliedJobs = employerJobs.filter((job) =>
  applications.some(
    (app) => String(app.jobId) === String(job.id)
  )
);



  // 🔎 FILTERED APPLICATIONS

// const filteredApplications = (jobId ? jobApplications : applications)
//   .filter((app) => {
//     const appliedJob = jobs.find(
//       (j) => String(j.id) === String(app.jobId)
//     );

//     const matchesSearch =
//       !searchText ||
//       appliedJob?.title
//         ?.toLowerCase()
//         .includes(searchText.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" ||
//       statusFilter === "new" ||
//       app.status === statusFilter;

//     return matchesSearch && matchesStatus;
//   })
//   .sort((a, b) => {
//     // ✅ NEW = recent applicants first
//     if (statusFilter === "new") {
//       return new Date(b.appliedAt) - new Date(a.appliedAt);
//     }
//     return 0;
//   });





// const filteredApplications = (jobId ? jobApplications : applications)
//   .filter((app) => {
//     // 🔹 Job dropdown filter
//     if (
//       selectedJobId !== "all" &&
//       String(app.jobId) !== String(selectedJobId)
//     ) {
//       return false;
//     }

//     // 🔹 NEW = last 7 days applicants
//     if (statusFilter === "new") {
//       return new Date(app.appliedAt) >= last7Days;
//     }

//     // 🔹 Normal status filter
//     if (statusFilter !== "all" && app.status !== statusFilter) {
//       return false;
//     }

//     return true;
//   })
//   .sort((a, b) => {
//     // 🔥 NEW me recent applicants upar
//     if (statusFilter === "new") {
//       return new Date(b.appliedAt) - new Date(a.appliedAt);
//     }
//     return 0;
//   });



const filteredApplications = (jobId ? jobApplications : applications)
  .filter((app) => {
    // 🔹 Job dropdown filter
    if (
      selectedJobId !== "all" &&
      String(app.jobId) !== String(selectedJobId)
    ) {
      return false;
    }

    // 🔹 Normal status filter (NEW ko chhod ke)
    if (
      statusFilter !== "all" &&
      statusFilter !== "new" &&
      app.status !== statusFilter
    ) {
      return false;
    }

    return true; // ❗ koi applicant hide nahi hoga
  })
  .sort((a, b) => {
    // 🔥 NEW = recent applicants upar
    if (statusFilter === "new") {
      return new Date(b.appliedAt) - new Date(a.appliedAt);
    }
    return 0; // baaki sab me order same
  });








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



  // its testion code for applicants page 
  // ✅ CASE 1: Dashboard se Applicants open hua (no jobId)
  if (!jobId) {
    return (
      <DashboardLayout title="All Applicants">
        <div className="max-w-5xl mx-auto space-y-4">




          {/* 🔍 Filters */}
          <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-3">
            {/* <input
  type="text"
  placeholder="Search by Job Title (e.g. React Developer)"
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onFocus={() => setShowDropdown(true)}
  className="border p-2 rounded w-full"
 /> */}



             <select
  value={selectedJobId}
  onChange={(e) => setSelectedJobId(e.target.value)}
  className="border p-2 rounded w-full md:w-1/2 bg-white"
>
  <option value="all">All Jobs</option>

  {appliedJobs.map((job) => (
    <option key={job.id} value={job.id}>
      {job.title} • {job.location || "NA"} •{" "}
      {job.createdAt
        ? new Date(job.createdAt).toLocaleDateString()
        : ""}
    </option>
  ))}
</select> 


            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4 bg-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
  onClick={() => {
    setSearchText("");
  setStatusFilter("all");
  setSelectedJobId("all");
  }}
  className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
>
  Clear All
</button>

          </div>











          {applications.length === 0 ? (
            <div className="bg-white p-6 rounded shadow">
              No applicants yet.
            </div>
          ) : (

            filteredApplications.map((app) => {
              const profile = getCandidateProfile(app.userId);
              const appliedJob = jobs.find(
                (j) => String(j.id) === String(app.jobId)
              );

              return (
                <div
                  key={app.id}
                  className="bg-white p-5 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">
                      {profile?.name || "Candidate"}
                    </p>
                    {/* <p className="text-sm text-gray-600">
                      {appliedJob?.title} • {appliedJob?.companyName}
                    </p> */}
                   

                   <p className="text-sm text-gray-600 flex items-center gap-3">
  <span>
    {appliedJob?.title} • {appliedJob?.companyName}
  </span>

  {/* Shortlist */}
  {app.status !== "shortlisted" && (
    <button
      onClick={() => updateStatus(app.id, "shortlisted")}
      className="text-green-600 hover:underline text-xs"
    >
      Shortlist
    </button>
  )}

  {/* Reject */}
  {app.status !== "rejected" && (
    <button
      onClick={() => updateStatus(app.id, "rejected")}
      className="text-red-600 hover:underline text-xs"
    >
      Reject
    </button>
  )}
</p>





                  </div>

                  <button
                    onClick={() =>
                      navigate(`/employer/candidate/${app.userId}`)
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Profile
                  </button>
                </div>
              );
            })
          )}
        </div>
      </DashboardLayout>
    );
  }









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

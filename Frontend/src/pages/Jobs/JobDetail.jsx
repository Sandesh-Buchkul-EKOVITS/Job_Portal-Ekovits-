// import { useParams, useNavigate } from "react-router-dom";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";

// export default function JobDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useCurrentUser();

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const applications =
//     JSON.parse(localStorage.getItem("applications")) || [];

//   const job = jobs.find((j) => j.id === id);

//   if (!job) {
//     return (
//       <DashboardLayout title="Job Details">
//         <div className="bg-white p-6 rounded shadow">
//           Job not found.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const application =
//     user?.role === "candidate"
//       ? applications.find(
//           (a) => a.jobId === id && a.userId === user.id
//         )
//       : null;

//   const statusColor = (status) => {
//     if (status === "shortlisted") return "text-green-600";
//     if (status === "rejected") return "text-red-600";
//     return "text-blue-600";
//   };

//   return (
//     <DashboardLayout title="Job Details">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* HEADER */}
//         <div className="bg-white p-6 rounded shadow">
//           <h1 className="text-2xl font-semibold">
//             {job.title}
//           </h1>
//           <p className="text-gray-600">
//             {job.companyName}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {job.location} • {job.workMode}
//           </p>
//         </div>

//         {/* META DETAILS (ABOVE APPLY) */}
//         <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6 text-sm">
//           <div>
//             <strong>Experience:</strong>{" "}
//             {job.experience}
//           </div>
//           <div>
//             <strong>Salary:</strong>{" "}
//             {job.salaryFrom} – {job.salaryTo}
//           </div>
//           <div>
//             <strong>Industry:</strong>{" "}
//             {job.industry}
//           </div>
//           <div>
//             <strong>Skills:</strong>{" "}
//             {job.skills?.join(", ") || "-"}
//           </div>
//         </div>

//         {/* APPLY / STATUS SECTION */}
//         {user?.role === "candidate" && (
//           <div className="bg-white p-6 rounded shadow">
//             {application ? (
//               <div className="space-y-1">
//                 <p
//                   className={`font-medium ${statusColor(
//                     application.status
//                   )}`}
//                 >
//                   You have already applied for this job
//                 </p>
//                 <p
//                   className={`text-sm capitalize ${statusColor(
//                     application.status
//                   )}`}
//                 >
//                   Status: {application.status}
//                 </p>
//               </div>
//             ) : (
//               <button
//                 onClick={() =>
//                   navigate(`/candidate/apply/${job.id}`)
//                 }
//                 className="bg-blue-600 text-white px-6 py-2 rounded"
//               >
//                 Apply Now
//               </button>
//             )}
//           </div>
//         )}

//         {/* DESCRIPTION */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="font-semibold mb-2">
//             Job Description
//           </h2>
//           <div
//             className="text-sm leading-relaxed"
//             dangerouslySetInnerHTML={{
//               __html: job.description,
//             }}
//           />
//         </div>

//       </div>
//     </DashboardLayout>
//   );
// }


















import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";

export default function JobDetail() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { user } = useCurrentUser();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const job = jobs.find((j) => j.id === id);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [totalApplications, setTotalApplications] = useState(0);


  if (!job) {
    return (
      <DashboardLayout title="Job Details">
        <div className="bg-white p-6 rounded shadow">
          Job not found.
        </div>
      </DashboardLayout>
    );
  }

  const application =
    user?.role === "candidate"
      ? applications.find(
        (a) => a.jobId === id && a.userId === user.id
      )
      : null;

  useEffect(() => {
    if (!user || user.role !== "candidate") return;

    const apps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const jobApplications = apps.filter(
      (a) => a.jobId === id
    );

    setTotalApplications(jobApplications.length);

    if (jobApplications.length >= 50) {
      setIsLimitReached(true);
    }

    const existing = apps.find(
      (a) => a.jobId === id && a.userId === user.id
    );

    if (existing) {
      setAlreadyApplied(true);
      setApplicationStatus(existing.status);
    }
  }, [id, user]);


  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };


  const applyJob = () => {
    if (alreadyApplied || isLimitReached) return;

    const apps =
      JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      id: Date.now().toString(),
      jobId: id,
      userId: user.id,
      employerId: job.employerId,
      status: "applied",
      appliedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "applications",
      JSON.stringify([...apps, newApplication])
    );

    setAlreadyApplied(true);
    setApplicationStatus("applied");
  };


  return (
    <DashboardLayout title="Job Details">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-semibold">
            {job.title}
          </h1>
          <p className="text-gray-600">
            {job.companyName}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {job.location} • {job.workMode}
          </p>
        </div>

        {/* META DETAILS (ABOVE APPLY) */}
        <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <strong>Experience:</strong>{" "}
            {job.experience}
          </div>
          <div>
            <strong>Salary:</strong>{" "}
            {job.salaryFrom} – {job.salaryTo}
          </div>
          <div>
            <strong>Industry:</strong>{" "}
            {job.industry}
          </div>
          <div>
            <strong>Skills:</strong>{" "}
            {job.skills?.join(", ") || "-"}
          </div>
        </div>

        {/* APPLY / STATUS SECTION */}
        {user?.role === "candidate" && (
          <div className="bg-white p-6 rounded shadow">
            {application ? (
              <div className="space-y-1">
                <p
                  className={`font-medium ${statusColor(
                    application.status
                  )}`}
                >
                  You have already applied for this job
                </p>
                <p
                  className={`text-sm capitalize ${statusColor(
                    application.status
                  )}`}
                >
                  Status: {application.status}
                </p>
              </div>
              //             ) : (
              //               {isLimitReached && !alreadyApplied ? (
              //   <p className="text-sm font-medium text-red-600 mb-3">
              //     Application limit reached for this job
              //   </p>
              // ) : null}

              //              <button
              //   onClick={applyJob}
              //   disabled={alreadyApplied || isLimitReached}
              //   className={`px-6 py-2 rounded text-white font-medium transition ${
              //     alreadyApplied || isLimitReached
              //       ? "bg-gray-400 cursor-not-allowed"
              //       : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-90"
              //   }`}
              // >
              //   {alreadyApplied
              //     ? "Already Applied"
              //     : isLimitReached
              //     ? "Applications Closed"
              //     : "Apply Now"}
              // </button>
            ) : (
              <>
                {isLimitReached && !alreadyApplied && (
                  <p className="text-sm font-medium text-red-600 mb-3">
                    Application limit reached for this job
                  </p>
                )}

                <button
                  onClick={applyJob}
                  disabled={alreadyApplied || isLimitReached}
                  className={`px-6 py-2 rounded text-white font-medium transition ${alreadyApplied || isLimitReached
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-90"
                    }`}
                >
                  {alreadyApplied
                    ? "Already Applied"
                    : isLimitReached
                      ? "Applications Closed"
                      : "Apply Now"}
                </button>
              </>
            )


            }
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-2">
            Job Description
          </h2>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: job.description,
            }}
          />
        </div>

      </div>
    </DashboardLayout>
  );
}

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";

// export default function ApplyJob() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useCurrentUser();

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const job = jobs.find((j) => j.id === id);

//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState("");

//   useEffect(() => {
//     if (!user) return;

//     const applications =
//       JSON.parse(localStorage.getItem("applications")) || [];

//     const existing = applications.find(
//       (a) => a.jobId === id && a.userId === user.id
//     );

//     if (existing) {
//       setAlreadyApplied(true);
//       setApplicationStatus(existing.status);
//     }
//   }, [id, user]);

//   if (!job) {
//     return (
//       <DashboardLayout title="Apply Job">
//         <div className="bg-white p-6 rounded shadow">
//           Job not found.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const applyJob = () => {
//     if (alreadyApplied) return;

//     const applications =
//       JSON.parse(localStorage.getItem("applications")) || [];

//     const newApplication = {
//       id: Date.now().toString(),
//       jobId: id,
//       userId: user.id,
//       employerId: job.employerId,
//       status: "applied",
//       appliedAt: new Date().toISOString(),
//     };

//     localStorage.setItem(
//       "applications",
//       JSON.stringify([...applications, newApplication])
//     );

//     setAlreadyApplied(true);
//     setApplicationStatus("applied");

//     navigate("/candidate/applications");
//   };

//   const statusColor = (status) => {
//     if (status === "shortlisted") return "text-green-600";
//     if (status === "rejected") return "text-red-600";
//     return "text-blue-600";
//   };

//   return (
//     <DashboardLayout title="Apply Job">
//       <div className="bg-white p-6 rounded shadow space-y-4 max-w-3xl mx-auto">

//         <h2 className="text-xl font-semibold">{job.title}</h2>
//         <p className="text-gray-600">{job.companyName}</p>

//         {alreadyApplied && (
//           <div
//             className={`text-sm font-medium capitalize ${statusColor(
//               applicationStatus
//             )}`}
//           >
//             You have already applied for this job
//             {applicationStatus && ` • Status: ${applicationStatus}`}
//           </div>
//         )}

//         <button
//           onClick={applyJob}
//           disabled={alreadyApplied}
//           className={`px-6 py-2 rounded text-white ${
//             alreadyApplied
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {alreadyApplied ? "Already Applied" : "Confirm & Apply"}
//         </button>

//       </div>
//     </DashboardLayout>
//   );
// }







import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useCurrentUser } from "../../app/auth/useCurrentUser";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs.find((j) => j.id === id);

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    if (!user) return;

    const applications =
      JSON.parse(localStorage.getItem("applications")) || [];

    // ✅ count total applications for this job
    const jobApplications = applications.filter(
      (a) => a.jobId === id
    );

    setTotalApplications(jobApplications.length);

    if (jobApplications.length >= 50) {
      setIsLimitReached(true);
    }

    const existing = applications.find(
      (a) => a.jobId === id && a.userId === user.id
    );

    if (existing) {
      setAlreadyApplied(true);
      setApplicationStatus(existing.status);
    }
  }, [id, user]);

  if (!job) {
    return (
      <DashboardLayout title="Apply Job">
        <div className="bg-white p-6 rounded shadow">
          Job not found.
        </div>
      </DashboardLayout>
    );
  }









  // const applyJob = () => {
  //   if (alreadyApplied || isLimitReached) return;

  //   const applications =
  //     JSON.parse(localStorage.getItem("applications")) || [];

  //   const newApplication = {
  //     id: Date.now().toString(),
  //     jobId: id,
  //     userId: user.id,
  //     employerId: job.employerId,
  //     status: "applied",
  //     appliedAt: new Date().toISOString(),
  //   };

  //   localStorage.setItem(
  //     "applications",
  //     JSON.stringify([...applications, newApplication])
  //   );

  //   setAlreadyApplied(true);
  //   setApplicationStatus("applied");

  //   navigate("/candidate/applications");
  // };

  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <DashboardLayout title="Apply Job">
      <div className="bg-white p-6 rounded shadow space-y-4 max-w-3xl mx-auto">

        <h2 className="text-xl font-semibold">{job.title}</h2>
        <p className="text-gray-600">{job.companyName}</p>

        {/* ✅ Application count info */}
        <p className="text-sm text-gray-500">
          Applications: {totalApplications} / 50
        </p>

        {isLimitReached && !alreadyApplied && (
          <div className="text-sm font-medium text-red-600">
            Application limit reached for this job.
          </div>
        )}

        {alreadyApplied && (
          <div
            className={`text-sm font-medium capitalize ${statusColor(
              applicationStatus
            )}`}
          >
            You have already applied for this job
            {applicationStatus && ` • Status: ${applicationStatus}`}
          </div>
        )}

        {/* <button
          onClick={applyJob}
          disabled={alreadyApplied || isLimitReached}
          className={`px-6 py-2 rounded text-white ${
            alreadyApplied || isLimitReached
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {alreadyApplied
            ? "Already Applied"
            : isLimitReached
            ? "Applications Closed"
            : "Confirm & Apply"}
        </button> */}








<button
  onClick={applyJob}
  disabled={alreadyApplied || isLimitReached}
  className={`px-6 py-2 rounded text-white font-medium transition ${
    alreadyApplied || isLimitReached
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-90"
  }`}
>
  {alreadyApplied
    ? "Already Applied"
    : isLimitReached
    ? "Applications Closed"
    : "Confirm & Apply"}
</button>




      </div>
    </DashboardLayout>
  );
}





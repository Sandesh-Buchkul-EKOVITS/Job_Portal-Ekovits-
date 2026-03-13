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


















// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import { useCurrentUser } from "../../app/auth/useCurrentUser";

// export default function JobDetail() {
//   const { id } = useParams();
//   // const navigate = useNavigate();
//   const { user } = useCurrentUser();

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const applications =
//     JSON.parse(localStorage.getItem("applications")) || [];

//   const job = jobs.find((j) => j.id === id);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);
//   const [applicationStatus, setApplicationStatus] = useState("");
//   const [isLimitReached, setIsLimitReached] = useState(false);
//   const [totalApplications, setTotalApplications] = useState(0);


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
//         (a) => a.jobId === id && a.userId === user.id
//       )
//       : null;

//   useEffect(() => {
//     if (!user || user.role !== "candidate") return;

//     const apps =
//       JSON.parse(localStorage.getItem("applications")) || [];

//     const jobApplications = apps.filter(
//       (a) => a.jobId === id
//     );

//     setTotalApplications(jobApplications.length);

//     if (jobApplications.length >= 50) {
//       setIsLimitReached(true);
//     }

//     const existing = apps.find(
//       (a) => a.jobId === id && a.userId === user.id
//     );

//     if (existing) {
//       setAlreadyApplied(true);
//       setApplicationStatus(existing.status);
//     }
//   }, [id, user]);


//   const statusColor = (status) => {
//     if (status === "shortlisted") return "text-green-600";
//     if (status === "rejected") return "text-red-600";
//     return "text-blue-600";
//   };


//   const applyJob = () => {
//     if (alreadyApplied || isLimitReached) return;

//     const apps =
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
//       JSON.stringify([...apps, newApplication])
//     );

//     setAlreadyApplied(true);
//     setApplicationStatus("applied");
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
//               //             ) : (
//               //               {isLimitReached && !alreadyApplied ? (
//               //   <p className="text-sm font-medium text-red-600 mb-3">
//               //     Application limit reached for this job
//               //   </p>
//               // ) : null}

//               //              <button
//               //   onClick={applyJob}
//               //   disabled={alreadyApplied || isLimitReached}
//               //   className={`px-6 py-2 rounded text-white font-medium transition ${
//               //     alreadyApplied || isLimitReached
//               //       ? "bg-gray-400 cursor-not-allowed"
//               //       : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-90"
//               //   }`}
//               // >
//               //   {alreadyApplied
//               //     ? "Already Applied"
//               //     : isLimitReached
//               //     ? "Applications Closed"
//               //     : "Apply Now"}
//               // </button>
//             ) : (
//               <>
//                 {isLimitReached && !alreadyApplied && (
//                   <p className="text-sm font-medium text-red-600 mb-3">
//                     Application limit reached for this job
//                   </p>
//                 )}

//                 <button
//                   onClick={applyJob}
//                   disabled={alreadyApplied || isLimitReached}
//                   className={`px-6 py-2 rounded text-white font-medium transition ${alreadyApplied || isLimitReached
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-[#7A004B] to-[#CC0047] hover:opacity-90"
//                     }`}
//                 >
//                   {alreadyApplied
//                     ? "Already Applied"
//                     : isLimitReached
//                       ? "Applications Closed"
//                       : "Apply Now"}
//                 </button>
//               </>
//             )


//             }
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






















import { getCandidateProfile } from "../../app/services/profileService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem("currentUser"));
});
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("");
  const [totalApplications, setTotalApplications] = useState(0);

  /* ================= FETCH JOB ================= */

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        const data = await res.json();

        console.log("JOB API RESPONSE:", data);

        setJob(data.job || data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();
  }, [id]);

  /* ================= FETCH APPLICATION INFO ================= */

  useEffect(() => {
    fetchApplicationInfo();
  }, [id, user]);

  const fetchApplicationInfo = async () => {
    if (!user || user.role !== "candidate") return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/applications/job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setTotalApplications(data.total);

        if (data.alreadyApplied) {
          setAlreadyApplied(true);
          setApplicationStatus(data.status);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= APPLY JOB ================= */

  const applyJob = async () => {

  // USER NOT LOGGED IN
  if (!user) {
    navigate("/login", { state: { from: `/jobs/${id}` } });
    return;
  }

  // PROFILE FETCH
  let profile = null;

  try {
    profile = await getCandidateProfile();
  } catch (err) {
    console.log("Profile fetch error:", err);
  }

  // RESUME CHECK
  if (!profile || !profile.resume) {

    const confirmUpload = window.confirm(
      "Resume is required to apply for this job.\n\nClick OK to upload your resume."
    );

    if (confirmUpload) {
      navigate("/candidate/profile", {
        state: { from: `/jobs/${id}` }
      });
    }

    return;
  }

  // ALREADY APPLIED
  if (alreadyApplied) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/applications/apply/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Application failed");
      fetchApplicationInfo();
      return;
    }

    alert("Application submitted successfully");

    fetchApplicationInfo();

  } catch (err) {
    console.log(err);
  }
};

  const statusColor = (status) => {
    if (status === "shortlisted") return "text-green-600";
    if (status === "rejected") return "text-red-600";
    return "text-blue-600";
  };

  if (!job) {
    return (
      <DashboardLayout title="Job Details">
        <div className="bg-white p-6 rounded shadow">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Job Details">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded shadow flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-gray-600">{job.company_name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {job.location} • {job.work_mode}
            </p>
          </div>

          {/* BUTTON AREA */}
          <div>

            {/* USER NOT LOGGED IN */}
            {!user && (
              <div className="flex gap-3">
                <button
                 // onClick={() => navigate("/register")}
                 onClick={() => navigate("/register", { state: { from: `/jobs/${id}` } })}
                   className="px-3 py-2 border border-blue-500 text-blue-500 rounded-full font-medium hover:bg-blue-50 transition"
                >
                  Register to apply
                </button>

                <button
                  //onClick={() => navigate("/login")}
                  onClick={() => navigate("/login", { state: { from: `/jobs/${id}` } })}
                  style={{ background: "linear-gradient(90deg, #ff0066, #8000ff)" }}
  className="px-3 py-2 rounded-full text-white font-medium hover:opacity-90 transition"
                >
                  Login to apply
                </button>
              </div>
            )}

            {/* CANDIDATE LOGGED IN */}
            {user?.role === "candidate" && (
              <>
                {alreadyApplied ? (
                  <div>
                    <p className={`font-medium ${statusColor(applicationStatus)}`}>
                      Already Applied
                    </p>
                    <p className={`text-sm ${statusColor(applicationStatus)}`}>
                      Status: {applicationStatus}
                    </p>
                  </div>
                ) : (
                  <>
                    {totalApplications >= 50 && (
                      <p className="text-sm text-red-600 mb-2">
                        Application limit reached
                
                      </p>
                    )}

                    <button
                      onClick={applyJob}
                      disabled={totalApplications >= 50}
                      className={`px-6 py-2 rounded text-white font-medium ${
                        totalApplications >= 50
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#7A004B] to-[#CC0047]"
                      }`}
                    >
                      {totalApplications >= 50
                        ? "Applications Closed"
                        : "Apply Now"}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* META */}
        <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <strong>Experience:</strong> {job.experience}
          </div>
          <div>
            <strong>Salary:</strong> {job.salary_from} – {job.salary_to}
          </div>
          <div>
            <strong>Industry:</strong> {job.industry}
          </div>
          <div>
            <strong>Skills:</strong>{" "}
            {Array.isArray(job.skills)
           ? job.skills.join(" • ")
            : job.skills || "-"}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-2">Job Description</h2>
          <p className="text-sm">{job.description}</p>
        </div>

      </div>
    </DashboardLayout>
  );
}

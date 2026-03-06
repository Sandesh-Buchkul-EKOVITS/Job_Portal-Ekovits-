// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DashboardLayout from "../../app/layouts/DashboardLayout";

// export default function MyJobs() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   if (!currentUser || currentUser.role !== "employer") {
//     return (
//       <DashboardLayout title="My Jobs">
//         <div className="bg-white p-6 rounded shadow">
//           Session expired. Please login again.
//         </div>
//       </DashboardLayout>
//     );
//   }

//   const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   const applications =
//     JSON.parse(localStorage.getItem("applications")) || [];

//   const myJobs = jobs.filter(
//     (job) => job.employerId === currentUser.id
//   );

//   const applicantCount = (jobId) =>
//     applications.filter((a) => a.jobId === jobId).length;

//   const closeJob = (jobId) => {
//     const updatedJobs = jobs.map((job) =>
//       job.id === jobId
//         ? { ...job, status: "closed" }
//         : job
//     );

//     localStorage.setItem("jobs", JSON.stringify(updatedJobs));
//     window.location.reload();
//   };

//   return (
//     <DashboardLayout title="My Jobs">
//       <div className="max-w-5xl mx-auto space-y-4">
//         <div className="flex justify-between items-center">
//      <h2 className="text-3xl font-bold text-slate-800 tracking-tight">

//             Jobs Posted by You
//           </h2>
          
//           <button
//             onClick={() => navigate("/employer/post-job")}
//             className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] text-white px-4 py-2 rounded"

//           >
//             + Post New Job
//           </button>
//         </div>

//         {myJobs.length === 0 ? (
//           <div className="bg-white p-6 rounded shadow">
//             You have not posted any jobs yet.
//           </div>
//         ) : (
//           myJobs.map((job) => (
//             <div
//               key={job.id}
//               className="bg-white p-5 rounded shadow"
//             >
//               <div className="flex justify-between">
//                 <div>
//                   <h3 className="text-lg font-semibold">
//                     {job.title}
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     {job.companyName}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {job.location} • {job.workMode}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-sm font-medium text-blue-600">
//                     {applicantCount(job.id)} Applicants
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     Status: {job.status}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4 mt-4 text-sm">
//                 <button
//                   onClick={() =>
//                     navigate(`/employer/applicants?jobId=${job.id}`)
//                   }
//                   className="text-blue-600 hover:underline"
//                 >
//                   View Applicants
//                 </button>

//                 {job.status !== "closed" && (
//                   <button
//                     onClick={() =>
//                       navigate(`/employer/post-job?jobId=${job.id}`)
//                     }
//                     className="text-gray-700 hover:underline"
//                   >
//                     Edit Job
//                   </button>
//                 )}

//                 {job.status !== "closed" && (
//                   <button
//                     onClick={() => closeJob(job.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Close Job
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </DashboardLayout>
//   );
// }
























import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import { FaUsers } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

export default function MyJobs() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [jobs, setJobs] = useState([]);
  const [applicantCounts, setApplicantCounts] = useState({});

  // 🔐 Session check
  if (!currentUser || currentUser.role !== "employer") {
    return (
      <DashboardLayout title="My Jobs">
        <div className="bg-white p-6 rounded shadow">
          Session expired. Please login again.
        </div>
      </DashboardLayout>
    );
  }

  // ✅ Fetch Jobs from DB
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/jobs/my-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setJobs(data.jobs);
            fetchApplicantCounts(data.jobs); 
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);



  const fetchApplicantCounts = async (jobsList) => {
  try {
    const token = localStorage.getItem("token");

    const counts = {};

    for (const job of jobsList) {
      const res = await fetch(
        `http://localhost:5000/api/applications/job/${job.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        counts[job.id] = data.total;
      }
    }

    setApplicantCounts(counts);
  } catch (err) {
    console.log(err);
  }
};

  // ✅ Close Job (DELETE API)
  // const closeJob = async (jobId) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await fetch(
  //       `http://localhost:5000/api/jobs/${jobId}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await res.json();

  //     if (data.success) {
  //       setJobs(jobs.filter((job) => job.id !== jobId));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



const closeJob = async (jobId) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/jobs/close/${jobId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.reload();

  } catch (err) {
    console.log(err);
  }
};

const shareJob = async (job) => {

  const url = `${window.location.origin}/jobs/${job.id}`;

  const text = `
Role: ${job.title}
Company: ${job.company_name}
Location: ${job.location}
Work Mode: ${job.work_mode}
Salary: ${job.salary_from} - ${job.salary_to}

Job Description:
${job.description || "N/A"}

Apply here:
${url}
`;

  try {

    if (navigator.share) {

      await navigator.share({
        title: job.title,
        text: text,
        url: url
      });

    } else {

      navigator.clipboard.writeText(`${text}\n${url}`);
      alert("Job details copied. You can paste and share.");

    }

  } catch (err) {
    console.log(err);
  }
};








  return (
    <DashboardLayout title="My Jobs">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
            Jobs Posted by You
          </h2>

          <button
            onClick={() => navigate("/employer/post-job")}
            className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] text-white px-4 py-2 rounded"
          >
            + Post New Job
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            You have not posted any jobs yet.
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {job.company_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {job.location} • {job.work_mode}
                  </p>
                </div>

                <div className="text-right flex flex-col items-end gap-2">

  <p className="text-xs text-gray-500">
    Status: {job.status}
  </p>

  {/* <button
    onClick={() => shareJob(job.id)}
    className="text-gray-600 hover:text-gray-800 text-lg"
    title="Share Job"
  >
    <FaShareAlt />
  </button> */}







<button
  onClick={() => shareJob(job)}
  className="text-gray-600 hover:text-gray-800 text-lg"
  title="Share Job"
>
  <FaShareAlt />
</button>
</div>
              </div>

              <div className="flex gap-4 mt-4 text-sm">
         <button
  onClick={() =>
    navigate(`/employer/applicants/${job.id}`)
  }
  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-semibold"
  title="View Applicants"
>
  <span className="text-xl">👥</span>
  <span className="text-lg">{applicantCounts[job.id] || 0}</span>
</button>


                {job.status !== "closed" && (
                 <button
  onClick={() =>
    navigate(`/employer/post-job?jobId=${job.id}`)
  }
  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
>
  Edit Job
</button>
                )}

                {job.status !== "closed" && (
                  <button
  onClick={() => closeJob(job.id)}
  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
>
  Close Job
</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}

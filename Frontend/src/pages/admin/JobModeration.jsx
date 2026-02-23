// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import BackButton from "../../components/common/BackButton";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";


// export default function JobModeration() {
//   const [jobs, setJobs] = useState([]);
//    const [searchParams] = useSearchParams();
//   const status = searchParams.get("status");

// useEffect(() => {
//   const allJobs =
//     JSON.parse(localStorage.getItem("jobs")) || [];

//   if (!status) {
//     setJobs(allJobs);
//   } else {
//     const filtered = allJobs.filter(
//       job => job.status === status
//     );
//     setJobs(filtered);
//   }
// }, [status]);

// const updateStatus = (id, newStatus) => {
//   const allJobs =
//     JSON.parse(localStorage.getItem("jobs")) || [];

//   const updatedAllJobs = allJobs.map(job =>
//     job.id === id ? { ...job, status: newStatus } : job
//   );

//   localStorage.setItem(
//     "jobs",
//     JSON.stringify(updatedAllJobs)
//   );

//   // Re-filter based on current status
//   if (!status) {
//     setJobs(updatedAllJobs);
//   } else {
//     const filtered = updatedAllJobs.filter(
//       job => job.status === status
//     );
//     setJobs(filtered);
//   }
// };


//   return (
//     <DashboardLayout title="Job Moderation">
//       <BackButton />

//       <table className="w-full bg-white rounded shadow">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Title</th>
//             <th className="p-2">Company</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map(job => (
//             <tr key={job.id} className="border-b">
//               <td className="p-2">{job.title}</td>
//               <td className="p-2">{job.company}</td>
//               <td className="p-2 font-semibold">
//                 {job.status}
//               </td>
//               <td className="p-2 flex gap-2">
//                 <button
//                   onClick={() =>
//                     updateStatus(job.id, "approved")
//                   }
//                   className="bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(job.id, "rejected")
//                   }
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Reject
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(job.id, "stopped")
//                   }
//                   className="bg-gray-600 text-white px-2 py-1 rounded"
//                 >
//                   Stop
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </DashboardLayout>
//   );
// }















// import DashboardLayout from "../../app/layouts/DashboardLayout";
// import BackButton from "../../components/common/BackButton";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function JobModeration() {
//   const [jobs, setJobs] = useState([]);
//   const [searchParams] = useSearchParams();
//   const status = searchParams.get("status");

//   const fetchJobs = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(
//         `http://localhost:5000/api/admin/jobs${
//           status ? `?status=${status}` : ""
//         }`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setJobs(data.jobs);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [status]);

//   const updateStatus = async (id, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");

//       await fetch(
//         `http://localhost:5000/api/admin/jobs/${id}/status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//           },
//           body: JSON.stringify({ status: newStatus })
//         }
//       );

//       fetchJobs();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <DashboardLayout title="Job Moderation">
//       <BackButton />

//       <table className="w-full bg-white rounded shadow">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Title</th>
//             <th className="p-2">Employer</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map(job => (
//             <tr key={job.id} className="border-b">
//               <td className="p-2">{job.title}</td>
//               <td className="p-2">{job.employer_name}</td>
//               <td className="p-2 font-semibold">
//                 {job.status}
//               </td>
//               <td className="p-2 flex gap-2">
//                 <button
//                   onClick={() =>
//                     updateStatus(job.id, "approved")
//                   }
//                   className="bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() =>
//                     updateStatus(job.id, "rejected")
//                   }
//                   className="bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </DashboardLayout>
//   );
// }











import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function JobModeration() {
  const [jobs, setJobs] = useState([]);
  // const [searchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // const navigate = useNavigate();

  const status = searchParams.get("status");

console.log("CURRENT STATUS:", status);
const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/admin/jobs${
        status ? `?status=${status}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("RESPONSE STATUS:", res.status);

    const data = await res.json();
    console.log("API DATA:", data);

    if (data.success) {
      setJobs(data.jobs);
    } else {
      console.log("API SUCCESS FALSE");
    }
  } catch (err) {
    console.log("FETCH ERROR:", err);
  }
};


  useEffect(() => {
    fetchJobs();
  }, [status]);
const changeFilter = (value) => {
  if (!value) {
    setSearchParams({});
  } else {
    setSearchParams({ status: value });
  }
};


  return (
    <DashboardLayout title="Job Moderation">
      <BackButton />

      {/* FILTER BUTTONS */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => changeFilter(null)}
          className={`px-3 py-1 rounded ${
            !status ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          ALL
        </button>

        <button onClick={() => changeFilter("pending")}
          className={`px-3 py-1 rounded ${
            status === "pending" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          PENDING
        </button>

        <button onClick={() => changeFilter("approved")}
          className={`px-3 py-1 rounded ${
            status === "approved" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          APPROVED
        </button>

        <button onClick={() => changeFilter("rejected")}
          className={`px-3 py-1 rounded ${
            status === "rejected" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          REJECTED
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Employer</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No jobs found
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="border-b">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.employer_name}</td>
                <td className="p-2 font-semibold">{job.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

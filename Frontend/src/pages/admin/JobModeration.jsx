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
  const [openJob, setOpenJob] = useState(null);
  const [modalJob, setModalJob] = useState(null);
  // const [searchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // const navigate = useNavigate();
const status = searchParams.get("status") || "";

console.log("CURRENT STATUS:", status);
console.log("JOBS DATA:", jobs);  
const fetchJobs = async () => {
   console.log("FETCH FUNCTION RUNNING");
  try {
    const token = localStorage.getItem("token");

    // const res = await fetch(
    //   `http://localhost:5000/api/admin/jobs${
    //     status ? `?status=${status}` : ""
    //   }`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );


    const url = status
  ? `http://localhost:5000/api/admin/jobs?status=${status}`
  : `http://localhost:5000/api/admin/jobs`;

    console.log("FETCH URL:", url);
const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

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

const toggleDetails = (id) => {
  if (openJob === id) {
    setOpenJob(null);
  } else {
    setOpenJob(id);
  }
};
const openDescription = (job) => {
  setModalJob(job);
};

const closeDescription = () => {
  setModalJob(null);
};
const updateStatus = async (id, newStatus) => {

  try {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/admin/jobs/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({ status:newStatus })
      }
    );

    fetchJobs();

  } catch (err) {
    console.log(err);
  }

};

const deleteJob = async (id) => {

  try {

    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/admin/jobs/${id}`,
      {
        method: "DELETE",
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    fetchJobs();

  } catch(err){
    console.log(err);
  }

};


  useEffect(() => {
     console.log("USE EFFECT RUNNING");
    fetchJobs();
  }, [status]);
  useEffect(() => {
  fetchJobs();
}, []);
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
     <table className="w-full bg-white rounded-lg shadow overflow-hidden">

<thead className="bg-gray-100 border-b">
<tr>

<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
Title
</th>

<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
Company
</th>

<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
Location
</th>

<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
Status
</th>

<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
Actions
</th>

</tr>
</thead>

<tbody>

{jobs.map((job) => (
<>
<tr key={job.id} className="border-b hover:bg-gray-50 transition">

<td className="px-6 py-4 text-sm text-gray-800">
{job.title}
</td>

<td className="px-6 py-4 text-sm text-gray-700">
{job.company_name}
</td>

<td className="px-6 py-4 text-sm text-gray-700">
{job.location}
</td>

<td className="px-6 py-4 text-sm">
<span
className={`font-semibold
${job.status === "approved" && "text-green-600"}
${job.status === "rejected" && "text-red-600"}
${job.status === "pending" && "text-yellow-600"}
`}
>
{job.status}
</span>
</td>

<td className="px-6 py-4 text-sm space-x-3">

<button
onClick={() => toggleDetails(job.id)}
className="text-blue-600 hover:underline"
>
View Details
</button>

<button
onClick={() => openDescription(job)}
className="text-blue-600 hover:underline"
>
View Full Description
</button>

<button
onClick={() => updateStatus(job.id,"approved")}
className="text-green-600 hover:underline"
>
Approve
</button>

<button
onClick={() => updateStatus(job.id,"rejected")}
className="text-red-600 hover:underline"
>
Reject
</button>

<button
onClick={() => deleteJob(job.id)}
className="text-red-500 hover:underline"
>
Delete
</button>

</td>
</tr>

{/* DETAILS ROW */}
{openJob === job.id && (
<tr className="bg-gray-50">
<td colSpan="5" className="px-6 py-4 text-sm text-gray-700">

<p><strong>Company:</strong> {job.company_name}</p>
<p><strong>Location:</strong> {job.location}</p>
<p><strong>Status:</strong> {job.status}</p>
<p><strong>Job ID:</strong> {job.id}</p>

</td>
</tr>
)}

</>
))}

</tbody>

</table>








      {modalJob && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

<div className="bg-white rounded-lg shadow-lg w-[500px] p-6 relative">

<button
onClick={closeDescription}
className="absolute right-4 top-3 text-gray-500"
>
✕
</button>

<h2 className="text-xl font-semibold mb-2">
{modalJob.title}
</h2>

<p className="text-gray-500 mb-4">
{modalJob.company} • {modalJob.location}
</p>

<p className="text-gray-700">
{modalJob.description || "No description provided"}
</p>

</div>

</div>

)}
    </DashboardLayout>
  );
}

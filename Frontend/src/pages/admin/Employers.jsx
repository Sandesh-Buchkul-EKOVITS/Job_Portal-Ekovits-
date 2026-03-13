import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getEmployerProfile,
  saveEmployerProfile,
} from "../../app/services/employerProfileService";

/* ---------- PLAN DEFINITIONS ---------- */
const PLANS = ["FREE", "BASIC", "ENTERPRISE"];

const PLAN_LIMITS = {
  FREE: 1,
  BASIC: 5,
  ENTERPRISE: 10,
};

export default function AdminEmployers() {


  const navigate = useNavigate();
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Employers">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const [employers, setEmployers] = useState([]);
  //  const [verificationRequests, setVerificationRequests] = useState([]);
  // const [requests, setRequests] = useState([]);


  //   useEffect(() => {
  //     const users =
  //       JSON.parse(localStorage.getItem("users")) || [];
  //    setEmployers(
  //   users.filter(
  //     (u) => u.role === "employer" && u.verificationRequested
  //   )
  // );


  //     const storedRequests =
  //   JSON.parse(localStorage.getItem("verification_requests")) || [];

  // setRequests(storedRequests);

  //   }, []);





  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/admin/employers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (data.success) {
      setEmployers(data.employers);
    }
  };















  /* ---------- SAVE USERS ---------- */
  const saveUsers = (updatedEmployers) => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const merged = users.map((u) => {
      const updated = updatedEmployers.find(
        (e) => String(e.id) === String(u.id)
      );
      return updated ? updated : u;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(merged)
    );
    setEmployers(updatedEmployers);
  };

  /* ---------- VERIFY / UNVERIFY ---------- */
  // const toggleVerify = (emp) => {
  //   const profile =
  //     getEmployerProfile(emp.id) || {
  //       companyName: emp.companyName || "",
  //       email: emp.email,
  //       verified: false,
  //     };

  //   saveEmployerProfile(emp.id, {
  //     ...profile,
  //     verified: !profile.verified,
  //   });

  //   setEmployers([...employers]);
  // };







  // const toggleVerify = (emp) => {
  //   let profile = getEmployerProfile(emp.id);
  // const request = requests.find(
  //   (r) => String(r.employerId) === String(emp.id)
  // );

  //   if (!profile) {
  //     profile = {
  //       companyName: emp.companyName || "",
  //       email: emp.email,
  //       verified: false,
  //     };
  //   }

  //   const updatedProfile = {
  //     ...profile,
  //     verified: !profile.verified,
  //   };

  //   saveEmployerProfile(emp.id, updatedProfile);

  //   // Force refresh
  //   setEmployers((prev) => [...prev]);
  // };















  // const toggleVerify = (emp) => {
  //   const users =
  //     JSON.parse(localStorage.getItem("users")) || [];

  //   const updatedUsers = users.map((u) =>
  //     String(u.id) === String(emp.id)
  //       ? {
  //           ...u,
  //           verified: !u.verified,
  //           verificationRequested: false,
  //         }
  //       : u
  //   );

  //   localStorage.setItem(
  //     "users",
  //     JSON.stringify(updatedUsers)
  //   );

  //   setEmployers(
  //     updatedUsers.filter(
  //       (u) => u.role === "employer" && u.verificationRequested
  //     )
  //   );
  // };















  /* ---------- BLOCK / UNBLOCK ---------- */
  const toggleBlock = (id) => {
    const updated = employers.map((e) =>
      e.id === id
        ? { ...e, blocked: !e.blocked }
        : e
    );

    saveUsers(updated);

    // Force logout if blocked user is active
    const current =
      JSON.parse(localStorage.getItem("currentUser"));
    if (
      current &&
      String(current.id) === String(id)
    ) {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }
  };



const handleVerify = async (emp) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/admin/employers/${emp.id}/verify`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        verified: !emp.verified,
      }),
    }
  );

  fetchEmployers();
};













  /* ---------- APPROVE VERIFICATION ---------- */
  // const approveVerification = (empId) => {
  //   const profile = getEmployerProfile(empId);

  //   if (!profile) return;

  //   saveEmployerProfile(empId, {
  //     ...profile,
  //     verified: true,
  //   });

  //   const verificationRequests =
  //     JSON.parse(localStorage.getItem("verification_requests")) || [];

  //   const updatedRequests = verificationRequests.filter(
  //     (r) => String(r.employerId) !== String(empId)
  //   );

  //   localStorage.setItem(
  //     "verification_requests",
  //     JSON.stringify(updatedRequests)
  //   );

  //   setEmployers([...employers]);
  // };

  /* ---------- PLAN CHANGE ---------- */
  const changePlan = async (id, plan) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/admin/employers/${id}/plan`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      }
    );

    const data = await res.json();

    if (data.success) {
      // 🔥 Optimistic UI Update
      setEmployers((prev) =>
        prev.map((emp) =>
          emp.id === id
            ? { ...emp, plan }
            : emp
        )
      );
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <DashboardLayout title="Employers">
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Company / Email
              </th>
              <th className="p-3 text-left">
                Verification
              </th>
              <th className="p-3 text-left">
                Plan
              </th>
              <th className="p-3 text-left">
                Status
              </th>
              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employers.map((emp) => {
              //           const request = verificationRequests.find(
              //   (r) => String(r.employerId) === String(emp.id)
              // );
              const profile =
                getEmployerProfile(emp.id);

              const plan = emp.plan || "FREE";
              const limit =
                PLAN_LIMITS[plan] === Infinity
                  ? "Unlimited"
                  : PLAN_LIMITS[plan];

              return (
                <tr key={emp.id} className="border-t">
                  <td className="p-3">
                    <div className="font-medium">
                      {emp.company_name || "Company Name"}

                    </div>
                    <div className="text-xs text-gray-600">
                      {emp.email}
                    </div>
                  </td>

                  {/* <td className="p-3">
                    {profile?.verified
                      ? "Verified"
                      : "Not Verified"}
                  </td> */}

                  <td className="p-3">
                    {emp.verified
                      ? "Verified"
                      : emp.verification_requested
                        ? "Pending Approval"
                        : "Not Verified"}
                  </td>



                  {/* ---------- PLAN ---------- */}
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <select
                        value={plan}
                        onChange={(e) =>
                          changePlan(
                            emp.id,
                            e.target.value
                          )
                        }
                        className="border p-1 rounded text-xs"
                      >
                        {PLANS.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>

                      <span className="text-[10px] text-gray-500">
                        Jobs Allowed: {limit}
                      </span>
                    </div>
                  </td>

                  <td className="p-3">
                    {emp.blocked
                      ? "Blocked"
                      : "Active"}
                  </td>

        <td className="p-3 whitespace-nowrap">
  <div className="flex items-center gap-2 h-full">

<button
  onClick={() =>
    navigate(`/admin/employer/${emp.id}`)
  }
  className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
>
  View Profile
</button>

<button
  onClick={() =>
    handleVerify(emp)
  }
  className="bg-green-600 text-white text-xs px-3 py-1 rounded"
>
  {emp.verified ? "Unverify" : "Verify"}
</button>

<button
  onClick={() =>
    toggleBlock(emp.id)
  }
  className="bg-red-600 text-white text-xs px-3 py-1 rounded"
>
  {emp.blocked ? "Unblock" : "Block"}
</button>

  </div>
</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

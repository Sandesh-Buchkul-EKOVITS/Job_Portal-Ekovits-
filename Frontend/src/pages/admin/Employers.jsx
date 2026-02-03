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
  ENTERPRISE: Infinity,
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

  useEffect(() => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];
    setEmployers(
      users.filter((u) => u.role === "employer")
    );
  }, []);

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
  const toggleVerify = (emp) => {
    const profile =
      getEmployerProfile(emp.id) || {
        companyName: emp.companyName || "",
        email: emp.email,
        verified: false,
      };

    saveEmployerProfile(emp.id, {
      ...profile,
      verified: !profile.verified,
    });

    setEmployers([...employers]);
  };

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

  /* ---------- PLAN CHANGE ---------- */
  const changePlan = (id, plan) => {
    const updated = employers.map((e) =>
      e.id === id
        ? {
            ...e,
            plan,
            planUpdatedAt: new Date().toISOString(),
          }
        : e
    );

    saveUsers(updated);
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
                      {profile?.companyName ||
                        emp.companyName ||
                        "Company Name"}
                    </div>
                    <div className="text-xs text-gray-600">
                      {emp.email}
                    </div>
                  </td>

                  <td className="p-3">
                    {profile?.verified
                      ? "Verified"
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

                  <td className="p-3 space-x-3 whitespace-nowrap">
                    <button
                      onClick={() =>
                        navigate(
                          `/admin/employer/${emp.id}`
                        )
                      }
                      className="text-blue-600 text-xs underline"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() =>
                        toggleVerify(emp)
                      }
                      className="text-xs underline text-green-600"
                    >
                      {profile?.verified
                        ? "Unverify"
                        : "Verify"}
                    </button>

                    <button
                      onClick={() =>
                        toggleBlock(emp.id)
                      }
                      className="text-xs underline text-red-600"
                    >
                      {emp.blocked
                        ? "Unblock"
                        : "Block"}
                    </button>
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

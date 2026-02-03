import DashboardLayout from "../../app/layouts/DashboardLayout";
import { useState } from "react";

export default function AdminUsers() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <DashboardLayout title="Users">
        <div className="bg-white p-6 rounded shadow">
          Access denied.
        </div>
      </DashboardLayout>
    );
  }

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  /* ---------- SEARCH ---------- */
  const filteredUsers = users.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.includes(q)
    );
  });

  /* ---------- ACTIONS ---------- */

  const updateUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem(
      "users",
      JSON.stringify(updated)
    );
  };

  const resetPassword = (userId) => {
    const tempPassword =
      "Temp@" + Math.floor(Math.random() * 10000);

    const updated = users.map((u) =>
      u.id === userId
        ? { ...u, password: tempPassword }
        : u
    );

    updateUsers(updated);
    alert(
      `Temporary password: ${tempPassword}\nPlease share securely with user.`
    );
  };

  const toggleBlock = (userId) => {
    const updated = users.map((u) =>
      u.id === userId
        ? { ...u, isBlocked: !u.isBlocked }
        : u
    );

    updateUsers(updated);
  };

  const deleteUser = (userId) => {
    if (
      !window.confirm(
        "This will permanently delete the user. Continue?"
      )
    )
      return;

    const updated = users.filter(
      (u) => u.id !== userId
    );

    updateUsers(updated);
  };

  return (
    <DashboardLayout title="All Users">
      <div className="max-w-6xl mx-auto space-y-4">

        {/* SEARCH */}
        <input
          placeholder="Search by name, email or phone"
          className="border p-3 rounded w-full"
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        {filteredUsers.length === 0 ? (
          <div className="bg-white p-6 rounded shadow">
            No users found.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-5 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">
                  Role: {user.role}
                </p>
                {user.isBlocked && (
                  <p className="text-xs text-red-600">
                    BLOCKED
                  </p>
                )}
              </div>

              <div className="flex gap-3 text-sm">
                <button
                  onClick={() =>
                    resetPassword(user.id)
                  }
                  className="text-blue-600"
                >
                  Reset Password
                </button>

                <button
                  onClick={() =>
                    toggleBlock(user.id)
                  }
                  className="text-yellow-600"
                >
                  {user.isBlocked
                    ? "Unblock"
                    : "Block"}
                </button>

                {user.role !== "admin" && (
                  <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="text-red-600"
                  >
                    Delete
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

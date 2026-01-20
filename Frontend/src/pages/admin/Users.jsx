import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(allUsers.filter(u => u.role !== "admin"));
  }, []);

  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    saveUsers(users.filter(u => u.id !== id));
  };

  const resetPassword = (id) => {
    const updated = users.map(u =>
      u.id === id ? { ...u, password: "password123" } : u
    );
    saveUsers(updated);
    alert("Password reset to: password123");
  };

  const changeRole = (id, role) => {
    saveUsers(
      users.map(u => (u.id === id ? { ...u, role } : u))
    );
  };

  return (
    <DashboardLayout title="User Management">
      <BackButton />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>

              <td className="p-2">
                <select
                  value={user.role}
                  onChange={(e) =>
                    changeRole(user.id, e.target.value)
                  }
                  className="border p-1 rounded"
                >
                  <option value="candidate">Candidate</option>
                  <option value="employer">Employer</option>
                </select>
              </td>

              <td className="p-2 flex gap-2">
                {/* ✅ VIEW CANDIDATE PROFILE */}
                {user.role === "candidate" && (
                  <button
                    onClick={() =>
                      navigate(`/admin/candidate/${user.id}`)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    View Profile
                  </button>
                )}

                {/* VIEW EMPLOYER COMPANY */}
                {user.role === "employer" && (
                  <button
                    onClick={() =>
                      navigate(`/admin/employer/${user.id}`)
                    }
                    className="border px-2 py-1 rounded"
                  >
                    View Company
                  </button>
                )}

                <button
                  onClick={() => resetPassword(user.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Reset Password
                </button>

                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

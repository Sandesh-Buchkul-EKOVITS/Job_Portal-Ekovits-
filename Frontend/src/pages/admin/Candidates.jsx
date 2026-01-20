import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";

export default function AdminCandidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setCandidates(users.filter(u => u.role === "candidate"));
  }, []);

  return (
    <DashboardLayout title="Candidates">
      <BackButton />

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

import { useParams } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";
import BackButton from "../../components/common/BackButton";

export default function AdminEmployerProfile() {
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const employer = users.find(u => u.id == id);

  if (!employer) return null;

  return (
    <DashboardLayout title="Employer Company Profile">
      <BackButton />

      <pre className="bg-white p-4 rounded shadow text-sm">
        {JSON.stringify(employer.companyProfile || {}, null, 2)}
      </pre>
    </DashboardLayout>
  );
}

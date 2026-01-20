import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function EmployerDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Employer Dashboard">
      <div className="grid md:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Post a Job</h3>
          <button
            onClick={() => navigate("/employer/post-job")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Job
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">My Jobs</h3>
          <button
            onClick={() => navigate("/employer/my-jobs")}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            View Status
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Applicants</h3>
          <button
            onClick={() => navigate("/employer/applicants")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            View Applicants
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

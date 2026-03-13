import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/admin/dashboard" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="mb-4 text-sm text-blue-600 hover:underline"
    >
      ← Back to Dashboard
    </button>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../app/layouts/DashboardLayout";

export default function QueryDetail() {

  const { id } = useParams();
  const [query, setQuery] = useState(null);

  useEffect(() => {

    const fetchQuery = async () => {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/admin/queries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {
        setQuery(data.query);
      }

    };

    fetchQuery();

  }, [id]);

  if (!query) return null;

  return (

    <DashboardLayout title="Query Details">

      <div className="bg-white shadow rounded p-6 max-w-xl">

        <p className="mb-3">
          <strong>User Type:</strong> {query.user_type}
        </p>

        <p className="mb-3">
          <strong>Email:</strong> {query.email}
        </p>

        <p className="mb-3">
          <strong>Phone:</strong> {query.phone}
        </p>

        <p className="mb-3">
          <strong>Description:</strong>
        </p>

        <p className="bg-gray-50 p-3 rounded">
          {query.description}
        </p>

      </div>

    </DashboardLayout>

  );
}
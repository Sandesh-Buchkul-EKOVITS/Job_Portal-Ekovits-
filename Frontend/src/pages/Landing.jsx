import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    navigate(`/jobs?q=${query}&location=${location}`);
  };

  const quickCategories = [
    "Remote",
    "Fresher",
    "Internship",
    "Startup",
    "MNC",
    "Engineering",
    "Software",
    "Sales",
    "Analytics",
  ];

  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find your next job, faster
          </h1>

          <p className="text-gray-600 mb-10">
            Thousands of verified jobs from startups, MNCs and growing companies
          </p>

          {/* SEARCH BAR */}
          <div className="bg-white rounded-full shadow-md flex flex-col md:flex-row items-center gap-3 p-3 max-w-4xl mx-auto">
            <input
              className="flex-1 px-4 py-2 outline-none text-sm"
              placeholder="Skills, job title or company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <input
              className="flex-1 px-4 py-2 outline-none text-sm"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* QUICK CATEGORIES */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {quickCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/jobs?q=${cat}`)}
                className="bg-white border rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO SECTION */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">
                Hiring faster with premium access
              </h3>
              <p className="text-sm text-gray-600">
                Employers can unlock advanced candidate search & analytics
              </p>
            </div>
            <button
              onClick={() => navigate("/pricing")}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              Explore Plans
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-2xl font-bold">10,000+</h4>
            <p className="text-sm text-gray-600 mt-1">Active Jobs</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-2xl font-bold">5,000+</h4>
            <p className="text-sm text-gray-600 mt-1">Hiring Companies</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-2xl font-bold">50,000+</h4>
            <p className="text-sm text-gray-600 mt-1">Job Seekers</p>
          </div>
        </div>
      </section>
    </div>
  );
}

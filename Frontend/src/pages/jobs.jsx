import { useState } from "react";
import JobCard from "../components/jobs/JobCard";
import { getRecommendedJobs } from "../utils/jobRecommendations";

export default function Jobs() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const profile = users.find((u) => u.id === currentUser?.id);

  /* ---------- FILTER LOGIC ---------- */
  const filteredJobs = jobs.filter((job) => {
    if (job.status !== "approved") return false;

    /* Keyword search */
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.skills?.some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );

    /* Location search */
    const matchesLocation =
      location === "" ||
      job.location?.toLowerCase().includes(location.toLowerCase());

    /* Pill filters */
    let matchesPill = true;

    switch (activeFilter) {
      case "Remote":
        matchesPill = job.locationType === "Remote";
        break;

      case "Fresher":
        matchesPill =
          job.experience === "Fresher" ||
          job.experience === "0-1 years";
        break;

      case "Internship":
        matchesPill = job.type === "Internship";
        break;

      case "Startup":
        matchesPill = job.companyType === "Startup";
        break;

      case "MNC":
        matchesPill = job.companyType === "MNC";
        break;

      case "Engineering":
      case "Software":
      case "Sales":
      case "Analytics":
        matchesPill =
          job.industry === activeFilter ||
          job.skills?.some((s) =>
            s.toLowerCase().includes(activeFilter.toLowerCase())
          );
        break;

      default:
        matchesPill = true;
    }

    return matchesQuery && matchesLocation && matchesPill;
  });

  /* ---------- RECOMMENDATIONS ---------- */
  const recommended =
    currentUser?.role === "candidate"
      ? getRecommendedJobs(
          profile,
          jobs,
          applications.filter(
            (a) => a.candidateId === profile?.id
          )
        )
      : [];

  const quickFilters = [
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
    <div className="bg-gray-50 min-h-screen">
      {/* SEARCH */}
      <div className="bg-white py-12 border-b">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">
            Find your next job, faster
          </h1>

          <div className="flex flex-col md:flex-row gap-3 bg-white shadow rounded-full p-3">
            <input
              placeholder="Skills, job title or company"
              className="flex-1 px-4 py-3 outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <input
              placeholder="Location"
              className="flex-1 px-4 py-3 outline-none"
              onChange={(e) => setLocation(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full">
              Search
            </button>
          </div>

          {/* FILTER PILLS */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(
                    activeFilter === filter ? "" : filter
                  )
                }
                className={`px-4 py-2 rounded-full border text-sm ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* JOB LIST */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {recommended.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Recommended Jobs
            </h2>
            <div className="space-y-4">
              {recommended.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">
          All Jobs
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-gray-600">
            No jobs found for selected filter.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import DashboardLayout from "../app/layouts/DashboardLayout";
// import JobCard from "../components/jobs/JobCard";

// /* ================= DEBOUNCE ================= */
// function useDebounce(value, delay = 400) {
//   const [debounced, setDebounced] = useState(value);

//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);

//   return debounced;
// }

// /* ================= SALARY RANGES ================= */
// const SALARY_RANGES = [
//   { label: "0 – 20k", min: 0, max: 20000 },
//   { label: "20k – 40k", min: 20000, max: 40000 },
//   { label: "40k – 60k", min: 40000, max: 60000 },
//   { label: "60k – 80k", min: 60000, max: 80000 },
//   { label: "80k+", min: 80000, max: Infinity },
// ];

// /* ================= EXPERIENCE RANGES ================= */
// const EXPERIENCE_RANGES = [
//   "0 – 1 Year",
//   "1 – 3 Years",
//   "3 – 5 Years",
//   "5 – 8 Years",
//   "8+ Years",
// ];

// export default function Jobs() {
//   // const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
// const [jobs, setJobs] = useState([]);

// useEffect(() => {
//   const fetchJobs = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/jobs");
//       const data = await res.json();

//       if (data.success) {
//         setJobs(data.jobs);
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchJobs();
// }, []);

//   // const approvedJobs = jobs.filter(
//   //   (job) => job.status === "approved"
//   // );



//   const approvedJobs = jobs;

//   /* ================= FILTER STATE ================= */
//   const [filters, setFilters] = useState({
//     keyword: "",
//     industry: "",
//     workMode: "",
//     location: "",
//     sort: "latest",
//     skills: [],
//     salaryRanges: [],
//     experiences: [], // ✅ MULTI EXPERIENCE
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const debouncedKeyword = useDebounce(filters.keyword);

//   /* ================= FILTER LOGIC ================= */
//   const filteredJobs = approvedJobs
//     .filter((job) => {
//       const keyword = debouncedKeyword.toLowerCase();

//       const matchKeyword = keyword
//         ? job.title.toLowerCase().includes(keyword) ||
//           job.companyName?.toLowerCase().includes(keyword) ||
//           job.location?.toLowerCase().includes(keyword)
//         : true;

//       const matchIndustry = filters.industry
//         ? job.industry === filters.industry
//         : true;

//       const matchWorkMode = filters.workMode
//         ? job.work_mode === filters.workMode

//         : true;

//       const matchLocation = filters.location
//         ? job.location
//             ?.toLowerCase()
//             .includes(filters.location.toLowerCase())
//         : true;

//       /* MULTI SKILL (ANY) */
//       const matchSkills =
//         filters.skills.length === 0
//           ? true
//           : job.skills?.some((s) =>
//               filters.skills.some(
//                 (fs) =>
//                   s.toLowerCase().includes(fs.toLowerCase())
//               )
//             );

//       /* MULTI SALARY RANGE (ANY) */
//       // const salaryFrom = Number(job.salaryFrom || 0);
//       const salaryFrom = Number(job.salary_from || 0);

//       const matchSalary =
//         filters.salaryRanges.length === 0
//           ? true
//           : filters.salaryRanges.some(
//               (r) =>
//                 salaryFrom >= r.min &&
//                 salaryFrom < r.max
//             );

//       /* MULTI EXPERIENCE (STRING MATCH) */
//       const matchExperience =
//         filters.experiences.length === 0
//           ? true
//           : filters.experiences.some(
//               (e) =>
//                 job.experience &&
//                 job.experience
//                   .toLowerCase()
//                   .includes(e.toLowerCase())
//             );

//       return (
//         matchKeyword &&
//         matchIndustry &&
//         matchWorkMode &&
//         matchLocation &&
//         matchSkills &&
//         matchSalary &&
//         matchExperience
//       );
//     })
//     .sort((a, b) => {
//       if (filters.sort === "salary") {
//         return Number(b.salaryFrom) - Number(a.salaryFrom);
//       }
//       return new Date(b.created_at) - new Date(a.created_at);

//     }); 

//   /* ================= FILTER OPTIONS ================= */
//   const industries = [...new Set(approvedJobs.map((j) => j.industry))];
//   const workModes = [...new Set(approvedJobs.map((j) => j.workMode))];

//   /* ================= SKILL HANDLERS ================= */
//   const addSkill = () => {
//     const value = skillInput.trim();
//     if (!value) return;
//     if (filters.skills.includes(value)) return;

//     setFilters({
//       ...filters,
//       skills: [...filters.skills, value],
//     });
//     setSkillInput("");
//   };

//   const removeSkill = (skill) => {
//     setFilters({
//       ...filters,
//       skills: filters.skills.filter((s) => s !== skill),
//     });
//   };

//   /* ================= EXPERIENCE HANDLER ================= */
//   const toggleExperience = (exp) => {
//     const exists = filters.experiences.includes(exp);
//     setFilters({
//       ...filters,
//       experiences: exists
//         ? filters.experiences.filter((e) => e !== exp)
//         : [...filters.experiences, exp],
//     });
//   };

//   /* ================= SALARY HANDLER ================= */
//   const toggleSalaryRange = (range) => {
//     const exists = filters.salaryRanges.find(
//       (r) => r.label === range.label
//     );

//     setFilters({
//       ...filters,
//       salaryRanges: exists
//         ? filters.salaryRanges.filter(
//             (r) => r.label !== range.label
//           )
//         : [...filters.salaryRanges, range],
//     });
//   };

//   /* ================= UI ================= */
//   return (
//     <DashboardLayout title="Jobs">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">

//         {/* FILTER PANEL */}
//         <div className="bg-white p-4 rounded shadow space-y-4">
//           <h3 className="font-semibold">Filters</h3>

//           <input
//             className="border p-2 w-full"
//             placeholder="Search job, company, location"
//             value={filters.keyword}
//             onChange={(e) =>
//               setFilters({ ...filters, keyword: e.target.value })
//             }
//           />

//           <select
//             className="border p-2 w-full"
//             value={filters.industry}
//             onChange={(e) =>
//               setFilters({ ...filters, industry: e.target.value })
//             }
//           >
//             <option value="">All Industries</option>
//             {industries.map((i) => (
//               <option key={i} value={i}>{i}</option>
//             ))}
//           </select>

//           <select
//             className="border p-2 w-full"
//             value={filters.workMode}
//             onChange={(e) =>
//               setFilters({ ...filters, workMode: e.target.value })
//             }
//           >
//             <option value="">All Work Modes</option>
//             {workModes.map((m) => (
//               <option key={m} value={m}>{m}</option>
//             ))}
//           </select>

//           <input
//             className="border p-2 w-full"
//             placeholder="Location"
//             value={filters.location}
//             onChange={(e) =>
//               setFilters({ ...filters, location: e.target.value })
//             }
//           />

//           {/* EXPERIENCE FILTER */}
//           <div>
//             <p className="text-sm font-medium mb-1">Experience</p>
//             <div className="flex flex-wrap gap-2">
//               {EXPERIENCE_RANGES.map((e) => {
//                 const active = filters.experiences.includes(e);
//                 return (
//                   <button
//                     key={e}
//                     onClick={() => toggleExperience(e)}
//                     className={`px-3 py-1 text-xs border rounded ${
//                       active
//                         ? "bg-purple-600 text-white"
//                         : ""
//                     }`}
//                   >
//                     {e}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* MULTI SKILL */}
//           <div>
//             <input
//               className="border p-2 w-full"
//               placeholder="Type skill & press Enter"
//               value={skillInput}
//               onChange={(e) => setSkillInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && addSkill()}
//             />

//             <div className="flex flex-wrap gap-2 mt-2">
//               {filters.skills.map((s) => (
//                 <span
//                   key={s}
//                   className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
//                 >
//                   {s}
//                   <button onClick={() => removeSkill(s)}>×</button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* SALARY */}
//           <div>
//             <p className="text-sm font-medium mb-1">
//               Salary Range (Monthly)
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {SALARY_RANGES.map((r) => {
//                 const active = filters.salaryRanges.some(
//                   (sr) => sr.label === r.label
//                 );
//                 return (
//                   <button
//                     key={r.label}
//                     onClick={() => toggleSalaryRange(r)}
//                     className={`px-3 py-1 text-xs border rounded ${
//                       active
//                         ? "bg-green-600 text-white"
//                         : ""
//                     }`}
//                   >
//                     {r.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <select
//             className="border p-2 w-full"
//             value={filters.sort}
//             onChange={(e) =>
//               setFilters({ ...filters, sort: e.target.value })
//             }
//           >
//             <option value="latest">Latest Jobs</option>
//             <option value="salary">Highest Salary</option>
//           </select>

//           <button
//             onClick={() =>
//               setFilters({
//                 keyword: "",
//                 industry: "",
//                 workMode: "",
//                 location: "",
//                 sort: "latest",
//                 skills: [],
//                 salaryRanges: [],
//                 experiences: [],
//               })
//             }
//             className="text-xs underline"
//           >
//             Clear All Filters
//           </button>
//         </div>

//         {/* JOB LIST */}
//         <div className="md:col-span-3 space-y-4">
//           <p className="text-sm text-gray-600">
//             Showing {filteredJobs.length} jobs
//           </p>

//           {filteredJobs.length === 0 ? (
//             <div className="bg-white p-6 rounded shadow">
//               No jobs match your filters.
//             </div>
//           ) : (
//             filteredJobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }












import { Search, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../app/layouts/DashboardLayout";
import JobCard from "../components/jobs/JobCard";

/* ================= DEBOUNCE ================= */
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

/* ================= SALARY RANGES ================= */
const SALARY_RANGES = [
  { label: "0 – 20k", min: 0, max: 20000 },
  { label: "20k – 40k", min: 20000, max: 40000 },
  { label: "40k – 60k", min: 40000, max: 60000 },
  { label: "60k – 80k", min: 60000, max: 80000 },
  { label: "80k+", min: 80000, max: Infinity },
];

/* ================= EXPERIENCE RANGES ================= */
const EXPERIENCE_RANGES = [
  "0 – 1 Year",
  "1 – 3 Years",
  "3 – 5 Years",
  "5 – 8 Years",
  "8+ Years",
];

export default function Jobs() {
const [searchParams] = useSearchParams();
const urlKeyword = searchParams.get("q") || "";
const urlLocation = searchParams.get("location") || "";
const [jobs, setJobs] = useState([]);
const urlWorkMode = searchParams.get("workMode") || "";
const urlJobType = searchParams.get("jobType") || "";


useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
      }

    } catch (err) {
      console.log(err);
    }
  };

  fetchJobs();
}, []);

  const approvedJobs = jobs;

  /* ================= FILTER STATE ================= */
  const [filters, setFilters] = useState({
      keyword: urlKeyword,
      industry: "",
      workMode: urlWorkMode,
      jobType: urlJobType,
      location: urlLocation,
    sort: "latest",
    skills: [],
    salaryRanges: [],
    experiences: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const debouncedKeyword = useDebounce(filters.keyword);

  /* ================= FILTER LOGIC ================= */
  const filteredJobs = approvedJobs
    .filter((job) => {
      const keyword = debouncedKeyword.toLowerCase();

      const matchKeyword = keyword
        ? job.title.toLowerCase().includes(keyword) ||
          job.company_name?.toLowerCase().includes(keyword) ||
          job.location?.toLowerCase().includes(keyword)
        : true;

      const matchIndustry = filters.industry
        ? job.industry === filters.industry
        : true;
      const matchJobType = filters.jobType
  ? job.job_type?.toLowerCase() === filters.jobType.toLowerCase()
  : true;

      const matchWorkMode = filters.workMode
        ? job.work_mode?.toLowerCase().replace(" ", "") === filters.workMode.toLowerCase()
        : true;

     const matchLocation = filters.location
  ? job.location?.toLowerCase().includes(filters.location.toLowerCase()) ||
    job.work_mode?.toLowerCase().replace(" ", "").includes(filters.location.toLowerCase())
  : true;

      const matchSkills =
        filters.skills.length === 0
          ? true
          : job.skills?.some((s) =>
              filters.skills.some(
                (fs) =>
                  s.toLowerCase().includes(fs.toLowerCase())
              )
            );

      const salaryFrom = Number(job.salary_from || 0);

      const matchSalary =
        filters.salaryRanges.length === 0
          ? true
          : filters.salaryRanges.some(
              (r) =>
                salaryFrom >= r.min &&
                salaryFrom < r.max
            );

      const matchExperience =
        filters.experiences.length === 0
          ? true
          : filters.experiences.some(
              (e) =>
                job.experience &&
                job.experience
                  .toLowerCase()
                  .includes(e.toLowerCase())
            );

      return (
        matchKeyword &&
        matchIndustry &&
        matchJobType &&
        matchWorkMode &&
        matchLocation &&
        matchSkills &&
        matchSalary &&
        matchExperience
      );
    })
    .sort((a, b) => {
      if (filters.sort === "salary") {
        return Number(b.salary_from) - Number(a.salary_from);
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  /* ================= FILTER OPTIONS ================= */
  const industries = [...new Set(approvedJobs.map((j) => j.industry))];
  const workModes = [...new Set(approvedJobs.map((j) => j.work_mode))];

  /* ================= SKILL HANDLERS ================= */
  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    if (filters.skills.includes(value)) return;

    setFilters({
      ...filters,
      skills: [...filters.skills, value],
    });
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    });
  };
  const JOB_TYPES = [
  "Fresher",
  "Internship",
  "Experience"
];

  /* ================= EXPERIENCE HANDLER ================= */
  const toggleExperience = (exp) => {
    const exists = filters.experiences.includes(exp);
    setFilters({
      ...filters,
      experiences: exists
        ? filters.experiences.filter((e) => e !== exp)
        : [...filters.experiences, exp],
    });
  };

  /* ================= SALARY HANDLER ================= */
  const toggleSalaryRange = (range) => {
    const exists = filters.salaryRanges.find(
      (r) => r.label === range.label
    );

    setFilters({
      ...filters,
      salaryRanges: exists
        ? filters.salaryRanges.filter(
            (r) => r.label !== range.label
          )
        : [...filters.salaryRanges, range],
    });
  };

  /* ================= UI ================= */
  return (
    <DashboardLayout>
      <div className="flex justify-center mb-10 px-4">
  <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl shadow-lg p-3 w-full max-w-3xl gap-3 md:gap-0">

    {/* Keyword */}
    <div className="flex items-center flex-1">
      <Search className="text-gray-400 mr-2" size={18} />

      <input
        type="text"
        placeholder="Skills, job title or company"
        className="flex-1 outline-none text-sm"
        value={filters.keyword}
        onChange={(e) =>
          setFilters({ ...filters, keyword: e.target.value })
        }
      />
    </div>

    {/* Divider Desktop */}
    <div className="hidden md:block h-6 w-px bg-gray-300 mx-3"></div>

    {/* Location */}
    <div className="flex items-center flex-1">
      <MapPin className="text-gray-400 mr-2" size={18} />

      <input
        type="text"
        placeholder="Location"
        className="flex-1 outline-none text-sm"
        value={filters.location}
        onChange={(e) =>
          setFilters({ ...filters, location: e.target.value })
        }
      />
    </div>

    {/* Search Button */}
    <button
      className="md:ml-4 px-6 py-2 rounded-full text-white font-medium w-full md:w-auto"
      style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
    >
      Search
    </button>

  </div>
</div>


      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        {/* FILTER PANEL */}
        <div className="bg-white p-4 rounded shadow space-y-4 md:col-span-1">

          <h3 className="font-semibold">Filters</h3>
           <button
    onClick={() =>
      setFilters({
        keyword: "",
        industry: "",
        jobType: "",
        workMode: "",
        location: "",
        sort: "latest",
        skills: [],
        salaryRanges: [],
        experiences: [],
      })
    }
    className="text-xs px-3 py-1 border rounded hover:bg-gray-100"
  >
    Clear Filters
  </button>
          <select
            className="border p-2 w-full text-sm"
            value={filters.industry}
            onChange={(e) =>
              setFilters({ ...filters, industry: e.target.value })
            }
          >
            <option value="">All Industries</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          {/* JOB TYPE */}
<select
  className="border p-2 w-full text-sm"
  value={filters.jobType}
  onChange={(e) =>
    setFilters({ ...filters, jobType: e.target.value })
  }
>
  <option value="">All Job Types</option>
  {JOB_TYPES.map((type) => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>
          <select
            className="border p-2 w-full text-sm"
            value={filters.workMode}
            onChange={(e) =>
              setFilters({ ...filters, workMode: e.target.value })
            }
          >
            <option value="">All Work Modes</option>
            {workModes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <input
            className="border p-2 w-full text-sm"
            placeholder="Location"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />

          {/* EXPERIENCE FILTER */}
          <div>
            <p className="text-sm font-medium mb-1">Experience</p>
            <div className="flex flex-wrap gap-2">
              {EXPERIENCE_RANGES.map((e) => {
                const active = filters.experiences.includes(e);
                return (
                  <button
                    key={e}
                    onClick={() => toggleExperience(e)}
                    className={`px-3 py-1 text-xs border rounded ${
                      active ? "bg-purple-600 text-white" : ""
                    }`}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MULTI SKILL */}
          <div>
            <input
              className="border p-2 w-full text-sm"
              placeholder="Type skill & press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {filters.skills.map((s) => (
                <span
                  key={s}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                >
                  {s}
                  <button onClick={() => removeSkill(s)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* SALARY */}
          <div>
            <p className="text-sm font-medium mb-1">
              Salary Range (Monthly)
            </p>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGES.map((r) => {
                const active = filters.salaryRanges.some(
                  (sr) => sr.label === r.label
                );
                return (
                  <button
                    key={r.label}
                    onClick={() => toggleSalaryRange(r)}
                    className={`px-3 py-1 text-xs border rounded ${
                      active ? "bg-green-600 text-white" : ""
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <select
            className="border p-2 w-full text-sm"
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value })
            }
          >
            <option value="latest">Latest Jobs</option>
            <option value="salary">Highest Salary</option>
          </select>

          <button
            onClick={() =>
              setFilters({
                keyword: "",
                industry: "",
                jobType: "",
                workMode: "",
                location: "",
                sort: "latest",
                skills: [],
                salaryRanges: [],
                experiences: [],
              })
            }
            className="text-xs underline"
          >
            Clear All Filters
          </button>
        </div>

        {/* JOB LIST */}
        <div className="md:col-span-3 space-y-4">

          <p className="text-sm text-gray-600">
            Showing {filteredJobs.length} jobs
          </p>

          {filteredJobs.length === 0 ? (
            <div className="bg-white p-6 rounded shadow">
              No jobs match your filters.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}
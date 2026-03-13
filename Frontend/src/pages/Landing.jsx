import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserCheck,
  Building2,
  Search,
  FileText,
  CheckCircle,
  Target,
  Zap,
  ShieldCheck,
  BadgeCheck,
  CircleCheck,
  Sparkles
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleSearch = () => {
    navigate(`/jobs?q=${query}&location=${location}`);
  };
  const [jobs, setJobs] = useState([]);

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
  const quickCategories = [
    //"Remote","Fresher","Internship","Startup","MNC",
   // "Engineering","Software","Sales","Analytics",
   "Remote","Hybrid","Onsite","Fresher","Internship",
    "Software Developer","Frontend Developer","Backend Developer",
  ];

 // const jobs = [
  //  { id: 1, title: "Frontend Developer", location: "Pune, India", type: "Full-Time" },
   // { id: 2, title: "UI/UX Designer", location: "Remote", type: "Contract" },
   // { id: 3, title: "Digital Marketing Executive", location: "Mumbai, India", type: "Full-Time" }
  //];

  const faqs = [
    { q: "How do I apply for jobs?", a: "Create your profile and click Apply Now on any job listing." },
    { q: "Is registration free?", a: "Yes, job seekers can register and apply completely free." },
    { q: "How do employers post jobs?", a: "Employers can create an employer account and post jobs instantly." },
    { q: "Are job listings verified?", a: "Yes, each listing is verified before publishing." },
    { q: "Can I receive job alerts?", a: "Yes, enable notifications to receive personalized alerts." }
  ];

  return (
    <div className="bg-gray-50">

     {/* HERO */}
<section className="py-24 bg-gradient-to-b from-[#f7f4fb] to-white">

  <div className="max-w-6xl mx-auto px-4 text-center">

    {/* TOP BADGE */}
    <div className="inline-flex items-center gap-3 bg-white border rounded-full px-6 py-2 shadow-sm text-sm mb-10">

      <span className="flex items-center gap-2 text-gray-700">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        10,000+ Jobs Available
      </span>

      <span className="text-gray-400">|</span>

      <span className="text-gray-700">
        50,000+ Job Seekers
      </span>

    </div>


    {/* HEADLINE */}
    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">

      Find Your Next Job,{" "}

      <span className="relative inline-block">

        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#ff0066,#8000ff)" }}
        >
          Faster
        </span>

        {/* underline */}
        <span className="absolute left-0 -bottom-2 w-full h-[4px] rounded bg-gradient-to-r from-pink-400 to-purple-400"></span>

      </span>

    </h1>


    {/* SUBTEXT */}
    <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
      Discover thousands of verified opportunities from top startups, MNCs,
      and growing companies
    </p>


    {/* SEARCH BAR */}
    <div className="bg-white rounded-full shadow-xl flex flex-col md:flex-row items-center gap-3 p-3 max-w-4xl mx-auto mt-12">

      <div className="flex items-center gap-2 flex-1 px-4">
        <Search className="text-gray-400" size={18} />
        <input
          className="w-full outline-none text-sm"
          placeholder="Skills, job title or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="hidden md:block h-6 w-px bg-gray-200"></div>

      <div className="flex items-center gap-2 flex-1 px-4">
        <Building2 className="text-gray-400" size={18} />
        <input
          className="w-full outline-none text-sm"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <button
        onClick={handleSearch}
        className="px-8 py-3 text-white rounded-full font-semibold shadow-lg"
        style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        Search
      </button>

    </div>


    {/* POPULAR SEARCHES */}
    <div className="mt-8 flex flex-wrap justify-center gap-3 items-center">

      <span className="text-gray-500 text-sm">
        Popular Searches:
      </span>

      {quickCategories.map((cat) => (
        <button
          key={cat}
        onClick={() => {
     if (cat === "Remote" || cat === "Hybrid" || cat === "Onsite") {
  navigate(`/jobs?workMode=${cat}`);
}
  else if (cat === "Fresher" || cat === "Internship") {
    navigate(`/jobs?jobType=${cat}`);
  }
  else {
    navigate(`/jobs?q=${cat}`);
  }
    }}
          className="bg-white border rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}

    </div>


    {/* TRUST FEATURES */}
    <div className="flex flex-wrap justify-center gap-10 mt-10 text-sm text-gray-600">

      <div className="flex items-center gap-2">
        <CircleCheck size={18} className="text-green-500"/>
        100% Free for Job Seekers
      </div>

      <div className="flex items-center gap-2">
        <CircleCheck size={18} className="text-green-500"/>
        Verified Companies
      </div>

      <div className="flex items-center gap-2">
        <CircleCheck size={18} className="text-green-500"/>
        Quick Apply Process
      </div>

    </div>

  </div>

</section>

{/* STATS */}
<section className="py-16 bg-[#f3f4f6]">

  <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 text-center gap-10">

    <div>
      <h3
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        10,000+
      </h3>
      <p className="text-gray-600 mt-2">
        Active Jobs
      </p>
    </div>


    <div>
      <h3
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        5,000+
      </h3>
      <p className="text-gray-600 mt-2">
        Companies
      </p>
    </div>


    <div>
      <h3
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        50,000+
      </h3>
      <p className="text-gray-600 mt-2">
        Job Seekers
      </p>
    </div>


    <div>
      <h3
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        95%
      </h3>
      <p className="text-gray-600 mt-2">
        Success Rate
      </p>
    </div>

  </div>

</section>


{/* JOB CATEGORIES */}
<section className="py-24 bg-white">

  <div className="max-w-6xl mx-auto px-4 text-center">

    {/* TITLE */}
    <h2 className="text-4xl font-bold text-gray-900">
      Explore Jobs by Category
    </h2>

    <p className="text-gray-600 mt-4">
      Find the perfect role in your field of expertise
    </p>


    {/* CATEGORY GRID */}
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-14">


      {/* IT */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
          <Search size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          IT & Software
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          2,500+ jobs
        </p>

      </div>


      {/* DESIGN */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-4">
          <Sparkles size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          Design
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          850+ jobs
        </p>

      </div>


      {/* MARKETING */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-pink-100 text-pink-600 mb-4">
          <Zap size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          Marketing
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          1,200+ jobs
        </p>

      </div>


      {/* BUSINESS */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4">
          <Target size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          Business
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          1,800+ jobs
        </p>

      </div>


      {/* HEALTHCARE */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-red-100 text-red-500 mb-4">
          <CircleCheck size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          Healthcare
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          950+ jobs
        </p>

      </div>


      {/* HR */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition">

        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-xl bg-orange-100 text-orange-500 mb-4">
          <UserCheck size={26}/>
        </div>

        <h4 className="font-semibold text-gray-900">
          HR
        </h4>

        <p className="text-sm text-gray-500 mt-1">
          600+ jobs
        </p>

      </div>


    </div>

  </div>

</section>

 {/* OPPORTUNITIES */}
      <section className="py-16 text-center">

        <h2 className="text-4xl font-bold text-pink-700 mb-10">
          Current Opportunities
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
            {jobs.slice(0,3).map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow">

              <h3 className="font-semibold text-lg">{job.title}</h3>

              <p className="mt-2">Location: {job.location}</p>
              <p>Type: {job.job_type}</p>

              <button
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="mt-4 px-3 py-1 text-white rounded-full"
                style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
              >
                Apply Now →
              </button>

            </div>
          ))}

        </div>

  {/* VIEW MORE BUTTON */}
  {jobs.length > 3 && (
    <div className="mt-10 text-center">
      <button
        onClick={() => navigate("/jobs")}
        className="px-4 py-2 text-white rounded-full font-semibold shadow-lg"
        style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        View More Jobs →
      </button>
    </div>
  )}

      </section>





     {/* JOB SEEKERS SECTION (NEW DESIGN) */}
<section className="py-20 bg-[#f5f0f7]">

  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-14 items-center">

    {/* LEFT IMAGE */}
    <div className="relative">
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <img
  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
  alt="Job seeker"
  className="w-full h-full object-cover"
/>
      
      </div>
    </div>


    {/* RIGHT CONTENT */}
    <div>

      <span className="bg-white px-4 py-1 rounded-full text-sm text-purple-600 shadow">
        👤 For Job Seekers
      </span>

      <h2 className="text-4xl md:text-5xl font-bold mt-6 text-gray-900">
        Your Career Journey
        <br/>
        Starts Here
      </h2>

      <p className="text-gray-600 mt-5 max-w-lg">
        Join thousands of professionals who found their dream jobs through our
        platform. Create your profile, get discovered, and land the perfect role.
      </p>


      {/* FEATURES */}
      <div className="space-y-6 mt-8">

        <div className="flex gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <CircleCheck size={20} className="text-purple-600"/>
          </div>

          <div>
            <h4 className="font-semibold">100% Free for Job Seekers</h4>
            <p className="text-gray-600 text-sm">
              No hidden charges, complete access to all features
            </p>
          </div>
        </div>


        <div className="flex gap-4">
          <div className="bg-pink-100 p-3 rounded-lg">
            <Sparkles size={20} className="text-pink-600"/>
          </div>

          <div>
            <h4 className="font-semibold">Personalized Job Matches</h4>
            <p className="text-gray-600 text-sm">
              AI-powered recommendations based on your profile
            </p>
          </div>
        </div>


        <div className="flex gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Zap size={20} className="text-blue-600"/>
          </div>

          <div>
            <h4 className="font-semibold">Quick & Easy Applications</h4>
            <p className="text-gray-600 text-sm">
              Apply to multiple jobs with a single click
            </p>
          </div>
        </div>


        <div className="flex gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <ShieldCheck size={20} className="text-green-600"/>
          </div>

          <div>
            <h4 className="font-semibold">Verified Companies Only</h4>
            <p className="text-gray-600 text-sm">
              All job listings from legitimate, verified employers
            </p>
          </div>
        </div>

      </div>


      {/* CTA */}
      <button
        onClick={() => navigate("/register/candidate")}
        className="mt-10 px-8 py-4 text-white rounded-xl font-semibold shadow-lg"
        style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >
        Create Free Account →
      </button>

    </div>

  </div>

</section>


{/* SUCCESS STORIES */}
<section className="py-24 bg-[#f7f4fb]">

  <div className="max-w-6xl mx-auto px-4">

    {/* HEADER */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900">
        Success Stories
      </h2>

      <p className="text-gray-600 mt-4">
        Hear from professionals who found their dream jobs
      </p>
    </div>


    {/* TESTIMONIAL GRID */}
    <div className="grid md:grid-cols-3 gap-8">


      {/* CARD 1 */}
      <div className="bg-[#f1eaf6] p-8 rounded-2xl">

        {/* STARS */}
        <div className="flex text-yellow-400 mb-4">
          ★★★★★
        </div>

        <p className="text-gray-700 italic mb-6">
          "Found my dream job within 2 weeks! The platform made it incredibly
          easy to connect with top companies."
        </p>

        <div className="flex items-center gap-4">

          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">
              Priya Sharma
            </p>

            <p className="text-sm text-gray-500">
              Software Engineer at Google
            </p>
          </div>

        </div>

      </div>


      {/* CARD 2 */}
      <div className="bg-[#f1eaf6] p-8 rounded-2xl">

        <div className="flex text-yellow-400 mb-4">
          ★★★★★
        </div>

        <p className="text-gray-700 italic mb-6">
          "The job recommendations were spot-on. I received multiple offers
          from companies I actually wanted to work for."
        </p>

        <div className="flex items-center gap-4">

          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">
              Rahul Kumar
            </p>

            <p className="text-sm text-gray-500">
              Product Manager at Amazon
            </p>
          </div>

        </div>

      </div>


      {/* CARD 3 */}
      <div className="bg-[#f1eaf6] p-8 rounded-2xl">

        <div className="flex text-yellow-400 mb-4">
          ★★★★★
        </div>

        <p className="text-gray-700 italic mb-6">
          "Best job portal I've used. Simple, fast, and actually works.
          Highly recommended for serious job seekers."
        </p>

        <div className="flex items-center gap-4">

          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">
              Anita Desai
            </p>

            <p className="text-sm text-gray-500">
              Marketing Lead at Microsoft
            </p>
          </div>

        </div>

      </div>


    </div>

  </div>

</section>


     
      {/* FAQ */}
      <section className="py-10 bg-white">

        <div className="max-w-4xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center text-pink-700 mb-12">
            Your Questions, Answered
          </h2>

          {faqs.map((item, i) => (
            <div key={i} className="border rounded-lg mb-4">

              <button
                className="w-full text-left p-4 font-medium"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
              </button>

              {openFaq === i && (
                <div className="px-4 pb-4 text-gray-600">
                  {item.a}
                </div>
              )}

            </div>
          ))}

        </div>

      </section>


      {/* CTA */}
      <section
        className="pt-20 pb-16 text-white text-center mb-0"
        style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
      >

        <h2 className="text-4xl font-bold mb-4">
          Ready to Embrace Digital Change?
        </h2>

        <p className="mb-8">
          Let’s guide you through a seamless transformation process
        </p>

        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold">
          Get Started →
        </button>

      </section>

    </div>
  );
}
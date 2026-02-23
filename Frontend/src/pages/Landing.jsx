import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleSearch = () => {
    navigate(`/jobs?q=${query}&location=${location}`);
  };

  const quickCategories = [
    "Remote","Fresher","Internship","Startup","MNC",
    "Engineering","Software","Sales","Analytics",
  ];

  const jobs = [
    { id: 1, title: "Frontend Developer", location: "Pune, India", type: "Full-Time" },
    { id: 2, title: "UI/UX Designer", location: "Remote", type: "Contract" },
    { id: 3, title: "Digital Marketing Executive", location: "Mumbai, India", type: "Full-Time" }
  ];

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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find your next job, faster
          </h1>

          <p className="text-gray-600 mb-10">
            Thousands of verified jobs from startups, MNCs and growing companies
          </p>

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
              className="text-white px-6 py-2 rounded-full"
              style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
            >
              Search
            </button>
          </div>

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

      {/* STATS */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-center">
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

      {/* OPPORTUNITIES */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold text-pink-700 mb-10">
          Current Opportunities
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="mt-2">Location: {job.location}</p>
              <p>Type: {job.type}</p>

              <button
                className="mt-4 px-6 py-2 text-white rounded-full"
                style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
              >
                Apply Now →
              </button>
            </div>
          ))}
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

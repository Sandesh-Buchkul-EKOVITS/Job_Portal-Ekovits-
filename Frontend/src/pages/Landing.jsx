import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  UserCheck,
  Building2,
  Search,
  CheckCircle,
  Target,
  Zap,
  ShieldCheck,
  CircleCheck,
  Sparkles
} from "lucide-react";

export default function Landing() {

const navigate = useNavigate();

const [query,setQuery] = useState("");
const [location,setLocation] = useState("");
const [jobs,setJobs] = useState([]);
const [openFaq,setOpenFaq] = useState(null);

const handleSearch = () =>{
navigate(`/jobs?q=${query}&location=${location}`);
};

useEffect(()=>{

const fetchJobs = async()=>{
try{

const res = await fetch("http://localhost:5000/api/jobs");
const data = await res.json();

if(data.success){
setJobs(data.jobs);
}

}catch(err){
console.log(err);
}

};

fetchJobs();

},[]);

const quickCategories = [
"Remote","Hybrid","Onsite","Fresher","Internship",
"Software Developer","Frontend Developer","Backend Developer"
];

const faqs = [
{ q:"How do I apply for jobs?", a:"Create your profile and click Apply Now on any job listing." },
{ q:"Is registration free?", a:"Yes, job seekers can register and apply completely free." },
{ q:"How do employers post jobs?", a:"Employers can create an employer account and post jobs instantly." },
{ q:"Are job listings verified?", a:"Yes, each listing is verified before publishing." },
{ q:"Can I receive job alerts?", a:"Yes, enable notifications to receive personalized alerts." }
];

return (

<div className="bg-gray-50">

{/* HERO SECTION */}

<section className="py-16 md:py-24 bg-gradient-to-b from-[#f7f4fb] to-white">

<div className="max-w-6xl mx-auto px-4 text-center">

<div className="inline-flex flex-wrap justify-center items-center gap-3 bg-white border rounded-full px-6 py-2 shadow-sm text-xs md:text-sm mb-8">

<span className="flex items-center gap-2 text-gray-700">
<span className="w-2 h-2 bg-green-500 rounded-full"></span>
10,000+ Jobs Available
</span>

<span className="text-gray-400">|</span>

<span className="text-gray-700">
50,000+ Job Seekers
</span>

</div>

<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight">

Find Your Next Job,

<span className="relative inline-block">

<span
className="bg-clip-text text-transparent"
style={{backgroundImage:"linear-gradient(90deg,#ff0066,#8000ff)"}}
>
Faster
</span>

<span className="absolute left-0 -bottom-2 w-full h-[4px] rounded bg-gradient-to-r from-pink-400 to-purple-400"></span>

</span>

</h1>

<p className="text-gray-600 mt-6 max-w-xl mx-auto text-base md:text-lg">

Discover thousands of verified opportunities from top startups, MNCs and growing companies

</p>

{/* SEARCH BAR */}

<div className="bg-white rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row items-stretch md:items-center gap-3 p-3 max-w-4xl mx-auto mt-10">

<div className="flex items-center gap-2 flex-1 px-4">

<Search className="text-gray-400" size={18}/>

<input
className="w-full outline-none text-sm py-2"
placeholder="Skills, job title or company"
value={query}
onChange={(e)=>setQuery(e.target.value)}
/>

</div>

<div className="hidden md:block h-6 w-px bg-gray-200"></div>

<div className="flex items-center gap-2 flex-1 px-4">

<Building2 className="text-gray-400" size={18}/>

<input
className="w-full outline-none text-sm py-2"
placeholder="Location"
value={location}
onChange={(e)=>setLocation(e.target.value)}
/>

</div>

<button
onClick={handleSearch}
className="w-full md:w-auto px-8 py-3 text-white rounded-xl md:rounded-full font-semibold shadow-lg"
style={{background:"linear-gradient(90deg,#ff0066,#8000ff)"}}
>
Search
</button>

</div>

{/* QUICK SEARCH */}

<div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">

{quickCategories.map((cat)=>(
<button
key={cat}
onClick={()=>{

if(cat==="Remote" || cat==="Hybrid" || cat==="Onsite"){
navigate(`/jobs?workMode=${cat}`);
}

else if(cat==="Fresher" || cat==="Internship"){
navigate(`/jobs?jobType=${cat}`);
}

else{
navigate(`/jobs?q=${cat}`);
}

}}
className="bg-white border rounded-full px-3 py-1 text-xs md:text-sm text-gray-700 hover:bg-gray-100"
>
{cat}
</button>
))}

</div>

</div>

</section>

{/* STATS */}

<section className="py-14 bg-gray-100">

<div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

{[
["10,000+","Active Jobs"],
["5,000+","Companies"],
["50,000+","Job Seekers"],
["95%","Success Rate"]
].map((item,i)=>(
<div key={i}>

<h3
className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent"
style={{backgroundImage:"linear-gradient(90deg,#ff0066,#8000ff)"}}
>
{item[0]}
</h3>

<p className="text-gray-600 mt-2 text-sm md:text-base">
{item[1]}
</p>

</div>
))}

</div>

</section>

{/* JOB CATEGORIES */}

<section className="py-20 bg-white">

<div className="max-w-6xl mx-auto px-4 text-center">

<h2 className="text-3xl md:text-4xl font-bold">
Explore Jobs by Category
</h2>

<p className="text-gray-600 mt-3">
Find the perfect role in your field
</p>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mt-12">

{[
["IT & Software",Search],
["Design",Sparkles],
["Marketing",Zap],
["Business",Target],
["Healthcare",CircleCheck],
["HR",UserCheck]
].map(([title,Icon],i)=>(

<div key={i} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition">

<div className="w-12 h-12 mx-auto flex items-center justify-center rounded-xl bg-purple-100 text-purple-600 mb-3">

<Icon size={24}/>

</div>

<h4 className="font-semibold text-sm md:text-base">
{title}
</h4>

<p className="text-xs text-gray-500 mt-1">
1000+ jobs
</p>

</div>

))}

</div>

</div>

</section>

{/* CURRENT JOBS */}

<section className="py-16 text-center">

<h2 className="text-3xl md:text-4xl font-bold text-pink-700 mb-10">

Current Opportunities

</h2>

<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">

{jobs.slice(0,3).map(job=>(
<div key={job.id} className="bg-white p-5 rounded-xl shadow">

<h3 className="font-semibold text-lg">
{job.title}
</h3>

<p className="mt-2 text-sm">
Location: {job.location}
</p>

<p className="text-sm">
Type: {job.job_type}
</p>

<button
onClick={()=>navigate(`/jobs/${job.id}`)}
className="mt-4 px-4 py-2 text-white rounded-full text-sm"
style={{background:"linear-gradient(90deg,#ff0066,#8000ff)"}}
>
Apply Now →
</button>

</div>
))}

</div>

{jobs.length>3 &&(

<div className="mt-10">

<button
onClick={()=>navigate("/jobs")}
className="px-6 py-3 text-white rounded-full shadow-lg"
style={{background:"linear-gradient(90deg,#ff0066,#8000ff)"}}
>
View More Jobs →
</button>

</div>

)}

</section>

{/* FAQ */}

<section className="py-16 bg-white">

<div className="max-w-4xl mx-auto px-4">

<h2 className="text-2xl md:text-4xl font-bold text-center text-pink-700 mb-10">

Your Questions, Answered

</h2>

{faqs.map((item,i)=>(

<div key={i} className="border rounded-lg mb-4">

<button
className="w-full text-left p-4 font-medium"
onClick={()=>setOpenFaq(openFaq===i?null:i)}
>
{item.q}
</button>

{openFaq===i &&(

<div className="px-4 pb-4 text-gray-600 text-sm">
{item.a}
</div>

)}

</div>

))}

</div>

</section>

{/* CTA */}

<section
className="w-screen relative left-1/2 -translate-x-1/2 py-16 text-white text-center"
style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
>

<div className="max-w-6xl mx-auto px-4">

<h2 className="text-2xl md:text-4xl font-bold mb-4">
Ready to Embrace Digital Change?
</h2>

<p className="mb-6 text-sm md:text-base">
Let’s guide you through a seamless transformation process
</p>

<button className="bg-white text-black px-6 py-3 rounded-full font-semibold">
Get Started →
</button>

</div>

</section>

</div>

);

}
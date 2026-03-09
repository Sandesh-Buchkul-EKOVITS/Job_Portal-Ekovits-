// import { useNavigate } from "react-router-dom";

// export default function Pricing() {
//   const navigate = useNavigate();
//   const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

//   const plans = [
//     {
//       name: "FREE PLAN",
//       price: "₹0 / month",
//       features: [
//         "1 active job",
//         "50 applies total",
//         "Register now, Upgrade your plan anytime with priority support and get attractive discounts."
//       ],
//       highlight: false,
//       discount: false,
//     },
//     {
//       name: "BASIC PLAN",
//       original: 1999,
//       discounted: Math.round(1999 * 0.85),
//       features: [
//         "5 active jobs",
//         "250 applies total",
//         "Basic filters (skill, experience)",
//         "Candidate profile Shortlisting",
//       ],
//       discount: true,
//       highlight: false,
//     },
//     {
//       name: "STANDARD PLAN",
//       original: 3999,
//       discounted: Math.round(3999 * 0.85),
//       features: [
//         "10 active jobs",
//         "600 applies total",
//         "Filters + bulk actions",
//         "Priority hiring support",
//       ],
//       discount: true,
//       highlight: true,
//     },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen py-20 px-4">
//       <div className="max-w-7xl mx-auto text-center">

//         <h1 className="text-4xl font-bold mb-4">
//           Simple Hiring Pricing
//         </h1>
//         <p className="text-gray-600 mb-14">
//           Start free. Upgrade only when hiring grows.
//         </p>

//         <div className="grid md:grid-cols-3 gap-8">

//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className={`bg-white rounded-xl p-8 shadow border relative flex flex-col h-full
//               ${plan.highlight ? "scale-105 border-pink-500" : ""}`}
//             >
//               {plan.highlight && (
//                 <div
//                   className="absolute top-0 right-0 text-white text-xs px-3 py-1 rounded-bl-lg"
//                   style={{ background: gradient }}
//                 >
//                   MOST POPULAR
//                 </div>
//               )}

//               {plan.discount && (
//                 <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-3 py-1 rounded-br-lg">
//                   Early 15% OFF
//                 </div>
//               )}

//               <h3 className="text-xl font-bold mb-3">{plan.name}</h3>

//               {!plan.discount && (
//                 <h2 className="text-3xl font-bold mb-5">{plan.price}</h2>
//               )}

//               {plan.discount && (
//                 <div className="mb-5">
//                   <span className="text-gray-400 line-through mr-2">
//                     ₹{plan.original}
//                   </span>
//                   <span className="text-3xl font-bold">
//                     ₹{plan.discounted} / month
//                   </span>
//                 </div>
//               )}

//               <ul className="mt-6 space-y-3 text-sm text-left text-gray-700">
//                 {plan.features.map((f, i) => (
//                   <li key={i}>✓ {f}</li>
//                 ))}
//               </ul>

//               {/* FIXED SPACING */}
//               <div className="h-6"></div>

//               <button
//                 onClick={() => navigate("/register/employer")}
//                 className="w-full py-3 text-white rounded-lg font-semibold"
//                 style={{ background: gradient }}
//               >
//                 Start Hiring
//               </button>

//             </div>
//           ))}

//         </div>

//         {/* CTA */}
//         <div
//           className="mt-20 p-12 rounded-xl text-white"
//           style={{ background: gradient }}
//         >
//           <h2 className="text-3xl font-bold mb-3">
//             Ready to start hiring smarter?
//           </h2>
//           <p className="mb-6">
//             Create your employer account and start posting jobs in minutes.
//           </p>

//           <button
//             onClick={() => navigate("/register/employer")}
//             className="bg-white text-black px-8 py-3 rounded-full font-semibold"
//           >
//             Create Employer Account →
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }




















import { useNavigate } from "react-router-dom";
import { Target, Zap, ShieldCheck, BadgeCheck } from "lucide-react";

export default function Pricing() {

  const navigate = useNavigate();
  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  const plans = [
    {
      name: "FREE PLAN",
      price: "₹0 / month",
      features: [
        "1 active job",
        "50 applies total",
        "Register now, Upgrade your plan anytime with priority support and get attractive discounts."
      ],
      highlight: false,
      discount: false,
    },
    {
      name: "BASIC PLAN",
      original: 1999,
      discounted: Math.round(1999 * 0.85),
      features: [
        "5 active jobs",
        "250 applies total",
        "Basic filters (skill, experience)",
        "Candidate profile Shortlisting",
      ],
      discount: true,
      highlight: false,
    },
    {
      name: "STANDARD PLAN",
      original: 3999,
      discounted: Math.round(3999 * 0.85),
      features: [
        "10 active jobs",
        "600 applies total",
        "Filters + bulk actions",
        "Priority hiring support",
      ],
      discount: true,
      highlight: true,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* LAUNCH OFFER BAR */}

      <div
        className="w-full text-white text-center py-3 text-xs sm:text-sm font-semibold px-4"
        style={{ background: gradient }}
      >
        🚀 Launch Offer: Post Your First Job FREE — No Credit Card Required
      </div>


      {/* EMPLOYER SECTION */}

      <section className="py-12 sm:py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

          <div>

            <span
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-white"
              style={{ background: gradient }}
            >
              For Employers
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 text-gray-900 leading-tight">
              Hire Top Talent Faster
            </h2>

            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              Access our vast pool of qualified candidates and build your dream team.
              Post jobs, search resumes, and connect with the perfect candidates.
            </p>


            {/* FEATURES */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">

              <div className="flex gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target size={20} className="text-purple-600"/>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Targeted Reach</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Access quality candidates matching your requirements
                  </p>
                </div>
              </div>


              <div className="flex gap-3">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <Zap size={20} className="text-pink-600"/>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Quick Hiring</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Fill positions 3x faster with smart matching
                  </p>
                </div>
              </div>


              <div className="flex gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ShieldCheck size={20} className="text-blue-600"/>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Verified Profiles</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    All candidates undergo verification
                  </p>
                </div>
              </div>


              <div className="flex gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <BadgeCheck size={20} className="text-green-600"/>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Premium Support</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Dedicated account manager support
                  </p>
                </div>
              </div>

            </div>


            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                onClick={() => navigate("/register/employer")}
                className="px-6 py-3 text-white rounded-full font-semibold shadow-lg w-full sm:w-auto"
                style={{ background: gradient }}
              >
                Post a Job →
              </button>

              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
              >
                View Pricing
              </button>

            </div>

          </div>


          {/* RIGHT IMAGE */}

          <div className="rounded-2xl overflow-hidden shadow-xl h-[250px] sm:h-[350px] md:h-[450px]">

            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
              alt="Recruitment interview"
              className="w-full h-full object-cover"
              loading="lazy"
            />

          </div>

        </div>

      </section>



      {/* PRICING SECTION */}

      <section id="pricing" className="py-12 sm:py-16 md:py-20 px-4">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple Hiring Pricing
          </h1>

          <p className="text-gray-600 mb-12 sm:mb-14 text-sm sm:text-base">
            Start free. Upgrade only when hiring grows.
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {plans.map((plan, index) => (

              <div
                key={index}
                className={`bg-white rounded-xl p-6 sm:p-8 shadow border relative flex flex-col h-full transition transform hover:-translate-y-2 hover:shadow-xl
                ${plan.highlight ? "scale-105 border-pink-500" : ""}`}
              >

                {plan.highlight && (
                  <div
                    className="absolute top-0 right-0 text-white text-xs px-3 py-1 rounded-bl-lg"
                    style={{ background: gradient }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {plan.discount && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-xs px-3 py-1 rounded-br-lg">
                    Early 15% OFF
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-bold mb-3">{plan.name}</h3>

                {!plan.discount && (
                  <h2 className="text-2xl sm:text-3xl font-bold mb-5">{plan.price}</h2>
                )}

                {plan.discount && (
                  <div className="mb-5">
                    <span className="text-gray-400 line-through mr-2">
                      ₹{plan.original}
                    </span>

                    <span className="text-2xl sm:text-3xl font-bold">
                      ₹{plan.discounted} / month
                    </span>
                  </div>
                )}

                <ul className="mt-6 space-y-3 text-sm text-left text-gray-700">

                  {plan.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}

                </ul>

                <div className="h-6"></div>

                <button
                  onClick={() => navigate("/register/employer")}
                  className="w-full py-3 text-white rounded-lg font-semibold"
                  style={{ background: gradient }}
                >
                  Start Hiring
                </button>

              </div>

            ))}

          </div>


          {/* CTA */}

          <div
            className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-xl text-white"
            style={{ background: gradient }}
          >

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to start hiring smarter?
            </h2>

            <p className="mb-6 text-sm sm:text-base">
              Create your employer account and start posting jobs in minutes.
            </p>

            <button
              onClick={() => navigate("/register/employer")}
              className="bg-white text-black px-6 sm:px-8 py-3 rounded-full font-semibold"
            >
              Create Employer Account →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}
import { useNavigate } from "react-router-dom";

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
    <div className="bg-gray-50 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          Simple Hiring Pricing
        </h1>
        <p className="text-gray-600 mb-14">
          Start free. Upgrade only when hiring grows.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 shadow border relative flex flex-col h-full
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

              <h3 className="text-xl font-bold mb-3">{plan.name}</h3>

              {!plan.discount && (
                <h2 className="text-3xl font-bold mb-5">{plan.price}</h2>
              )}

              {plan.discount && (
                <div className="mb-5">
                  <span className="text-gray-400 line-through mr-2">
                    ₹{plan.original}
                  </span>
                  <span className="text-3xl font-bold">
                    ₹{plan.discounted} / month
                  </span>
                </div>
              )}

              <ul className="mt-6 space-y-3 text-sm text-left text-gray-700">
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              {/* FIXED SPACING */}
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
          className="mt-20 p-12 rounded-xl text-white"
          style={{ background: gradient }}
        >
          <h2 className="text-3xl font-bold mb-3">
            Ready to start hiring smarter?
          </h2>
          <p className="mb-6">
            Create your employer account and start posting jobs in minutes.
          </p>

          <button
            onClick={() => navigate("/register/employer")}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold"
          >
            Create Employer Account →
          </button>
        </div>

      </div>
    </div>
  );
}

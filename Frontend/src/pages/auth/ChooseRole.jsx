import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChooseRole() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

//   const handleContinue = () => {
//     if (!selectedRole) return;

//     // navigate("/login", {
//     //   state: { role: selectedRole },
//     // });


//     if (selectedRole === "employer") {
//       // localStorage.removeItem("verifiedEmail"); 
//   navigate("/verify-email");
// } else {
//   navigate("/register");
// }

//   };


const handleContinue = () => {
  if (!selectedRole) return;

  if (selectedRole === "employer") {

    // 🔥 VERY IMPORTANT — yahi paste karna hai
    localStorage.removeItem("verifiedEmail");
    sessionStorage.removeItem("otpVerified");

    navigate("/verify-email");
  } else {
    navigate("/register");
  }
};













  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Choose your role
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          Select how you want to use the platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Employer */}
          <div
            onClick={() => setSelectedRole("employer")}
            className="rounded-lg p-6 cursor-pointer transition border"
            style={
              selectedRole === "employer"
                ? {
                    borderColor: "#ff0066",
                    background: "rgba(255,0,102,0.05)",
                  }
                : {}
            }
          >
            <div className="flex justify-center mb-4">
              <div
                className="h-14 w-14 rounded-lg flex items-center justify-center text-2xl text-white"
                style={{
                  background:
                    selectedRole === "employer" ? gradient : "#e5e7eb",
                }}
              >
                🧳
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center">
              Employer
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              Hire and manage candidates
            </p>
          </div>

          {/* Candidate */}
          <div
            onClick={() => setSelectedRole("candidate")}
            className="rounded-lg p-6 cursor-pointer transition border"
            style={
              selectedRole === "candidate"
                ? {
                    borderColor: "#8000ff",
                    background: "rgba(128,0,255,0.05)",
                  }
                : {}
            }
          >
            <div className="flex justify-center mb-4">
              <div
                className="h-14 w-14 rounded-lg flex items-center justify-center text-2xl text-white"
                style={{
                  background:
                    selectedRole === "candidate" ? gradient : "#e5e7eb",
                }}
              >
                👤
              </div>
            </div>
            <h3 className="text-lg font-semibold text-center">
              Candidate
            </h3>
            <p className="text-sm text-gray-500 text-center mt-1">
              Find jobs and apply easily
            </p>
          </div>
        </div>

        {/* CONTINUE BUTTON */}
        <button
          disabled={!selectedRole}
          onClick={handleContinue}
          style={
            selectedRole
              ? { background: gradient }
              : { background: "#e5e7eb" }
          }
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              selectedRole
                ? "text-white hover:opacity-90"
                : "text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

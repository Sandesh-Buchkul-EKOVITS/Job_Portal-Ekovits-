// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function VerifyEmail() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

// const sendOtp = async () => {
//   if (!email) return alert("Enter email");

//   try {
//     const res = await fetch("http://localhost:5000/api/otp/send", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     if (!res.ok) {
//       throw new Error("Server error");
//     }

//     const data = await res.json();
//     console.log("Response:", data);

//     if (data.success) {
//       localStorage.setItem("otpEmail", email);
//       navigate("/verify-otp");
//     } else {
//       alert(data.message);
//     }

//   } catch (error) {
//     console.error("Error:", error);
//     alert("Backend not reachable or server error");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 shadow rounded w-96 space-y-4">
//         <h2 className="text-lg font-semibold">Verify Email</h2>

//         <input
//           type="email"
//           placeholder="Enter Email"
//           className="w-full border p-2 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button
//           onClick={sendOtp}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           Send OTP
//         </button>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  const sendOtp = async () => {
    if (!email) return alert("Enter email");

    try {
      const res = await fetch("http://localhost:5000/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        localStorage.setItem("otpEmail", email);
        navigate("/verify-otp");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Backend not reachable or server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email to verify before registration
          </p>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your official email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
  onClick={sendOtp}
  style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
  className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
>
  Send Verification Code →
</button>


        {/* Footer Text */}
        <p className="text-xs text-gray-400 text-center">
          Your data is secure and private
        </p>

      </div>
    </div>
  );
}

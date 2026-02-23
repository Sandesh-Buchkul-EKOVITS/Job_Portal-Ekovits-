// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function EnterOtp() {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const verifyOtp = async () => {
//     const email = localStorage.getItem("otpEmail");

//     if (!otp) return alert("Enter OTP");

//     const res = await fetch("http://localhost:5000/api/otp/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();

//     if (data.success) {
//     //   localStorage.setItem("verifiedEmail", email);
//     //   localStorage.removeItem("otpEmail");


//       sessionStorage.setItem("otpVerified", "true");


//       navigate("/register/employer");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 shadow rounded w-96 space-y-4">
//         <h2 className="text-lg font-semibold">Enter OTP</h2>

//         <input
//           type="text"
//           placeholder="Enter OTP"
//           className="w-full border p-2 rounded"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />

//         <button
//           onClick={verifyOtp}
//           className="w-full bg-indigo-600 text-white py-2 rounded"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//   );
// }









// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function EnterOtp() {
//   const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
//   const inputsRef = useRef([]);
//   const navigate = useNavigate();

//   const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

//   // Auto focus first box
//   useEffect(() => {
//     inputsRef.current[0]?.focus();
//   }, []);

//   const handleChange = (value, index) => {
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otpArray];
//     newOtp[index] = value;
//     setOtpArray(newOtp);

//     // Move to next input
//     if (value && index < 5) {
//       inputsRef.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otpArray[index] && index > 0) {
//       inputsRef.current[index - 1].focus();
//     }
//   };

//   // Handle Paste
//   const handlePaste = (e) => {
//     const pastedData = e.clipboardData.getData("Text").slice(0, 6);
//     if (!/^\d+$/.test(pastedData)) return;

//     const newOtp = pastedData.split("");
//     while (newOtp.length < 6) newOtp.push("");
//     setOtpArray(newOtp);
//   };

//   const verifyOtp = async () => {
//     const otp = otpArray.join("");
//     const email = localStorage.getItem("otpEmail");

//     if (!otp) return alert("Enter OTP");

//     const res = await fetch("http://localhost:5000/api/otp/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, otp }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       sessionStorage.setItem("otpVerified", "true");
//       navigate("/register/employer");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-6">

//         {/* Header */}
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold">Enter Verification Code</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Enter the 6-digit code sent to your email
//           </p>
//         </div>

//         {/* OTP Boxes */}
//         <div className="flex justify-between" onPaste={handlePaste}>
//           {otpArray.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               ref={(el) => (inputsRef.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           ))}
//         </div>

//         {/* Verify Button */}
//         <button
//           onClick={verifyOtp}
//           style={{ background: gradient }}
//           className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
//         >
//           Verify OTP
//         </button>

//       </div>
//     </div>
//   );
// }










import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EnterOtp() {
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtpArray(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🚀 Important

    const otp = otpArray.join("");
    const email = localStorage.getItem("otpEmail");

    if (!otp) return alert("Enter OTP");

    const res = await fetch("http://localhost:5000/api/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("otpVerified", "true");
      navigate("/register/employer");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Enter Verification Code</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex justify-between" onPaste={handlePaste}>
          {otpArray.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          ))}
        </div>

        <button
  type="submit"  // ✅ Important
  style={{ background: "linear-gradient(90deg,#ff0066,#8000ff)" }}
  className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
>
  Verify OTP
</button>

      </form>
    </div>
  );
}

// export default function DashboardLayout({
//   title,
//   children,
//   showSidebar = false,
// }) {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* {title && (
//           <h1 className="text-2xl font-semibold mb-6">
//             {title}
//           </h1>
//         )} */}

//         <div
//           className={
//             showSidebar
//               ? "grid grid-cols-12 gap-6"
//               : ""
//           }
//         >
//           {/* OPTIONAL SIDEBAR */}
//           {showSidebar && (
//             <aside className="col-span-3 bg-white rounded shadow p-5">
//               <h3 className="font-semibold mb-4">
//                 Menu
//               </h3>
//               <ul className="space-y-3 text-sm text-gray-700">
//                 <li>Overview</li>
//                 <li>Jobs</li>
//                 <li>Applications</li>
//                 <li>Profile</li>
//               </ul>
//             </aside>
//           )}

//           {/* MAIN CONTENT */}
//           <div
//             className={
//               showSidebar ? "col-span-9" : ""
//             }
//           >
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




















import { useNavigate } from "react-router-dom";

export default function DashboardLayout({
  title,
  children,
  showSidebar = false,
}) {
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* 🔥 TOP HEADER WITH LOGOUT */}
        <div className="flex justify-between items-center mb-6">
          {title && (
            <h1 className="text-2xl font-semibold">
              {title}
            </h1>
          )}

          {/* <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-[#7A004B] to-[#CC0047] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
          >
            Logout
          </button> */}
        </div>

        <div
          className={
            showSidebar
              ? "grid grid-cols-12 gap-6"
              : ""
          }
        >
          {/* OPTIONAL SIDEBAR */}
          {showSidebar && (
            <aside className="col-span-3 bg-white rounded shadow p-5">
              <h3 className="font-semibold mb-4">
                Menu
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>Overview</li>
                <li>Jobs</li>
                <li>Applications</li>
                <li>Profile</li>
              </ul>
            </aside>
          )}

          {/* MAIN CONTENT */}
          <div
            className={
              showSidebar ? "col-span-9" : ""
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

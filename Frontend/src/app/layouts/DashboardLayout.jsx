export default function DashboardLayout({
  title,
  children,
  showSidebar = false,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {title && (
          <h1 className="text-2xl font-semibold mb-6">
            {title}
          </h1>
        )}

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

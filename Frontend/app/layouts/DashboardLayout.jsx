export default function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-4 py-3 font-semibold">
        {title}
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}

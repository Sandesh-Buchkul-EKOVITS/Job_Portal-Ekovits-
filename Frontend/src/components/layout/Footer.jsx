export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        
        <div>
          <h4 className="font-semibold mb-3 text-white">JobPortal</h4>
          <p className="text-sm">
            A demo job portal platform for employers and job seekers.
          </p>
        </div>

        <div>
          <h5 className="font-semibold mb-2 text-white">For Job Seekers</h5>
          <ul className="space-y-1 text-sm">
            <li>Browse Jobs</li>
            <li>Create Profile</li>
            <li>Track Applications</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2 text-white">For Employers</h5>
          <ul className="space-y-1 text-sm">
            <li>Post Jobs</li>
            <li>View Applicants</li>
            <li>Manage Hiring</li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold mb-2 text-white">Company</h5>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Pricing</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} JobPortal. Demo Project.
      </div>
    </footer>
  );
}

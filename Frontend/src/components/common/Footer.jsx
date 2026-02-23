export default function Footer() {
  return (
    <footer className="bg-[#0c1a2b] text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">

        <div>
          <h3 className="font-bold mb-3">JobPortal</h3>
          <p className="text-sm text-gray-400">
            Connecting talent with opportunity.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">For Candidates</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Browse Jobs</li>
            <li>Saved Jobs</li>
            <li>Applications</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">For Employers</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Post a Job</li>
            <li>View Applicants</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-400 text-sm border-t border-gray-700 py-6">
        © 2026 JobPortal. All rights reserved.
      </div>
    </footer>
  );
}

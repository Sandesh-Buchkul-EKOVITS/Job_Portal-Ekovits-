export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
        <div>
          <h3 className="text-white font-semibold mb-2">
            JobPortal
          </h3>
          <p>
            Connecting talent with opportunity.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">
            For Candidates
          </h4>
          <ul className="space-y-1">
            <li>Browse Jobs</li>
            <li>Saved Jobs</li>
            <li>Applications</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">
            For Employers
          </h4>
          <ul className="space-y-1">
            <li>Post a Job</li>
            <li>View Applicants</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">
            Company
          </h4>
          <ul className="space-y-1">
            <li>About</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs border-t border-gray-700 py-4">
        © {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
}

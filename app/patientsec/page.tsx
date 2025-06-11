// app/page.tsx

import { FaPlay, FaUserMd, FaHeartbeat, FaStethoscope, FaHospital, FaStar, FaDollarSign, FaShieldAlt } from "react-icons/fa";

export default function MedicalLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl">A</div>
          <span className="font-bold text-2xl text-gray-800">Alpha Hospital</span>
        </div>
        <nav className="hidden md:flex gap-8 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-700">Home</a>
          <a href="#" className="hover:text-blue-700">About Us</a>
          <a href="#" className="hover:text-blue-700">Services</a>
          <a href="#" className="hover:text-blue-700">Pharmacy</a>
        </nav>
        <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
          Log In
        </button>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center gap-12">
        {/* Left */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            A heritage in care.<br />
            A reputation in <span className="text-blue-600">excellence.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Alpha Hospital provides excellent service by prioritizing the safety and security of patients.
          </p>
          <div className="flex items-center gap-5 mb-10">
            <button className="bg-blue-600 text-white px-7 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition">
              Registration
            </button>
            <button className="flex items-center gap-2 text-blue-600 font-semibold hover:underline">
              <span className="bg-blue-50 rounded-full p-2 shadow">
                <FaPlay className="text-blue-600" />
              </span>
              Watch Video About Us
            </button>
          </div>
          {/* Appointment Booking */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center p-5 gap-4 max-w-xl">
            <div className="flex-1">
              <div className="text-xs text-gray-400">Date</div>
              <div className="font-medium text-gray-700">Wed, Feb 14, 2022</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400">Location</div>
              <div className="font-medium text-gray-700">Bristol Branch</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400">Service</div>
              <div className="font-medium text-gray-700">Psychology Consultation</div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>
        {/* Right - Doctors Illustration */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* You can swap this for a custom SVG or illustration */}
          <img
            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=facearea&w=400&q=80"
            alt="Doctors"
            className="w-80 h-96 object-cover rounded-3xl shadow-2xl border-8 border-white"
          />
          {/* Decorative arc */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-blue-100 rounded-t-full z-[-1]" />
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <span className="text-blue-600 font-semibold text-xs tracking-widest">FASTEST SOLUTION</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2">4 easy steps get Your Solution</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StepCard icon={<FaUserMd />} label="Register" />
          <StepCard icon={<FaStethoscope />} label="Choose Service" />
          <StepCard icon={<FaHeartbeat />} label="Book Appointment" />
          <StepCard icon={<FaHospital />} label="Get Solution" />
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FaShieldAlt />}
            title="JCI Accredited"
            desc="Internationally recognized hospital standards."
          />
          <FeatureCard
            icon={<FaStar />}
            title="Best Service"
            desc="Top-rated patient care and support."
          />
          <FeatureCard
            icon={<FaDollarSign />}
            title="Affordable"
            desc="Quality care at reasonable prices."
            highlight
          />
          <FeatureCard
            icon={<FaHospital />}
            title="Top Facility"
            desc="State-of-the-art medical infrastructure."
          />
        </div>
      </section>

      {/* Specialties */}
      <section className="w-full max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Our Specialty</h2>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition flex items-center gap-2">
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpecialtyCard
            icon={<FaStethoscope />}
            title="Surgery"
            color="from-teal-400 to-teal-600"
            desc="Advanced surgical procedures by expert surgeons."
          />
          <SpecialtyCard
            icon={<FaUserMd />}
            title="Consultation"
            color="from-blue-400 to-blue-600"
            desc="Consult with top medical professionals."
          />
          <SpecialtyCard
            icon={<FaHeartbeat />}
            title="Diagnostics"
            color="from-purple-400 to-purple-600"
            desc="Comprehensive diagnostic and lab services."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-100 py-10 mt-12">
        <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">A</div>
              <span className="font-bold text-lg">Alpha Hospital</span>
            </div>
            <p className="text-blue-200 max-w-xs">
              Providing world-class healthcare with compassion and excellence.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            <FooterLinks title="Product" links={["Features", "Pricing", "Documentation"]} />
            <FooterLinks title="Company" links={["About", "Blog", "Careers"]} />
            <FooterLinks title="Resources" links={["Community", "Contact", "Help Center"]} />
            <FooterLinks title="Follow Us" links={["Twitter", "LinkedIn", "GitHub"]} />
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-400 text-sm">
          © 2025 Alpha Hospital. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// Step Card Component
function StepCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 mb-4 text-2xl text-blue-600">
        {icon}
      </div>
      <span className="font-semibold text-gray-700">{label}</span>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  desc,
  highlight,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-xl shadow p-6 flex flex-col items-center text-center ${highlight ? "bg-blue-600 text-white" : "bg-white"}`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-xl ${highlight ? "bg-blue-500 text-white" : "bg-blue-50 text-blue-600"}`}>
        {icon}
      </div>
      <h3 className={`font-bold text-lg mb-1 ${highlight ? "text-white" : "text-gray-800"}`}>{title}</h3>
      <p className={`text-sm ${highlight ? "text-blue-100" : "text-gray-500"}`}>{desc}</p>
    </div>
  );
}

// Specialty Card Component
function SpecialtyCard({
  icon,
  title,
  color,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start">
      <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 bg-gradient-to-br ${color} text-white text-2xl`}>
        {icon}
      </div>
      <h4 className="font-bold text-lg mb-1 text-gray-800">{title}</h4>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  );
}

// Footer Links Component
function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h5 className="font-semibold mb-2">{title}</h5>
      <ul className="space-y-1 text-sm">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:underline hover:text-blue-300">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

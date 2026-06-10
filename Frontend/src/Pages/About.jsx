import { Bus, MapPin, Users, Cpu, Github, Linkedin, Mail, Zap, ShieldCheck, Clock } from 'lucide-react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router';

const team = [
  {
    name: 'Teja',
    role: 'Full Stack Developer',
    desc: 'Built the MERN backend, REST APIs, and IoT integration with ESP32.',
    icon: '👨‍💻',
  },
  {
    name: 'IoT Engineer',
    role: 'Hardware & Firmware',
    desc: 'Designed the ESP32 sensor system for real-time passenger counting.',
    icon: '🔧',
  },
  {
    name: 'UI Designer',
    role: 'Frontend & UX',
    desc: 'Crafted the responsive interface and user experience design.',
    icon: '🎨',
  },
];

const techStack = [
  { label: 'React', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
  { label: 'Node.js', icon: '🟩', color: 'from-green-500 to-emerald-600' },
  { label: 'Express', icon: '🚀', color: 'from-gray-500 to-gray-700' },
  { label: 'MongoDB', icon: '🍃', color: 'from-green-600 to-teal-600' },
  { label: 'ESP32', icon: '📡', color: 'from-blue-500 to-indigo-600' },
  { label: 'Tailwind', icon: '🎨', color: 'from-sky-400 to-cyan-500' },
];

const values = [
  {
    icon: <Zap className="w-7 h-7" />,
    title: 'Real-Time',
    desc: 'Live passenger data pushed from IoT sensors every few seconds.',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: 'Reliable',
    desc: 'Built on robust MongoDB time-series data and Express REST APIs.',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Always On',
    desc: 'Deployed on Render with 24/7 availability for passengers and conductors.',
  },
];

const About = () => {
  return (
    <div data-theme="forest" className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-amber-900 text-white">
      <Header />

      {/* ── Hero Banner ── */}
      <section className="relative pt-36 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative inline-flex items-center gap-3 bg-white/10 border border-white/20 px-5 py-2 rounded-full text-amber-300 text-sm font-medium mb-6 backdrop-blur-md">
          <Bus className="w-4 h-4" />
          Smart Village Bus System
        </div>

        <h1 className="relative text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent tracking-wide leading-tight mb-6">
          About SmartBus
        </h1>
        <p className="relative max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
          A real-time IoT-powered bus tracking platform built to solve everyday commuting
          problems in smart villages — from seat availability to live passenger counts.
        </p>
      </section>

      {/* ── Mission ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-amber-500 p-6 rounded-2xl shadow-lg">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              SmartBus was built to bridge the gap between passengers and public transport.
              By combining IoT hardware (ESP32) with a modern MERN stack, we provide
              real-time seat availability, route information, and passenger monitoring —
              all in one platform. Our goal is to make rural and semi-urban commuting
              smarter, transparent, and hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why SmartBus ── */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
          Why SmartBus?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:scale-105 hover:shadow-amber-500/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-500 to-amber-500 p-4 rounded-xl text-white mb-5 shadow-md">
                {v.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{v.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
          {techStack.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-md hover:scale-110 transition-all duration-300 cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-2xl shadow-md`}>
                {t.icon}
              </div>
              <span className="text-sm font-semibold text-gray-200">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="relative flex flex-col md:flex-row items-start gap-6">
          {[
            { step: '01', icon: <Cpu className="w-6 h-6" />, title: 'ESP32 Counts Passengers', desc: 'The IoT sensor on the bus detects passengers boarding and alighting in real time.' },
            { step: '02', icon: <Zap className="w-6 h-6" />, title: 'Data Sent to Server', desc: 'Passenger count is posted to our Express API and stored in MongoDB.' },
            { step: '03', icon: <Users className="w-6 h-6" />, title: 'Live UI Update', desc: 'The React frontend fetches live seat availability and displays it to passengers.' },
          ].map((item, i) => (
            <div key={i} className="flex-1 relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-7 shadow-lg hover:shadow-amber-400/20 hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-4 -left-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-xs font-black px-3 py-1 rounded-full shadow-md">
                {item.step}
              </div>
              <div className="inline-flex items-center justify-center bg-white/10 p-3 rounded-xl text-amber-400 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{member.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <span className="inline-block text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full mb-3">
                {member.role}
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">{member.desc}</p>
              <div className="flex justify-center gap-4 mt-5">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Github className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-28 max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-blue-800/60 to-amber-700/40 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-white bg-clip-text text-transparent">
            Ready to Ride Smarter?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Check live bus availability and plan your journey right now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/Routes"
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Find My Bus
            </Link>
            <Link
              to="/queries"
              className="px-8 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              Submit a Query
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

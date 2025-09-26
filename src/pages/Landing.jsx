import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaMapMarkedAlt,
  FaUserShield,
  FaUserTie,
  FaRoute,
  FaClock,
  FaGlobeAmericas,
} from "react-icons/fa";
import { motion } from "framer-motion";

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700"; // Deep Blue for main text/headers
const ACCENT_COLOR = "bg-cyan-500"; // Vibrant Cyan/Aqua for CTAs and highlights
const ACCENT_TEXT = "text-white"; 
const HOVER_ACCENT = "hover:bg-cyan-600";
const HOVER_PRIMARY = "hover:text-blue-800";


// --- Data for Roles & Features Section ---
const roles = [
  {
    icon: FaUserTie,
    title: "Commuter (User)",
    desc: "View live map, routes, and stops. Plan journeys efficiently with real-time ETA.",
    color: "text-blue-500", // Lighter blue for icons
  },
  {
    icon: FaBus,
    title: "Driver / Operator",
    desc: "Update trips, track assigned vehicles, and manage routes and status in real-time.",
    color: "text-blue-500",
  },
  {
    icon: FaUserShield,
    title: "Administrator",
    desc: "Manage drivers, vehicles, routes, stops, and monitor overall transport operations.",
    color: "text-blue-500",
  },
];

// --- Data for How It Works Section ---
const howItWorks = [
  {
    icon: FaMapMarkedAlt,
    title: "Real-Time Map",
    desc: "See the live locations of all public vehicles on an intuitive map.",
  },
  {
    icon: FaRoute,
    title: "Optimized Routes",
    desc: "Browse detailed routes, scheduled stops, and expected service times.",
  },
  {
    icon: FaClock,
    title: "Instant ETAs",
    desc: "Get accurate Estimated Time of Arrivals to perfectly time your trip.",
  },
  {
    icon: FaBus,
    title: "Seamless Tracking",
    desc: "Follow your assigned vehicle or bus with real-time updates for smooth travel.",
  },
];

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    // MAIN CONTAINER: White Background
    <div className="relative min-h-screen bg-white text-gray-800 flex flex-col overflow-hidden">
      
      {/* Background Bus Animation (Made subtle and blue) */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-5" // Very subtle opacity
        initial="hidden"
        animate="visible"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-300 text-3xl" 
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: "-10%",
            }}
            animate={{ x: "110%" }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <FaBus />
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="flex justify-between items-center p-6 relative z-20 bg-white shadow-lg border-b border-gray-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center space-x-2">
            <FaGlobeAmericas className={`text-3xl ${PRIMARY_COLOR}`} />
            <h1 className={`text-3xl font-bold tracking-wider ${PRIMARY_COLOR}`}>TransitNow</h1>
        </div>
        
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className={`px-4 py-2 border-2 border-blue-500 ${PRIMARY_COLOR} font-semibold rounded-lg ${HOVER_ACCENT} hover:text-white transition shadow-md`}
          >
            Log In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={`px-4 py-2 ${ACCENT_COLOR} ${ACCENT_TEXT} font-semibold rounded-lg ${HOVER_ACCENT} transition shadow-md`}
          >
            Sign Up
          </button>
        </div>
      </motion.nav>
      
      {/* Main Content Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">

        {/* Hero Section */}
        <motion.div
          className="w-full max-w-6xl flex flex-col justify-center items-center text-center px-6 py-12"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h2
            className={`text-6xl font-extrabold mb-6 tracking-tight ${PRIMARY_COLOR}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-cyan-500">Real-Time</span> Public Transport Tracking
          </motion.h2>

          <motion.p
            className="text-2xl mb-10 max-w-3xl font-light text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Never miss your bus again. **Track**, **Plan**, and **Commute** confidently with live vehicle locations and accurate ETAs.
          </motion.p>

          <motion.div
            className="space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <button
              onClick={() => navigate("/login")}
              className={`px-8 py-4 ${ACCENT_COLOR} ${ACCENT_TEXT} font-bold text-lg rounded-xl shadow-xl ${HOVER_ACCENT} hover:scale-105 transition transform duration-300`}
            >
              Start Tracking Now! 🚀
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`px-8 py-4 border-2 border-blue-500 ${PRIMARY_COLOR} font-semibold text-lg rounded-xl hover:bg-blue-50 hover:scale-105 transition transform duration-300`}
            >
              How It Works
            </button>
          </motion.div>
        </motion.div>

        {/* Separator / Spacer */}
        <div className="w-full max-w-6xl h-16"></div> 

        {/* Roles & Features Section */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-10 w-full max-w-6xl shadow-xl mx-auto border border-gray-100" // Light gray background for contrast
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          <h3 className={`text-4xl font-bold mb-10 text-center ${PRIMARY_COLOR}`}>Who We Serve</h3>
          <div className="grid md:grid-cols-3 gap-10 text-gray-800">
            {roles.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition transform duration-300 border-t-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
              >
                <item.icon className={`text-6xl mb-4 ${item.color}`} />
                <h4 className="font-bold text-2xl mb-2 text-blue-700">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Separator / Spacer */}
        <div className="w-full max-w-6xl h-16"></div> 

        {/* How It Works Section */}
        <motion.div
          className="bg-gray-50 rounded-2xl p-10 w-full max-w-6xl shadow-xl mx-auto mb-16 border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
        >
          <h3 className={`text-4xl font-bold mb-10 text-center ${PRIMARY_COLOR}`}>Quick Tour: How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8 text-gray-800">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-4 bg-white rounded-lg hover:shadow-lg transition transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index }}
              >
                <div className={`text-white bg-blue-600 p-3 rounded-full mb-4 shadow-md`}>
                    <step.icon className="text-3xl" />
                </div>
                <h4 className="font-bold text-xl mb-2 text-blue-700">{step.title}</h4>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={`text-center py-6 bg-blue-700 text-white relative z-20`}>
        &copy; {new Date().getFullYear()} TransitNow. All rights reserved.
      </footer>
    </div>
  );
}
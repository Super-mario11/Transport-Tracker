import React from "react";
import { useNavigate } from "react-router-dom"; // Don't forget to import useNavigate
import { FaBus, FaLightbulb, FaRocket, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700"; // Deep Blue
const ACCENT_COLOR = "bg-cyan-500"; // Vibrant Cyan
const ACCENT_TEXT = "text-white"; 

// --- Animation Variants ---
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 10,
      duration: 0.8
    } 
  },
};

// --- Data Cards ---
const aboutCards = [
  {
    title: "Our Vision: Reliable Commuting",
    icon: FaLightbulb,
    description: "We envision a small city where every commuter trusts public transport. No more guesswork or long waits at the stop—just simple, predictable travel for everyone.",
    color: "text-blue-500",
  },
  {
    title: "Our Mission: Empowering Cities",
    icon: FaRocket,
    description: "Our mission is to equip small city transport systems with powerful, yet easy-to-use, real-time tracking technology. This improves efficiency for operators and saves time for riders.",
    color: "text-cyan-500",
  },
  {
    title: "Our Technology: Live & Accurate",
    icon: FaMapMarkedAlt,
    description: "Built on modern web technologies, our tracker provides sub-minute updates on vehicle locations, routes, and estimated arrival times, ensuring you're always informed.",
    color: "text-indigo-500",
  },
];

export default function About() {
  // 1. Initialize useNavigate
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaBus className={`text-6xl mx-auto mb-4 ${PRIMARY_COLOR}`} />
          <h1 className={`text-5xl font-extrabold mb-4 ${PRIMARY_COLOR}`}>
            About TransitNow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making public transport reliable, one small city at a time.
          </p>
        </motion.header>

        {/* --- Narrative Section --- */}
        <motion.section
          className="bg-white p-10 rounded-xl shadow-xl mb-16 border-l-4 border-blue-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
        >
          <h2 className={`text-3xl font-bold mb-4 ${PRIMARY_COLOR}`}>The Challenge We Solve</h2>
          <p className="text-lg text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
            In many small and mid-sized cities, public transport often lacks real-time visibility. This leads to **uncertainty** for commuters and **inefficiency** for transport operators. We built TransitNow to bridge this gap, transforming scheduled transport into a predictable, modern service. Our platform connects riders, drivers, and administrators, creating a seamless ecosystem powered by **live data**.
          </p>
        </motion.section>
        
        {/* --- Vision, Mission, Tech Cards Section --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {aboutCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg border-t-8 border-cyan-500 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariant}
              transition={{ delay: index * 0.1 }}
            >
              <card.icon className={`text-5xl mb-4 ${card.color}`} />
              <h3 className={`text-2xl font-bold mb-3 ${PRIMARY_COLOR}`}>{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* --- CTA / Join Section --- */}
        <motion.section
          className="mt-16 text-center p-10 rounded-xl bg-blue-700 text-white shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Commute Smarter?</h2>
          <p className="text-lg mb-6">Join the movement for more reliable public transport in your city.</p>
          <button
            // 2. Updated onClick to navigate to /home
            onClick={() => navigate("/home")}
            className={`px-8 py-3 rounded-lg font-bold text-lg ${ACCENT_COLOR} ${ACCENT_TEXT} hover:bg-cyan-600 transition shadow-lg`}
          >
            Get Started Now
          </button>
        </motion.section>

      </div>
    </div>
  );
}
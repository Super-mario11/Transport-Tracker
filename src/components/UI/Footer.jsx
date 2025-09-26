import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBus, FaEnvelope, FaMapMarkerAlt, FaPhone, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

// --- Custom Colors ---
const BG_COLOR = "bg-blue-700"; // Deep Blue background
const TEXT_COLOR = "text-white";
const ACCENT_HOVER = "hover:text-cyan-400"; // Vibrant Cyan hover effect

export default function Footer() {
  const navigate = useNavigate();

  // Data for quick links
  const quickLinks = [
    { name: "Home", path: "/home" },
    { name: "About Us", path: "/about" },
    { name: "Log In", path: "/login" },
    { name: "Sign Up", path: "/signup" },
    { name: "Admin Dashboard", path: "/admin-dashboard" },
  ];

  return (
    <footer className={`${BG_COLOR} ${TEXT_COLOR} pt-12 border-t border-blue-600`}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Column 1: Branding and Mission */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FaBus className="text-3xl text-cyan-400" />
            <h3 className="text-2xl font-bold tracking-wider">TransitNow</h3>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            The next generation of real-time public transport tracking. Built to make commuting efficient and reliable for small cities.
          </p>
          <p className="text-sm pt-2">
            <span className="font-semibold">Smarter Commute. Smarter City.</span>
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-5 border-b border-blue-500 pb-2">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => navigate(link.path)}
                  className={`text-gray-200 text-sm transition-colors ${ACCENT_HOVER} focus:outline-none`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact and Social */}
        <div>
          <h4 className="text-xl font-semibold mb-5 border-b border-blue-500 pb-2">Get In Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span>City Transit Hub, 101 Tracker Ave</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaEnvelope className="text-cyan-400" />
              <a href="mailto:support@transitnow.com" className={`transition-colors ${ACCENT_HOVER}`}>
                support@transitnow.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <FaPhone className="text-cyan-400" />
              <a href="tel:+1234567890" className={`transition-colors ${ACCENT_HOVER}`}>
                (123) 456-7890
              </a>
            </li>
          </ul>
          
          <div className="flex space-x-4 mt-6">
            <a href="#" aria-label="Twitter" className={`text-2xl transition-colors ${ACCENT_HOVER}`}>
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className={`text-2xl transition-colors ${ACCENT_HOVER}`}>
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Facebook" className={`text-2xl transition-colors ${ACCENT_HOVER}`}>
              <FaFacebook />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar (The original content) */}
      <div className="text-center py-5 mt-12 border-t border-blue-600">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TransitNow. All rights reserved. | Built with passion for small cities 🚍
        </p>
      </div>
    </footer>
  );
}
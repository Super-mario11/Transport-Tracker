import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white/20 backdrop-blur-md fixed top-0 z-50">
      <div className="text-white font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
        TransportTracker
      </div>
      <div className="space-x-6">
        <Link to="/about" className="text-white hover:text-yellow-400 transition">
          About
        </Link>
        <Link to="/contact" className="text-white hover:text-yellow-400 transition">
          Contact
        </Link>
        <Link
          to="/login"
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

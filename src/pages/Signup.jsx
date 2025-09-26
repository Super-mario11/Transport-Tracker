import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserPlus, FaBus } from "react-icons/fa";

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700";
const ACCENT_COLOR = "bg-cyan-500";
const HOVER_ACCENT = "hover:bg-cyan-600";
const RING_FOCUS = "focus:ring-blue-500";
const INPUT_BORDER = "border-gray-300";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("❌ Passwords do not match.");
      return;
    }

    if (password.length < 6) {
        setError("❌ Password must be at least 6 characters.");
        return;
    }
    
    // Call the signup function
    const result = signup(email, password);
    
    if (result.success) {
      navigate("/home"); // Redirect to User Home Page
    } else {
      // Handle error from context (e.g., user exists)
      setError(result.message || "❌ Account creation failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 transform hover:shadow-3xl transition duration-300"
      >
        {/* Branding/Header Section */}
        <div className="flex flex-col items-center mb-8">
          <FaBus className={`text-5xl mb-2 ${PRIMARY_COLOR}`} />
          <h2 className={`text-3xl font-extrabold ${PRIMARY_COLOR}`}>Create Your TransitNow Account</h2>
          <p className="text-sm text-gray-500 mt-1">Start tracking your commute in real-time!</p>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 mb-4 text-center font-medium">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., new.user@commuter.com"
              className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS} focus:border-blue-500 transition`}
              required
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS} focus:border-blue-500 transition`}
              required
            />
          </div>
          
          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS} focus:border-blue-500 transition`}
              required
            />
          </div>
          
          {/* Submit Button (CTA) */}
          <button
            type="submit"
            className={`w-full ${ACCENT_COLOR} text-white font-bold p-3 mt-6 rounded-lg shadow-lg ${HOVER_ACCENT} transition transform hover:scale-[1.01] flex items-center justify-center`}
          >
            <FaUserPlus className="mr-2" />
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`font-semibold ${PRIMARY_COLOR} hover:underline`}
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

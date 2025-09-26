import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBus, FaSignInAlt } from "react-icons/fa";

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700"; // Deep Blue
const ACCENT_COLOR = "bg-cyan-500"; // Vibrant Cyan for CTA
const HOVER_ACCENT = "hover:bg-cyan-600";
const RING_FOCUS = "focus:ring-blue-500";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Call the unified login function from AuthContext
    const result = login(email, password);

    if (result.success) {
      // Redirect ALL successful logins to the main protected dashboard
      navigate("/home"); 
    } else {
      setError(result.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 transform hover:shadow-3xl transition duration-300"
      >
        {/* Branding/Header Section */}
        <div className="flex flex-col items-center mb-8">
          <FaBus className={`text-5xl mb-2 ${PRIMARY_COLOR}`} />
          <h2 className={`text-3xl font-extrabold ${PRIMARY_COLOR}`}>Sign In to TransitNow</h2>
          <p className="text-sm text-gray-500 mt-1">Access your real-time transport platform.</p>
        </div>
        
        {/* Helper text for Demo Credentials */}
        <p className="text-center text-sm text-gray-600 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          Demo: **user/admin/driver@example.com**
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-lg border border-red-200 mb-4 text-center font-medium">
            {error}
          </p>
        )}

        {/* Input: Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="e.g., user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS} focus:border-blue-500 transition`}
            required
          />
        </div>
        
        {/* Input: Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS} focus:border-blue-500 transition`}
            required
          />
        </div>

        {/* Submit Button (CTA) */}
        <button
          type="submit"
          className={`w-full ${ACCENT_COLOR} text-white font-bold p-3 rounded-lg shadow-lg ${HOVER_ACCENT} transition transform hover:scale-[1.01] flex items-center justify-center`}
        >
          <FaSignInAlt className="mr-2" />
          Log In
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            type="button" 
            onClick={() => navigate("/signup")}
            className={`font-semibold ${PRIMARY_COLOR} hover:underline`}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}

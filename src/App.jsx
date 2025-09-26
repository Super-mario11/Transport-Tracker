// super-mario11/transport-tracker/.../src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
// REMOVE: AuthProvider is now in main.jsx
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Landing from "./pages/Landing";
import UserHome from "./pages/UserHome"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import DriverPanel from "./pages/DriverPanel";
// NOTE: Removed imports for unused pages (Route, Stop, Vehicles, Home)

export default function App() {
  return (
    // Only Routes are needed here
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Main Protected Dashboard for ALL Logged-In Users */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />
      
      {/* Role-Specific Panels (Accessed by links inside UserHome) */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/driver-panel"
        element={
          <ProtectedRoute role="driver">
            <DriverPanel />
          </ProtectedRoute>
        }
      />
      
      {/* Add a 404/fallback route here if available */}
    </Routes>
  );
}
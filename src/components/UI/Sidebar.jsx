import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">PT Tracker</h1>
      <nav className="flex flex-col gap-3">
        <Link className="hover:bg-blue-50 px-3 py-2 rounded text-gray-700 font-medium" to="/">Home</Link>
        <Link className="hover:bg-blue-50 px-3 py-2 rounded text-gray-700 font-medium" to="/admin">Admin</Link>
        <Link className="hover:bg-blue-50 px-3 py-2 rounded text-gray-700 font-medium" to="/driver">Driver</Link>
      </nav>
      <div className="mt-auto text-gray-400 text-sm">
        © 2025 PT Tracker
      </div>
    </div>
  );
}

import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Manage Drivers" },
          { name: "Manage Vehicles" },
          { name: "Manage Routes" },
          { name: "Manage Stops" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-center cursor-pointer"
          >
            <h3 className="font-semibold text-xl mb-3">{item.name}</h3>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

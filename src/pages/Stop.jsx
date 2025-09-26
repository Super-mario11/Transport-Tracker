import React from "react";

const stopsData = [
  { id: 1, name: "Station 1", route: "Route A" },
  { id: 2, name: "Station 2", route: "Route A" },
  { id: 3, name: "Station 3", route: "Route B" },
  { id: 4, name: "Station 4", route: "Route B" },
];

export default function Stop() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Stops</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stopsData.map((stop) => (
          <div
            key={stop.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg mb-1">{stop.name}</h3>
            <p className="text-gray-600">Route: {stop.route}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

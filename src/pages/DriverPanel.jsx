import React from "react";

const tripsData = [
  { id: 1, vehicle: "Bus 101", route: "Route A", status: "Ongoing" },
  { id: 2, vehicle: "Bus 202", route: "Route B", status: "Pending" },
];

export default function DriverPanel() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Driver Panel</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {tripsData.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl mb-2">{trip.vehicle}</h3>
            <p className="text-gray-600">Route: {trip.route}</p>
            <p className="text-gray-600">Status: {trip.status}</p>
            <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

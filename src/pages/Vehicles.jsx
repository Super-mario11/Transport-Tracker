import React from "react";
import { FaBus } from "react-icons/fa";

const vehiclesData = [
  { id: 1, name: "Bus 101", route: "Route A", status: "Active" },
  { id: 2, name: "Bus 202", route: "Route B", status: "Inactive" },
  { id: 3, name: "Bus 303", route: "Route C", status: "Active" },
];

export default function Vehicles() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Vehicles</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehiclesData.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition flex items-center"
          >
            <FaBus className="text-blue-500 text-3xl mr-4" />
            <div>
              <h3 className="font-semibold text-xl">{vehicle.name}</h3>
              <p className="text-gray-600">Route: {vehicle.route}</p>
              <p
                className={`text-sm font-medium ${
                  vehicle.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {vehicle.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

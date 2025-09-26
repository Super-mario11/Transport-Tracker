import React from "react";
import { FaBus, FaMapMarkedAlt } from "react-icons/fa";

const routesData = [
  { id: 1, name: "Route A", start: "Station 1", end: "Station 5", stops: 5 },
  { id: 2, name: "Route B", start: "Station 2", end: "Station 8", stops: 7 },
  { id: 3, name: "Route C", start: "Station 3", end: "Station 10", stops: 8 },
];

export default function RoutesPage() {
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Routes</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routesData.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <div className="flex items-center mb-3">
              <FaMapMarkedAlt className="text-blue-500 text-2xl mr-3" />
              <h3 className="font-semibold text-xl">{route.name}</h3>
            </div>
            <p className="text-gray-600">
              Start: <span className="font-medium">{route.start}</span>
            </p>
            <p className="text-gray-600">
              End: <span className="font-medium">{route.end}</span>
            </p>
            <p className="text-gray-600">Stops: {route.stops}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

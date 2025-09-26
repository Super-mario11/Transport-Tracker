import React from "react";

export default function FleetList({ vehicles }) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-2">Fleet List</h3>
      <ul>
        {vehicles.map((v) => (
          <li key={v.id}>
            {v.name} – Status: {v.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

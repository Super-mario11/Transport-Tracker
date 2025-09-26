import React from "react";

export default function StopDetails({ stop }) {
  if (!stop) return <p>No stop selected</p>;

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">{stop.name}</h3>
      <p>Stop ID: {stop.id}</p>
      <p>Location: {stop.lat}, {stop.lng}</p>
      {/* Future: upcoming arrivals */}
    </div>
  );
}

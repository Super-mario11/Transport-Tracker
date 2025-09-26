import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function MapView() {
  const defaultPosition = [28.6139, 77.2090]; // New Delhi

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[500px] rounded-xl shadow-md"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={defaultPosition}>
        <Popup>Sample Bus 🚍</Popup>
      </Marker>
    </MapContainer>
  );
}

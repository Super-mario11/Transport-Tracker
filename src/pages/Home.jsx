import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FaBus, FaFilter, FaSearch, FaClock } from "react-icons/fa"; // Added icons

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700"; // Deep Blue for headers/main text
const ACCENT_COLOR_BG = "bg-cyan-500"; // Vibrant Cyan for highlights/buttons
const INPUT_BORDER = "border-gray-300";
const RING_FOCUS = "focus:ring-blue-500";

// Bus icon (Using a cleaner, higher-res icon if available, otherwise using the placeholder)
// NOTE: Ensure this URL is accessible or replace with a locally saved asset.
const customBusIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png", // Your original flaticon URL
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -20]
});

export default function LiveTrackingMapPage() {
    const [vehicles, setVehicles] = useState([
        { id: 1, lat: 28.6139, lng: 77.209, name: "Bus 101", route: "A", nextStop: "Central Station X", eta: 5 },
        { id: 2, lat: 28.615, lng: 77.21, name: "Bus 205", route: "B", nextStop: "University Gate Y", eta: 8 },
        { id: 3, lat: 28.614, lng: 77.208, name: "Bus 103", route: "A", nextStop: "City Mall Z", eta: 3 },
    ]);

    const [search, setSearch] = useState("");
    const [routeFilter, setRouteFilter] = useState("");

    // Simulate real-time vehicle movement
    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles((prev) =>
                prev.map((v) => ({
                    ...v,
                    lat: v.lat + (Math.random() - 0.5) * 0.0005,
                    lng: v.lng + (Math.random() - 0.5) * 0.0005,
                    eta: Math.max(0, v.eta - 0.1), // reduce ETA gradually
                }))
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Filter and search vehicles
    const displayedVehicles = vehicles.filter(
        (v) =>
            (routeFilter === "" || v.route === routeFilter) &&
            (v.name.toLowerCase().includes(search.toLowerCase()) || 
             v.route.toLowerCase().includes(search.toLowerCase()))
    );
    
    // Determine available routes dynamically
    const availableRoutes = [...new Set(vehicles.map(v => v.route))].sort();


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-6">
            
            {/* Header */}
            <h2 className={`text-4xl font-extrabold text-center mb-8 ${PRIMARY_COLOR} flex items-center justify-center`}>
                <FaBus className="mr-3 text-cyan-500" />
                Live Vehicle Tracking
            </h2>

            {/* Filters and Search Area (Styled) */}
            <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-center items-center gap-4 mb-6 border-b border-gray-100">
                
                {/* Search Input */}
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vehicle or route..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`pl-10 pr-3 py-2 border ${INPUT_BORDER} rounded-lg w-full focus:outline-none focus:ring-2 ${RING_FOCUS}`}
                    />
                </div>
                
                {/* Route Filter Select */}
                <div className="relative w-full md:w-1/4">
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={routeFilter}
                        onChange={(e) => setRouteFilter(e.target.value)}
                        className={`pl-10 pr-3 py-2 border ${INPUT_BORDER} rounded-lg w-full appearance-none focus:outline-none focus:ring-2 ${RING_FOCUS} cursor-pointer`}
                    >
                        <option value="">All Routes</option>
                        {availableRoutes.map(route => (
                            <option key={route} value={route}>Route {route}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Map Container */}
            <div className="flex justify-center mb-6">
                <MapContainer
                    center={[28.6139, 77.209]}
                    zoom={14}
                    scrollWheelZoom={true}
                    // Applied modern styling and set width/height for responsive fill
                    className="w-full max-w-6xl h-[65vh] rounded-xl overflow-hidden shadow-xl border-4 border-blue-500"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    {displayedVehicles.map((v) => (
                        <Marker key={v.id} position={[v.lat, v.lng]} icon={customBusIcon}>
                            <Popup>
                                <strong className={PRIMARY_COLOR}>{v.name}</strong>
                                <br />
                                Route: <span className="font-semibold text-blue-600">{v.route}</span>
                                <br />
                                Next Stop: {v.nextStop}
                                <br />
                                <div className="flex items-center text-cyan-600 font-bold mt-1">
                                    <FaClock className="mr-1 text-sm"/> ETA: {v.eta.toFixed(1)} mins
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Vehicles Info Table (Styled) */}
            <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-xl">
                <h3 className={`text-xl font-semibold mb-4 ${PRIMARY_COLOR}`}>Filtered Vehicles Summary ({displayedVehicles.length} Active)</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full border-collapse text-gray-700">
                        <thead>
                            <tr className="bg-blue-600 text-white text-left shadow-md">
                                <th className="px-4 py-3 rounded-tl-lg">Vehicle</th>
                                <th className="px-4 py-3">Route</th>
                                <th className="px-4 py-3">Next Stop</th>
                                <th className="px-4 py-3 rounded-tr-lg">ETA (mins)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedVehicles.length > 0 ? (
                                displayedVehicles.map((v, index) => (
                                    <tr 
                                        key={v.id} 
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-cyan-50 transition-colors`}
                                    >
                                        <td className="px-4 py-3 font-medium flex items-center">
                                            <FaBus className="mr-2 text-blue-500" />
                                            {v.name}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-blue-600">{v.route}</td>
                                        <td className="px-4 py-3">{v.nextStop}</td>
                                        <td className="px-4 py-3 font-bold text-cyan-600">{v.eta.toFixed(1)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500 bg-white">No vehicles match your current filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
import React from "react";
import { Link } from "react-router-dom";
// CORRECTED: Replaced FaSpeedometerAlt with FaTachometerAlt
import { FaBus, FaRoute, FaTools, FaMapPin, FaTachometerAlt, FaArrowLeft } from "react-icons/fa";

// --- Custom Colors ---
const PRIMARY_COLOR = "text-blue-700";
const ACCENT_COLOR_BG = "bg-cyan-500";
const ACCENT_TEXT = "text-white";
const HOVER_ACCENT = "hover:bg-cyan-600";
const STATUS_MOVING = "bg-green-500";
const STATUS_STOPPED = "bg-red-500";

export default function DriverPanel() {
  
  // Simulated data for the assigned driver's shift
  const assignedShift = { 
      vehicle: "Bus 101", 
      route: "Downtown Express (Route A)", 
      status: "Ongoing",
      currentSpeed: 35,
      occupancy: "Medium",
      nextStop: "Central Transit Hub",
      lastUpdate: "Just Now",
  };
  
  // Dummy controls submission
  const handleUpdate = () => {
      alert("Simulated: Location and Status Updated! Changes visible on the live map.");
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Back Button */}
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-300">
            <div className="flex items-center space-x-3">
                <FaTools className={`text-4xl ${PRIMARY_COLOR}`} />
                <h1 className={`text-4xl font-extrabold ${PRIMARY_COLOR}`}>Driver Console: {assignedShift.vehicle}</h1>
            </div>
            <Link to="/home" className={`flex items-center text-lg text-gray-600 ${HOVER_ACCENT} hover:${ACCENT_TEXT} p-2 rounded transition`}>
                <FaArrowLeft className="mr-2 text-sm" /> Back to Dashboard
            </Link>
        </header>

        {/* Current Shift Status */}
        <section className="bg-white p-6 rounded-xl shadow-2xl border-l-4 border-cyan-500 mb-8">
            <h2 className={`text-2xl font-bold mb-3 ${PRIMARY_COLOR}`}>Current Shift Status</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p className="flex items-center"><FaBus className="text-lg mr-2 text-blue-500"/> Vehicle: <span className="font-semibold ml-1">{assignedShift.vehicle}</span></p>
                <p className="flex items-center"><FaRoute className="text-lg mr-2 text-blue-500"/> Route: <span className="font-semibold ml-1">{assignedShift.route}</span></p>
                <p className="flex items-center"><FaMapPin className="text-lg mr-2 text-blue-500"/> Next Stop: <span className="font-semibold ml-1">{assignedShift.nextStop}</span></p>
                {/* CORRECTED: Usage of the new icon */}
                <p className="flex items-center"><FaTachometerAlt className="text-lg mr-2 text-blue-500"/> Speed: <span className="font-semibold ml-1">{assignedShift.currentSpeed} km/h</span></p>
                <p className="flex items-center">Status: 
                    <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ml-2 ${assignedShift.currentSpeed > 0 ? STATUS_MOVING : STATUS_STOPPED}`}>
                        {assignedShift.currentSpeed > 0 ? 'MOVING' : 'STOPPED'}
                    </span>
                </p>
            </div>
        </section>

        {/* Manual Update Form (Simulated Control) */}
        <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className={`text-2xl font-bold mb-6 ${PRIMARY_COLOR}`}>Location & Status Controls</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-6">
                
                {/* Location Inputs */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Latitude</label>
                        <input type="number" step="0.0001" placeholder="Latitude" defaultValue="34.0525" required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Longitude</label>
                        <input type="number" step="0.0001" placeholder="Longitude" defaultValue="-118.2435" required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Status Controls */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Occupancy</label>
                        <select 
                            defaultValue="Medium"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Empty">Empty</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="Full">Full</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Speed (km/h)</label>
                        <input type="number" defaultValue="35" min="0" required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                {/* Submit Button */}
                <button
                    type="submit"
                    className={`w-full ${ACCENT_COLOR_BG} ${ACCENT_TEXT} font-bold p-3 rounded-lg shadow-md ${HOVER_ACCENT} transition transform`}
                >
                    Submit Live Status Update
                </button>
            </form>
        </section>
        
        {/* End Shift Button */}
        <div className="mt-8 text-center">
            <button 
                className="text-red-500 hover:text-red-700 text-sm font-semibold underline"
                onClick={() => alert("Simulating end of shift. Log out to confirm.")}
            >
                End Shift / Report Issues
            </button>
        </div>
      </div>
    </div>
  );
}

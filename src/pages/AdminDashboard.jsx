import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Assuming these contexts and icons are accessible globally or via local context
import { AuthContext } from "../context/AuthContext";
import { 
    FaUserShield, 
    FaBus, 
    FaRoute, 
    FaUsers, 
    FaSignOutAlt, 
    FaPlusCircle, 
    FaChartLine, 
    FaTrash,
    FaArrowLeft 
} from "react-icons/fa";

// --- Theme & Constants ---
const PRIMARY_COLOR = "text-blue-700";
const ACCENT_COLOR_BG = "bg-cyan-500";
const ACCENT_COLOR_HOVER = "hover:bg-cyan-600";
const SIDEBAR_BG = "bg-blue-700";
const INPUT_BORDER = "border-gray-300";
const RING_FOCUS = "focus:ring-blue-500";

// --- Simulated Management Data ---
const simulatedVehicles = [
    { id: 101, route: 'A', type: 'Bus', status: 'Active', driver: 'Jane Doe' },
    { id: 202, route: 'B', type: 'Metro', status: 'Delayed', driver: 'John Smith' },
    { id: 303, route: 'C', type: 'Tram', status: 'Maintenance', driver: 'N/A' },
];

const simulatedDrivers = [
    { id: 'd1', name: 'Jane Doe', email: 'driver@example.com', assignedVehicle: 101, status: 'On Shift' },
    { id: 'd2', name: 'John Smith', email: 'john@smith.com', assignedVehicle: 202, status: 'On Shift' },
    { id: 'u1', name: 'Commuter User', email: 'user@example.com', assignedVehicle: 'N/A', status: 'Inactive' },
];


export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSimulatedAction = (action, item) => {
      // In a real app, this would be an API call
      alert(`SIMULATING ACTION: ${action} for ${item}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header and Controls */}
        <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-lg mb-8">
            <div className="flex items-center space-x-4">
                <FaUserShield className={`text-4xl ${PRIMARY_COLOR}`} />
                <h1 className={`text-3xl font-extrabold ${PRIMARY_COLOR}`}>
                    Admin Control Panel
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => navigate('/home')} 
                    className="flex items-center text-gray-600 hover:text-blue-500 transition font-medium"
                >
                    <FaArrowLeft className="mr-2"/> Back to Tracker
                </button>
                <button 
                    onClick={() => logout() || navigate('/login')} 
                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                >
                    <FaSignOutAlt className="inline mr-1"/> Logout
                </button>
            </div>
        </header>

        {/* System Metrics Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-cyan-500 text-center">
                <FaBus className={`text-3xl mx-auto mb-2 ${PRIMARY_COLOR}`} />
                <p className="text-3xl font-bold">{simulatedVehicles.length}</p>
                <p className="text-sm text-gray-600">Total Fleet</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-blue-500 text-center">
                <FaRoute className={`text-3xl mx-auto mb-2 ${PRIMARY_COLOR}`} />
                <p className="text-3xl font-bold">3</p>
                <p className="text-sm text-gray-600">Active Routes</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-yellow-500 text-center">
                <FaChartLine className={`text-3xl mx-auto mb-2 text-yellow-600`} />
                <p className="text-3xl font-bold">2</p>
                <p className="text-sm text-gray-600">Vehicles Delayed</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-md border-b-4 border-green-500 text-center">
                <FaUsers className={`text-3xl mx-auto mb-2 text-green-600`} />
                <p className="text-3xl font-bold">{simulatedDrivers.filter(d => d.status === 'On Shift').length}</p>
                <p className="text-sm text-gray-600">Drivers On Shift</p>
            </div>
        </section>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Vehicle Management */}
            <section className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className={`text-2xl font-bold mb-4 flex items-center ${PRIMARY_COLOR} border-b border-gray-200 pb-2`}>
                    <FaBus className="mr-2"/> Fleet & Route Management
                </h2>
                
                <button 
                    onClick={() => handleSimulatedAction('Add Vehicle', 'New')}
                    className={`w-full mb-4 px-4 py-2 ${ACCENT_COLOR_BG} text-white font-semibold rounded-lg ${ACCENT_COLOR_HOVER} transition flex items-center justify-center`}
                >
                    <FaPlusCircle className="mr-2"/> Add New Vehicle (Simulated)
                </button>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">ID</th>
                                <th className="px-4 py-2 text-left font-semibold">Route</th>
                                <th className="px-4 py-2 text-left font-semibold">Status</th>
                                <th className="px-4 py-2 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {simulatedVehicles.map(v => (
                                <tr key={v.id} className="hover:bg-cyan-50">
                                    <td className="px-4 py-3 font-medium">{v.id}</td>
                                    <td className="px-4 py-3">{v.route}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                            v.status === 'Active' ? 'bg-green-100 text-green-700' :
                                            v.status === 'Delayed' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700'
                                        }`}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button 
                                            onClick={() => handleSimulatedAction('Delete', `Vehicle ${v.id}`)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            
            {/* User/Driver Management */}
            <section className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className={`text-2xl font-bold mb-4 flex items-center ${PRIMARY_COLOR} border-b border-gray-200 pb-2`}>
                    <FaUsers className="mr-2"/> Driver & User Access
                </h2>

                <button 
                    onClick={() => handleSimulatedAction('Add Driver', 'New')}
                    className={`w-full mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex items-center justify-center`}
                >
                    <FaPlusCircle className="mr-2"/> Onboard New Driver
                </button>
                
                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold">Name/Role</th>
                                <th className="px-4 py-2 text-left font-semibold">Assigned</th>
                                <th className="px-4 py-2 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {simulatedDrivers.map(d => (
                                <tr key={d.id} className="hover:bg-cyan-50">
                                    <td className="px-4 py-3">
                                        <p className="font-medium">{d.name}</p>
                                        <p className={`text-xs ${d.role === 'user' ? 'text-gray-500' : 'text-blue-500'}`}>{d.role}</p>
                                    </td>
                                    <td className="px-4 py-3">{d.assignedVehicle}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button 
                                            onClick={() => handleSimulatedAction('Reset Password', `User ${d.name}`)}
                                            className="text-gray-500 hover:text-gray-700 transition"
                                        >
                                            <FaTools />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}

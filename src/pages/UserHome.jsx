import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; 
import { useVehicleData } from "../data/useVehicleData"; 
import {
  FaMapMarkedAlt, FaRoute, FaBell, FaUserCircle, FaHistory, FaTicketAlt, FaCommentDots,
  FaSignOutAlt, FaBars, FaBus, FaUserShield, FaTools, FaSearch, FaFilter, FaClock,
  FaExchangeAlt, FaWalking, FaDirections, FaRegListAlt, FaSave, FaLock, FaSpinner,
  FaExclamationTriangle, FaStar, FaPlusCircle, FaPaperPlane, FaTrain, FaTram 
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"; // ❗ useMap imported for centering
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- THEME CONSTANTS ---
const PRIMARY_COLOR = "text-blue-700";
const ACCENT_COLOR_BG = "bg-cyan-500";
const ACCENT_COLOR_TEXT = "text-cyan-500";
const SIDEBAR_BG = "bg-blue-700";
const INPUT_BORDER = "border-gray-300";
const RING_FOCUS = "focus:ring-blue-500";

// --- Leaflet Icons ---
const getThemedIcon = (color) => new L.Icon({
    iconUrl: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      `<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
         <circle cx='12' cy='12' r='10' fill='${color}' stroke='white' stroke-width='2'/>
         <path d='M10 16L14 12L10 8' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/>
       </svg>`
    )}`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -20]
});

const busIcon = getThemedIcon("#1E90FF");
const metroIcon = getThemedIcon("#FF8C00");
const tramIcon = getThemedIcon("#28A745");

// Utility to get the text icon
const getVehicleTypeIcon = (type) => {
    switch (type) {
        case "bus": return <FaBus className="text-xl mr-1 text-blue-500" />;
        case "metro": return <FaTrain className="text-xl mr-1 text-red-500" />;
        case "tram": return <FaTram className="text-xl mr-1 text-green-500" />;
        default: return <FaBus className="text-xl mr-1 text-blue-500" />;
    }
};

// ❗ NEW: Component to handle map centering when selected vehicle changes
const MapCenterer = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            // Use flyTo for smooth animation when centering
            map.flyTo(center, zoom, { duration: 0.5 });
        }
    }, [center, zoom, map]);
    return null;
};

// ====================================================================
// --- FEATURE COMPONENTS (Using Destructured Props) ---
// ====================================================================

const LiveTrackingMap = ({ vehicles, stopsData, routesData }) => {
    // Note: Simulation logic is now in useVehicleData.js
    const [search, setSearch] = useState("");
    const [routeFilter, setRouteFilter] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Initial center on the main hub
    const initialCenter = [28.6150, 77.2095];
    const initialZoom = 14;

    // Find the selected vehicle's position for centering
    const centerPosition = selectedVehicle 
        ? selectedVehicle.coords 
        : initialCenter;


    const displayedVehicles = useMemo(() => vehicles.filter(
        (v) => (routeFilter === "" || v.route === routeFilter) && (v.number.toLowerCase().includes(search.toLowerCase()) || v.route.toLowerCase().includes(search.toLowerCase()))
    ), [vehicles, routeFilter, search]);
    
    const availableRoutes = useMemo(() => [...new Set(vehicles.map(v => v.route))].sort(), [vehicles]);

    const getIcon = (type) => {
        switch (type) {
            case "bus": return busIcon;
            case "metro": return metroIcon;
            case "tram": return tramIcon;
            default: return busIcon;
        }
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Filters and Search Area */}
            <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search vehicle or route..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className={`pl-10 pr-3 py-2 border ${INPUT_BORDER} rounded-lg w-full focus:outline-none focus:ring-2 ${RING_FOCUS}`}
                    />
                </div>
                <div className="relative w-full md:w-1/4">
                    <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select value={routeFilter} onChange={(e) => setRouteFilter(e.target.value)}
                        className={`pl-10 pr-3 py-2 border ${INPUT_BORDER} rounded-lg w-full appearance-none focus:outline-none focus:ring-2 ${RING_FOCUS} cursor-pointer`}
                    >
                        <option value="">All Routes</option>
                        {availableRoutes.map(route => (<option key={route} value={route}>Route {route}</option>))}
                    </select>
                </div>
                <div className={`text-sm font-semibold p-2 rounded-lg ${ACCENT_COLOR_BG} text-white`}>
                    {displayedVehicles.length} vehicles live
                </div>
            </div>

            {/* Map and Details Split: Use flex-col on mobile, lg:flex-row on desktop */}
            <div className="flex-grow flex flex-col lg:flex-row w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-blue-500">
                
                {/* Map */}
                <div className="w-full lg:w-2/3 h-1/2 lg:h-full min-h-[300px] lg:min-h-0"> {/* ❗ Added min-height for mobile map */}
                    <MapContainer
                        center={initialCenter} zoom={initialZoom} scrollWheelZoom={true} className="h-full w-full"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' />
                        
                        {/* ❗ NEW: MapCentering Component */}
                        <MapCenterer center={centerPosition} zoom={initialZoom} />

                        {/* Render Stops */}
                        {stopsData.map((stop) => (
                            <Marker 
                                key={stop.id} 
                                position={stop.coords} 
                                icon={new L.Icon({
                                    iconUrl: 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="4" fill="#000" stroke="#FFF" stroke-width="2"/></svg>',
                                    iconSize: [20, 20],
                                    iconAnchor: [10, 10]
                                })}
                            >
                                <Popup>
                                    <strong className="text-gray-800">{stop.name}</strong><br />
                                    Stop ID: {stop.id}
                                </Popup>
                            </Marker>
                        ))}

                        {/* Vehicle Markers */}
                        {displayedVehicles.map((v) => (
                            <Marker 
                                key={v.id} 
                                position={v.coords} 
                                icon={getIcon(v.type)} 
                                eventHandlers={{ 
                                    // ❗ UX Improvement: Center map on marker click
                                    click: () => setSelectedVehicle(v) 
                                }}
                            >
                                <Popup>
                                    <strong className={PRIMARY_COLOR}>{v.number}</strong>
                                    <br />
                                    <span className="flex items-center">
                                        {getVehicleTypeIcon(v.type)} Route: {v.route}
                                    </span>
                                    <span className="text-cyan-600 font-bold flex items-center mt-1">
                                        <FaClock className="mr-1"/> Speed: {v.speed} km/h
                                    </span>
                                </Popup>
                            </Marker>
                        ))}
                         {selectedVehicle && (
                            <Polyline 
                                positions={selectedVehicle.path} 
                                color={routesData.find(r => r.id === selectedVehicle.route)?.color || "gray"} 
                                weight={4} 
                                opacity={0.7} 
                            />
                        )}
                    </MapContainer>
                </div>
                
                {/* Details Side Panel: full width on mobile, 1/3 on desktop */}
                <div className="w-full lg:w-1/3 bg-white p-4 overflow-y-auto border-t lg:border-t-0 lg:border-l border-gray-200">
                    <h3 className={`text-xl font-bold ${PRIMARY_COLOR} mb-4 border-b border-gray-200 pb-2`}>
                        {selectedVehicle ? selectedVehicle.number : "Select Vehicle for Details"}
                    </h3>
                    {selectedVehicle && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <p className="text-sm">Route: <span className="font-semibold">{selectedVehicle.route} ({routesData.find(r => r.id === selectedVehicle.route)?.name})</span></p>
                            <p className="text-sm flex items-center">
                                Type: <span className="font-semibold capitalize ml-1">{selectedVehicle.type}</span> 
                                {getVehicleTypeIcon(selectedVehicle.type)}
                            </p>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-sm mb-1 text-cyan-600 flex items-center"><FaClock className="mr-2" /> Estimated Times</h4>
                                <p className="text-xs flex justify-between"><span>Next Stop (Central Hub)</span> <span className="font-bold">5 min</span></p>
                            </div>
                            <button className={`w-full ${ACCENT_COLOR_BG} text-white p-2 rounded-lg font-semibold hover:bg-cyan-600 transition`}><FaBus className="inline mr-2"/> Save to Favorites</button>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
};

const AlertsAndNotifications = () => { /* ... component definition ... */
    const alertsData = [
        { id: 1, type: 'CRITICAL', message: 'Route A: Blocked due to unexpected closure. Seek alternative transport.', time: 'Just now', color: 'bg-red-500' },
        { id: 2, type: 'DELAY', message: 'Metro Line 1: Experiencing minor delays (5-10 mins) due to signalling issues.', time: '15 mins ago', color: 'bg-yellow-500' },
        { id: 3, type: 'INFO', message: 'Holiday schedule in effect starting tomorrow. Check planner for details.', time: '1 hour ago', color: 'bg-green-500' },
    ];

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                <FaBell className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Alerts & Notifications</h2>
            </div>
            
            <div className="space-y-4">
                {alertsData.map(alert => (
                    <motion.div 
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-xl shadow-md border-l-4 ${alert.color.replace('bg-', 'border-')} bg-gray-50 hover:bg-white transition`}
                    >
                        <div className="flex justify-between items-start">
                            <h4 className={`font-bold text-lg text-gray-800 flex items-center ${alert.color.replace('bg-', 'text-')}`}>
                                <FaExclamationTriangle className="mr-2 text-xl" /> 
                                {alert.type} Alert
                            </h4>
                            <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{alert.message}</p>
                    </motion.div>
                ))}
                
                <div className="text-center pt-4">
                    <button className={`text-sm font-semibold text-white p-3 rounded-lg ${ACCENT_COLOR_BG} hover:bg-cyan-600 transition shadow-md`}>
                        Load Older Alerts
                    </button>
                </div>
            </div>
        </div>
    );
};
const Alerts = AlertsAndNotifications; 


const HistoryAndFavorites = () => { /* ... component definition ... */
    const favorites = [
        { id: 1, type: 'Route', name: 'Route A', detail: 'Downtown Express' },
        { id: 2, type: 'Stop', name: 'Central Hub', detail: 'Bus + Metro Transfer' },
        { id: 3, type: 'Vehicle', name: 'Bus 101', detail: 'Primary Commute Vehicle' },
    ];
    const history = [
        { id: 101, route: 'Route B', date: 'Sept 25, 2025', duration: '25 min', cost: '$2.50' },
        { id: 102, route: 'Metro M1', date: 'Sept 24, 2025', duration: '18 min', cost: '$2.00' },
    ];
    
    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                <FaHistory className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>History & Favorites</h2>
            </div>

            {/* Favorites Section */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${ACCENT_COLOR_TEXT}`}>
                <FaStar className="mr-2"/> Your Favorites
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
                {favorites.map(fav => (
                    <div key={fav.id} className="bg-gray-50 p-4 rounded-lg shadow-inner border-l-4 border-cyan-500">
                        <h4 className="font-semibold text-gray-800">{fav.name}</h4>
                        <p className="text-xs text-gray-600">{fav.type}: {fav.detail}</p>
                    </div>
                ))}
            </div>

            {/* History Section */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${PRIMARY_COLOR}`}>
                <FaClock className="mr-2"/> Recent Trips
            </h3>
            <div className="space-y-2">
                {history.map(trip => (
                    <div key={trip.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition">
                        <div className="flex items-center space-x-3">
                            <FaBus className="text-xl text-blue-500"/>
                            <div>
                                <p className="font-medium text-gray-800">{trip.route}</p>
                                <p className="text-xs text-gray-500">{trip.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-cyan-600">{trip.duration}</p>
                            <p className="text-sm text-gray-700">{trip.cost}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const History = HistoryAndFavorites; 


const FareAndTicketing = () => { /* ... component definition ... */
    const activePass = { type: 'Monthly Pass', expires: 'Oct 31, 2025', cost: '$85.00' };
    
    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                <FaTicketAlt className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Fare & Ticketing</h2>
            </div>
            
            {/* Active Pass Section */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${ACCENT_COLOR_TEXT}`}>
                <FaTicketAlt className="mr-2"/> Active Pass
            </h3>
            <div className="bg-blue-700 text-white p-6 rounded-xl shadow-lg mb-10 border-b-4 border-cyan-500">
                <p className="text-sm">Pass Type:</p>
                <h4 className="text-3xl font-bold mb-2">{activePass.type}</h4>
                <div className="flex justify-between text-sm pt-2 border-t border-blue-500">
                    <p>Valid Until: <span className="font-medium text-cyan-400">{activePass.expires}</span></p>
                    <p>Cost: <span className="font-medium text-cyan-400">{activePass.cost}</span></p>
                </div>
            </div>

            {/* Buy Ticket Section */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${PRIMARY_COLOR}`}>
                <FaPlusCircle className="mr-2"/> Buy New Tickets
            </h3>
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner border-l-4 border-blue-500">
                <p className="text-gray-700 mb-4">Quickly purchase a single ride ticket or renew your monthly pass.</p>
                
                <div className="grid grid-cols-2 gap-4">
                    <button className={`p-4 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition shadow-md`}>
                        Single Ride ($1.25)
                    </button>
                    <button className={`p-4 rounded-lg font-bold text-white ${ACCENT_COLOR_BG} hover:bg-cyan-600 transition shadow-md`}>
                        Renew {activePass.type}
                    </button>
                </div>
            </div>
        </div>
    );
};
const Fares = FareAndTicketing;

const FeedbackAndSupport = () => { /* ... component definition ... */
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('General Feedback');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    
    const recentTickets = [
        { id: 1, type: 'Complaint', status: 'Closed', summary: 'Late bus on Route B' },
        { id: 2, type: 'Suggestion', status: 'Open', summary: 'Add bike rack to new Metro line' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage(null);

        setTimeout(() => {
            setIsSubmitting(false);
            setMessage('');
            setSubject('General Feedback');
            setSuccessMessage(`Thank you! Your feedback ("${subject}") has been submitted.`);
        }, 1500);
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                <FaCommentDots className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Feedback & Support</h2>
            </div>
            
            {/* Feedback Submission Form */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${ACCENT_COLOR_TEXT}`}>
                <FaPaperPlane className="mr-2"/> Submit New Feedback
            </h3>
            
            {/* Success Message */}
            {successMessage && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="p-3 bg-green-100 text-green-700 rounded-lg mb-4 text-center font-medium"
                    onAnimationEnd={() => setTimeout(() => setSuccessMessage(null), 5000)}
                >
                    {successMessage}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow-inner border-l-4 border-cyan-500 space-y-4 mb-10">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select 
                        value={subject} 
                        onChange={(e) => setSubject(e.target.value)}
                        className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:ring-2 ${RING_FOCUS}`}
                    >
                        <option>General Feedback</option>
                        <option>Service Complaint</option>
                        <option>Suggestion for Improvement</option>
                        <option>Technical Issue</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="4"
                        placeholder="Describe the issue or suggestion..."
                        className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:ring-2 ${RING_FOCUS}`}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting || message.length === 0}
                    className={`w-full ${ACCENT_COLOR_BG} text-white p-3 rounded-lg font-bold ${isSubmitting || message.length === 0 ? 'opacity-60 cursor-not-allowed' : 'hover:bg-cyan-600'} transition flex items-center justify-center`}
                >
                    <FaCommentDots className="mr-2"/> {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                </button>
            </form>

            {/* Recent Tickets Section */}
            <h3 className={`text-2xl font-bold mb-4 flex items-center ${PRIMARY_COLOR}`}>
                <FaRegListAlt className="mr-2"/> Recent Tickets
            </h3>
            <div className="space-y-2">
                {recentTickets.map(ticket => (
                    <div key={ticket.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div>
                            <p className="font-medium text-gray-800">{ticket.summary}</p>
                            <p className="text-xs text-gray-500">Type: {ticket.type}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                        }`}>
                            {ticket.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
const Feedback = FeedbackAndSupport;

const UserProfileAndSettings = () => { /* ... component definition ... */
    const { user } = useContext(AuthContext); 
    const [name, setName] = useState('Jane Doe (Simulated)');
    const [phone, setPhone] = useState('555-123-4567');
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const handleSave = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setIsSuccess(false);

        // Simulate API call delay
        setTimeout(() => {
            setIsSaving(false);
            setIsSuccess(true);
        }, 1000);
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6 border-b border-gray-200 pb-4">
                <FaUserCircle className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Profile & Settings</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Column 1: User Info Card */}
                <div className="md:col-span-1 p-6 bg-gray-50 rounded-lg shadow-inner border-l-4 border-cyan-500">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Account Overview</h3>
                    <div className="space-y-3">
                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">Email:</span> 
                            <span className="block font-medium text-text-primary">{user?.email || 'guest@transitnow.com'}</span>
                        </p>
                        <p className="text-sm">
                            <span className="font-semibold text-gray-600">Role:</span> 
                            <span className={`block font-bold text-lg capitalize ${ACCENT_COLOR_TEXT}`}>{user?.role || 'Guest'}</span>
                        </p>
                        <p className="text-sm flex items-center pt-2">
                            <FaLock className={`text-lg mr-2 ${PRIMARY_COLOR}`}/>
                            <span className="text-gray-600">All data is secured (Simulated)</span>
                        </p>
                    </div>
                </div>

                {/* Column 2 & 3: Settings Form */}
                <div className="md:col-span-2">
                    <form onSubmit={handleSave} className="space-y-6">
                        
                        <h3 className="2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">Personal Details</h3>
                        
                        {/* Success Notification */}
                        {isSuccess && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-green-100 text-green-700 rounded-lg text-center font-medium">
                                <FaSave className="inline mr-2"/> Settings updated successfully! (Simulated)
                            </motion.div>
                        )}
                        
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS}`}
                                required
                            />
                        </div>
                        
                        {/* Phone Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={`w-full p-3 border ${INPUT_BORDER} rounded-lg shadow-sm focus:outline-none focus:ring-2 ${RING_FOCUS}`}
                            />
                        </div>

                        {/* Save Button */}
                        <button type="submit" disabled={isSaving}
                            className={`w-full ${ACCENT_COLOR_BG} text-white p-3 rounded-lg font-bold ${isSaving ? 'opacity-60 cursor-not-allowed' : 'hover:bg-cyan-600'} transition flex items-center justify-center`}
                        >
                            <FaSave className="mr-2" /> 
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Password Reset Section (Future) */}
            <div className="mt-10 p-6 bg-red-50 rounded-xl border-l-4 border-red-500 shadow-inner">
                <h3 className="text-xl font-bold text-red-700 mb-2">Security Zone</h3>
                <p className="text-gray-600 text-sm">
                    Password reset functionality would be implemented here in a production application.
                </p>
            </div>
        </div>
    );
};


const JourneyPlanner = () => { /* ... component definition ... */
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [plannerResult, setPlannerResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePlanner = (e) => {
        e.preventDefault();
        setLoading(true);
        setPlannerResult(null);

        setTimeout(() => {
             // Simulated Planner Logic
            const result = {
                from, to,
                suggestion: "Transfer required via Central Hub",
                steps: [
                    { icon: FaWalking, text: `Walk 5 minutes to ${from} Stop.` },
                    { icon: FaBus, text: `Board Bus 101 (Route A). Estimated ride: 10 min.` },
                    { icon: FaExchangeAlt, text: `Transfer at Central Hub.` },
                    { icon: FaRoute, text: `Board Metro Line 1. Estimated ride: 8 min.` },
                    { icon: FaWalking, text: `Arrive at ${to} Stop (Walk 2 min).` }
                ],
                totalTime: "35 min",
                fare: "$2.50"
            };
            setPlannerResult(result);
            setLoading(false);
        }, 1500); // Simulate network delay
    };
    
    const getStepIcon = (Icon) => <Icon className={`${PRIMARY_COLOR} text-xl mr-3`} />;

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6">
                <FaRoute className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Journey Planner</h2>
            </div>
            
            <form onSubmit={handlePlanner} className="space-y-4 p-6 border border-blue-200 rounded-xl bg-gray-50 mb-8 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Start Location (e.g., Downtown)" value={from} onChange={(e) => setFrom(e.target.value)}
                        className={`p-3 border ${INPUT_BORDER} rounded-lg ${RING_FOCUS} w-full`} required />
                    <input type="text" placeholder="Destination (e.g., Central Station)" value={to} onChange={(e) => setTo(e.target.value)}
                        className={`p-3 border ${INPUT_BORDER} rounded-lg ${RING_FOCUS} w-full`} required />
                </div>
                <button type="submit" disabled={loading}
                    className={`w-full ${ACCENT_COLOR_BG} text-white p-3 rounded-lg font-bold ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-cyan-600'} transition flex items-center justify-center`}
                >
                    {loading ? (
                        <>
                            <FaClock className="animate-spin mr-2" /> Calculating...
                        </>
                    ) : (
                        <>
                            <FaDirections className="inline mr-2"/> Find Best Route
                        </>
                    )}
                </button>
            </form>

            {plannerResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                    className="mt-6 p-6 border border-cyan-300 rounded-xl bg-cyan-50/10 shadow-lg"
                >
                    <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center border-b border-cyan-300 pb-2">
                        <FaRegListAlt className="mr-2"/> Suggested Route
                    </h3>
                    
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm mb-4">
                        <p className="font-semibold text-gray-700">Total Time: <span className={`${ACCENT_COLOR_TEXT} font-bold text-lg ml-2`}>{plannerResult.totalTime}</span></p>
                        <p className="font-semibold text-gray-700">Fare: <span className={`${ACCENT_COLOR_TEXT} font-bold text-lg ml-2`}>{plannerResult.fare}</span></p>
                    </div>

                    <p className="text-sm font-medium text-gray-600 mb-3">{plannerResult.suggestion}</p>

                    <ol className="space-y-3">
                        {plannerResult.steps.map((step, i) => (
                            <li key={i} className="flex items-start text-gray-800">
                                <span className="flex-shrink-0">{getStepIcon(step.icon)}</span>
                                <span className="text-base">{step.text}</span>
                            </li>
                        ))}
                    </ol>
                </motion.div>
            )}
        </div>
    );
};


// --- Dashboard Navigation Items (REVISED STRUCTURE) ---
const baseNavItems = [
    // Core Tabs (All or most users need this)
    { name: "Live Map & Tracking", icon: FaMapMarkedAlt, type: "tab", component: "Map" },
    { name: "Journey Planner", icon: FaRoute, type: "tab", component: "Planner" },
    { name: "Alerts & Notifications", icon: FaBell, type: "tab", component: "Alerts" },
    
    // Role-Specific Links (Type: 'link' directs to external route)
    { name: "Admin Panel", icon: FaUserShield, type: "link", path: "/admin-dashboard" },
    { name: "Driver Panel", icon: FaTools, type: "link", path: "/driver-panel" },

    // Secondary Tabs
    { name: "History & Favorites", icon: FaHistory, type: "tab", component: "History" },
    { name: "Profile & Settings", icon: FaUserCircle, type: "tab", component: "Profile" },
    { name: "Fare & Ticketing", icon: FaTicketAlt, type: "tab", component: "Fares" },
    { name: "Feedback & Support", icon: FaCommentDots, type: "tab", component: "Feedback" },
];

const getNavItems = (role) => {
    // Determine which item is visible based on role
    return baseNavItems.filter(item => {
        if (item.path === "/admin-dashboard") return role === 'admin';
        if (item.path === "/driver-panel") return role === 'driver';
        // All other tabs (component: "...") are visible to everyone
        return true; 
    });
};


// ====================================================================
// --- MAIN DASHBOARD COMPONENT ---
// ====================================================================

export default function UserHome() {
  const navigate = useNavigate();
  const { logout, user, isLoading } = useContext(AuthContext); 
  // ❗ NEW: Get data and functions from the custom hook
  const { vehicles, stopsData, routesData } = useVehicleData();

  const [activeComponent, setActiveComponent] = useState("Map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const role = user?.role || 'user'; 
  const navItems = useMemo(() => getNavItems(role), [role]); 

  // ADD: Loading Screen Check
  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <FaSpinner className={`text-4xl animate-spin ${ACCENT_COLOR_TEXT}`} />
              <p className="ml-4 text-lg text-gray-700">Loading session...</p>
          </div>
      );
  }


  const renderComponent = () => {
    switch (activeComponent) {
      // ❗ Passing data props to LiveTrackingMap
      case "Map": return <LiveTrackingMap vehicles={vehicles} stopsData={stopsData} routesData={routesData} />; 
      case "Planner": return <JourneyPlanner />;
      case "Alerts": return <Alerts />;
      case "Profile": return <UserProfileAndSettings />; 
      case "History": return <History />;
      case "Fares": return <Fares />;
      case "Feedback": return <Feedback />;
      default: return <LiveTrackingMap vehicles={vehicles} stopsData={stopsData} routesData={routesData} />;
    }
  };

  const handleNavClick = (item) => {
      if (item.path) {
          navigate(item.path);
      } else {
          setActiveComponent(item.component);
      }
      setIsSidebarOpen(false); // Close sidebar after navigation on mobile
  };

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  // ❗ Mobile Responsiveness: Hide sidebar by default on mobile
  const sidebarClasses = isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Mobile Menu Toggle Button (Fixed Position) */}
      <button
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-blue-700 text-white shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar Navigation */}
      <motion.div
        className={`fixed inset-y-0 left-0 w-64 p-4 ${SIDEBAR_BG} z-40 shadow-2xl transform transition-transform duration-300 ${sidebarClasses}`}
      >
        {/* Backdrop for mobile when sidebar is open */}
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black opacity-50 md:hidden z-30" 
                onClick={() => setIsSidebarOpen(false)}
            />
        )}
        
        <div className="flex flex-col h-full relative z-40">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-8 pt-2">
            <FaBus className="text-3xl text-cyan-400" />
            <h1 className="2xl font-bold tracking-wider text-white">TransitNow</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-1">
            {navItems.map((item) => {
              const isActive = (item.component && activeComponent === item.component) || 
                               (item.path && window.location.pathname === item.path);
                               
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 
                    ${isActive
                      ? `font-bold ${ACCENT_COLOR_BG} text-white shadow-md` 
                      : "text-gray-300 hover:bg-blue-600 hover:text-white"
                    } ${item.type === 'link' ? 'mt-4 border-t border-blue-600 pt-4' : ''}
                    `}
                >
                  <item.icon className="text-lg" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info and Logout Button */}
          <div className="mt-auto pt-6 border-t border-blue-600">
            <div className="flex items-center text-white mb-3">
                <FaUserCircle className="text-3xl mr-3 text-cyan-400"/>
                <span className="font-semibold text-sm capitalize">Hi, {user?.role}!</span>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-300 hover:bg-red-400 hover:bg-opacity-20 transition-colors">
              <FaSignOutAlt className="text-lg" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {/* ❗ Adjusted padding to account for fixed mobile menu button */}
      <div className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 transition-all duration-300">
        
        {/* Header/Breadcrumb */}
        <header className="mb-8 p-4 bg-white rounded-xl shadow-md flex justify-between items-center">
          <h2 className={`text-2xl font-semibold ${PRIMARY_COLOR}`}>
            {navItems.find(item => item.component === activeComponent)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hidden sm:inline text-sm font-medium capitalize">Role: {user?.role}</span> 
            <FaUserCircle className={`text-2xl ${ACCENT_COLOR_TEXT}`} />
          </div>
        </header>

        {/* Dynamic Content Area */}
        <motion.div 
          key={activeComponent} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[calc(100vh-140px)]" 
        >
          {renderComponent()}
        </motion.div>

      </div>
    </div>
  );
}

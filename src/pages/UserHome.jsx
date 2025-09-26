import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaRoute,
  FaBell,
  FaUserCircle,
  FaHistory,
  FaTicketAlt,
  FaCommentDots,
  FaSignOutAlt,
  FaBars,
  FaBus,
  FaSave,
  FaSearch,
  FaFilter,
  FaClock,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaMapPin,
  FaStar,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Theme & Constants (Matching previous designs) ---
const PRIMARY_COLOR = "text-blue-700";
const ACCENT_COLOR_BG = "bg-cyan-500";
const ACCENT_COLOR_TEXT = "text-cyan-500";
const SIDEBAR_BG = "bg-blue-700";
const INPUT_BORDER = "border-gray-300";
const RING_FOCUS = "focus:ring-blue-500";

// --- Leaflet Icons (Used in LiveTrackingMap) ---
const getThemedIcon = (url) => new L.Icon({
    iconUrl: url,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -20]
});

const busIcon = getThemedIcon("https://cdn-icons-png.flaticon.com/512/61/61205.png");
const metroIcon = getThemedIcon("https://cdn-icons-png.flaticon.com/512/69/69986.png");
const tramIcon = getThemedIcon("https://cdn-icons-png.flaticon.com/512/2983/2983804.png");

// Dummy Data (Expanded for demonstration)
const dummyVehicles = [
    { id: "bus101", type: "bus", number: "Bus 101", route: "A", coords: [28.6139, 77.209], speed: "40 km/h", direction: "North", lastUpdate: "1 min ago", eta: [{ stop: "Stop A", eta: "5 min" }, { stop: "Central", eta: "20 min" }], stops: [{ stop: "Stop A", arrival: "10:00", departure: "10:02" }], path: [[28.6139, 77.209], [28.62, 77.22], [28.63, 77.23]] },
    { id: "bus202", type: "bus", number: "Bus 202", route: "B", coords: [28.61, 77.215], speed: "60 km/h", direction: "East", lastUpdate: "2 min ago", eta: [{ stop: "Airport Gate", eta: "8 min" }, { stop: "Terminal 2", eta: "25 min" }], stops: [{ stop: "Airport Gate", arrival: "11:05", departure: "11:07" }], path: [[28.61, 77.215], [28.62, 77.23], [28.64, 77.24]] },
    { id: "metro1", type: "metro", number: "Metro Line 1", route: "M1", coords: [28.65, 77.22], speed: "70 km/h", direction: "South", lastUpdate: "Just now", eta: [{ stop: "North Station", eta: "3 min" }, { stop: "Central Hub", eta: "10 min" }], stops: [{ stop: "North Station", arrival: "12:00", departure: "12:02" }], path: [[28.65, 77.22], [28.63, 77.215], [28.61, 77.21]] },
];

// --- FEATURE 2: Live Tracking Map Component ---
const LiveTrackingMap = () => {
    const [vehicles, setVehicles] = useState(dummyVehicles);
    const [search, setSearch] = useState("");
    const [routeFilter, setRouteFilter] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // Dynamic map center based on selected vehicle
    const mapCenter = selectedVehicle ? selectedVehicle.coords : [28.6139, 77.209];

    // Simulate movement (Reduced complexity for dashboard context)
    useEffect(() => {
        const interval = setInterval(() => {
            // Update position slightly
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const displayedVehicles = useMemo(() => vehicles.filter(
        (v) => (routeFilter === "" || v.route === routeFilter) && (v.number.toLowerCase().includes(search.toLowerCase()))
    ), [vehicles, routeFilter, search]);
    
    const availableRoutes = useMemo(() => [...new Set(vehicles.map(v => v.route))].sort(), [vehicles]);

    const getIcon = (type) => {
        switch (type) {
            case "bus": return busIcon;
            case "metro": return metroIcon;
            default: return busIcon;
        }
    };

    return (
        <div className="flex flex-col h-full space-y-4">
            {/* Filters and Search Area (Feature 2) */}
            <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search vehicle..." value={search} onChange={(e) => setSearch(e.target.value)}
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

            {/* Map and Details Split (Feature 2) */}
            <div className="flex-grow flex w-full h-[calc(100%-100px)] rounded-xl overflow-hidden shadow-2xl border-4 border-blue-500">
                
                {/* Map (Feature 2) */}
                <div className="w-2/3 h-full">
                    <MapContainer
                        center={mapCenter} zoom={14} scrollWheelZoom={true} className="h-full w-full"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' />
                        {displayedVehicles.map((v) => (
                            <Marker key={v.id} position={v.coords} icon={getIcon(v.type)} eventHandlers={{ click: () => setSelectedVehicle(v) }}>
                                <Popup>
                                    <strong className={PRIMARY_COLOR}>{v.number}</strong><br />
                                    Route: {v.route}<br />
                                    ETA: <span className="text-cyan-600 font-bold">5 mins</span>
                                </Popup>
                            </Marker>
                        ))}
                         {selectedVehicle && (
                            <Polyline positions={selectedVehicle.path} color="blue" weight={4} opacity={0.7} />
                        )}
                    </MapContainer>
                </div>
                
                {/* Details Side Panel (Feature 2) */}
                <div className="w-1/3 bg-white p-4 overflow-y-auto">
                    <h3 className={`text-xl font-bold ${PRIMARY_COLOR} mb-4 border-b border-gray-200 pb-2`}>
                        {selectedVehicle ? selectedVehicle.number : "Select Vehicle for Details"}
                    </h3>
                    {selectedVehicle && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                            <p className="text-sm">Route: <span className="font-semibold">{selectedVehicle.route}</span></p>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <h4 className="font-bold text-sm mb-1 text-cyan-600 flex items-center"><FaClock className="mr-2" /> ETA to Next Stops (Feature 2)</h4>
                                {selectedVehicle.eta.map((p, i) => (<p key={i} className="text-xs flex justify-between"><span>{p.stop}</span> <span className="font-bold">{p.eta}</span></p>))}
                            </div>
                            <button className={`w-full ${ACCENT_COLOR_BG} text-white p-2 rounded-lg font-semibold hover:bg-cyan-600 transition`}><FaSave className="inline mr-2"/> Save to Favorites (Feature 7)</button>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
};

// --- FEATURE 1, 4, 5, 6, 7 PLACEHOLDER COMPONENTS ---
const PlaceholderComponent = ({ title, icon: Icon, features }) => (
  <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
    <div className="flex items-center space-x-4 mb-6">
      <Icon className={`text-4xl ${PRIMARY_COLOR}`} />
      <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>{title}</h2>
    </div>
    <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-cyan-500">
        <h3 className="text-xl font-semibold mb-3">Key Functionality:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
            {features.map((f, i) => (<li key={i}>{f}</li>))}
        </ul>
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <p className="font-semibold text-blue-700">🏗️ Implementation Note:</p>
            <p className="text-sm text-gray-600">This section is ready for the functional components (forms, lists, API calls) that handle {title}.</p>
        </div>
    </div>
  </div>
);

// --- FEATURE 3: Journey Planner Component ---
const JourneyPlanner = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [plannerResult, setPlannerResult] = useState(null);

    const handlePlanner = (e) => {
        e.preventDefault();
        // Dummy Planner Logic
        let suggestion = "Bus 101 and Metro Line 1 Transfer";
        let path = [
            [28.6139, 77.209], [28.62, 77.22], [28.63, 77.23]
        ];

        setPlannerResult({
            from, to,
            steps: [
                `Walk to ${from} stop (5 min)`,
                `Board Bus 101, ride 10 min`,
                `Transfer to Metro Line 1 at Central Hub`,
                `Ride 8 min, arrive at ${to} stop`
            ],
            eta: "35 min", path // Path data for optional map display
        });
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl h-full overflow-y-auto">
            <div className="flex items-center space-x-4 mb-6">
                <FaRoute className={`text-4xl ${PRIMARY_COLOR}`} />
                <h2 className={`text-3xl font-bold ${PRIMARY_COLOR}`}>Journey Planner (Feature 3)</h2>
            </div>
            
            <form onSubmit={handlePlanner} className="space-y-4 p-4 border border-blue-200 rounded-lg bg-gray-50 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Start Location (e.g., Downtown)" value={from} onChange={(e) => setFrom(e.target.value)}
                        className={`p-3 border ${INPUT_BORDER} rounded-lg ${RING_FOCUS}`} required />
                    <input type="text" placeholder="Destination (e.g., Central Station)" value={to} onChange={(e) => setTo(e.target.value)}
                        className={`p-3 border ${INPUT_BORDER} rounded-lg ${RING_FOCUS}`} required />
                </div>
                <button type="submit" className={`w-full ${ACCENT_COLOR_BG} text-white p-3 rounded-lg font-bold hover:bg-cyan-600 transition`}>
                    Find Best Route
                </button>
            </form>

            {plannerResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 border border-cyan-300 rounded-lg bg-cyan-50/10">
                    <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center"><FaBus className="mr-2"/> Suggested Route Summary</h3>
                    <p className="font-semibold text-gray-700 mb-2">Total Time: <span className={ACCENT_COLOR_TEXT}>{plannerResult.eta}</span></p>
                    <ol className="list-decimal list-inside text-gray-600 space-y-1 ml-4">
                        {plannerResult.steps.map((step, i) => (<li key={i}>{step}</li>))}
                    </ol>
                </motion.div>
            )}
        </div>
    );
};


// --- Dashboard Navigation Items ---
const navItems = [
  { name: "Live Map & Tracking", icon: FaMapMarkedAlt, component: "Map" },
  { name: "Journey Planner", icon: FaRoute, component: "Planner" },
  { name: "Alerts & Notifications", icon: FaBell, component: "Alerts" },
  { name: "Profile & Settings", icon: FaUserCircle, component: "Profile" },
  { name: "History & Favorites", icon: FaHistory, component: "History" },
  { name: "Fare & Ticketing", icon: FaTicketAlt, component: "Fares" },
  { name: "Feedback & Support", icon: FaCommentDots, component: "Feedback" },
];


// ====================================================================
// --- MAIN DASHBOARD COMPONENT ---
// ====================================================================

export default function UserDashboard() {
  const navigate = useNavigate();
  // const { logout, user } = useContext(AuthContext); // Assuming AuthContext is available
  const [activeComponent, setActiveComponent] = useState("Map");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Map":
        return <LiveTrackingMap />; 
      case "Planner":
        return <JourneyPlanner />; // Feature 3
      case "Alerts":
        return <PlaceholderComponent title="Alerts & Notifications" icon={FaBell} features={["Receive real-time notifications for delays, route changes, or cancellations.", "Set optional alerts for nearby vehicles or approaching stops."]} />; // Feature 4
      case "Profile":
        return <PlaceholderComponent title="Account & Profile Management" icon={FaUserCircle} features={["Sign up / log in / log out.", "Manage personal details (name, email, phone number, payment info).", "View travel history."]} />; // Feature 1
      case "History":
        return <PlaceholderComponent title="History & Favorites" icon={FaHistory} features={["View past trips for convenience.", "Save frequently used routes or stops."]} />; // Feature 7
      case "Fares":
        return <PlaceholderComponent title="Fare & Ticketing" icon={FaTicketAlt} features={["View fare estimates.", "Book or pay for trips if the system supports digital ticketing."]} />; // Feature 5
      case "Feedback":
        return <PlaceholderComponent title="Feedback & Support" icon={FaCommentDots} features={["Report issues with vehicles or services.", "Rate journeys or provide feedback to the transport authority."]} />; // Feature 6
      default:
        return <LiveTrackingMap />;
    }
  };

  const handleLogout = () => {
    // logout(); // Actual logout call
    navigate("/login");
  };

  const sidebarClasses = isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Mobile Menu Toggle Button */}
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
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-8 pt-2">
            <FaBus className="text-3xl text-cyan-400" />
            <h1 className="text-2xl font-bold tracking-wider text-white">TransitNow</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveComponent(item.component);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 
                  ${activeComponent === item.component 
                    ? `font-bold ${ACCENT_COLOR_BG} text-white shadow-md` 
                    : "text-gray-300 hover:bg-blue-600 hover:text-white"
                  }`}
              >
                <item.icon className="text-lg" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto pt-6 border-t border-blue-600">
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-red-300 hover:bg-blue-600 transition-colors">
              <FaSignOutAlt className="text-lg" />
              <span>Log Out (Feature 1)</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 p-8 pt-16 md:pt-8 transition-all duration-300">
        
        {/* Header/Breadcrumb */}
        <header className="mb-8 p-4 bg-white rounded-xl shadow-md flex justify-between items-center">
          <h2 className={`text-2xl font-semibold ${PRIMARY_COLOR}`}>
            {navItems.find(item => item.component === activeComponent)?.name || "Dashboard"}
          </h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hidden sm:inline">Welcome, Passenger!</span> 
            <FaUserCircle className={`text-2xl ${ACCENT_COLOR_TEXT}`} />
          </div>
        </header>

        {/* Dynamic Content Area */}
        <motion.div 
          key={activeComponent} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[calc(100vh-160px)]" 
        >
          {renderComponent()}
        </motion.div>

      </div>
    </div>
  );
}
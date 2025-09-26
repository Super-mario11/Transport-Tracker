import { useState, useEffect } from 'react';

// --- DATA CONSTANTS ---
// 8 Stop Locations (Central Delhi area approximation for demo)
const stopsData = [
    { id: "S1", name: "Central Terminal", coords: [28.6150, 77.2095] },
    { id: "S2", name: "University Gate", coords: [28.6250, 77.2150] },
    { id: "S3", name: "Airport Link", coords: [28.6050, 77.2250] },
    { id: "S4", name: "IT Park North", coords: [28.6350, 77.2000] },
    { id: "S5", name: "Residential South", coords: [28.6000, 77.2180] },
    { id: "S6", name: "River Crossing", coords: [28.6200, 77.1950] },
    { id: "S7", name: "Old City Market", coords: [28.6300, 77.2100] },
    { id: "S8", name: "Industrial Zone", coords: [28.6050, 77.1900] },
];

// 4 Routes
const routesData = [
    { id: "A", name: "Downtown Express", type: "bus", stops: ["S1", "S2", "S4", "S6"], color: "#1E90FF" },
    { id: "B", name: "Airport Shuttle", type: "bus", stops: ["S1", "S3", "S5"], color: "#DC3545" },
    { id: "M1", name: "Metro Green Line", type: "metro", stops: ["S1", "S7", "S8"], color: "#28A745" },
    { id: "T1", name: "City Tram Loop", type: "tram", stops: ["S2", "S4", "S7"], color: "#FF8C00" },
];

// Utility to create straight-line path data for Polyline
const generatePath = (start, end) => {
    const steps = 5;
    const path = [];
    for (let i = 0; i <= steps; i++) {
        const factor = i / steps;
        path.push([
            start[0] + (end[0] - start[0]) * factor,
            start[1] + (end[1] - start[1]) * factor
        ]);
    }
    return path;
};

// 15 Dummy Vehicles (Expanded dataset)
const initialVehicles = [
    { id: "bus101", type: "bus", number: "Bus 101", route: "A", coords: [28.6180, 77.2120], speed: 45, path: generatePath(stopsData[0].coords, stopsData[1].coords) },
    { id: "bus102", type: "bus", number: "Bus 102", route: "A", coords: [28.6230, 77.2050], speed: 0, path: generatePath(stopsData[1].coords, stopsData[3].coords) },
    { id: "bus103", type: "bus", number: "Bus 103", route: "A", coords: [28.6100, 77.2000], speed: 30, path: generatePath(stopsData[3].coords, stopsData[0].coords) },
    { id: "bus201", type: "bus", number: "Bus 201", route: "B", coords: [28.6100, 77.2200], speed: 50, path: generatePath(stopsData[2].coords, stopsData[4].coords) },
    { id: "bus202", type: "bus", number: "Bus 202", route: "B", coords: [28.6020, 77.2220], speed: 25, path: generatePath(stopsData[4].coords, stopsData[0].coords) },
    { id: "metro11", type: "metro", number: "Metro M1A", route: "M1", coords: [28.6300, 77.2150], speed: 70, path: generatePath(stopsData[6].coords, stopsData[7].coords) },
    { id: "metro12", type: "metro", number: "Metro M1B", route: "M1", coords: [28.6100, 77.1950], speed: 75, path: generatePath(stopsData[7].coords, stopsData[0].coords) },
    { id: "tram31", type: "tram", number: "Tram T10", route: "T1", coords: [28.6250, 77.2000], speed: 15, path: generatePath(stopsData[1].coords, stopsData[3].coords) },
    { id: "tram32", type: "tram", number: "Tram T11", route: "T1", coords: [28.6300, 77.2050], speed: 0, path: generatePath(stopsData[3].coords, stopsData[6].coords) },
    { id: "bus401", type: "bus", number: "Bus 401", route: "A", coords: [28.6190, 77.2090], speed: 55, path: generatePath(stopsData[0].coords, stopsData[3].coords) },
    { id: "bus402", type: "bus", number: "Bus 402", route: "B", coords: [28.6080, 77.2280], speed: 40, path: generatePath(stopsData[2].coords, stopsData[4].coords) },
    { id: "metro41", type: "metro", number: "Metro M4", route: "M1", coords: [28.6400, 77.2100], speed: 65, path: generatePath(stopsData[6].coords, stopsData[0].coords) },
    { id: "tram41", type: "tram", number: "Tram T4", route: "T1", coords: [28.6200, 77.2050], speed: 20, path: generatePath(stopsData[1].coords, stopsData[6].coords) },
    { id: "bus501", type: "bus", number: "Bus 501", route: "A", coords: [28.6120, 77.2050], speed: 40, path: generatePath(stopsData[0].coords, stopsData[1].coords) },
    { id: "bus502", type: "bus", number: "Bus 502", route: "B", coords: [28.6030, 77.2100], speed: 0, path: generatePath(stopsData[4].coords, stopsData[2].coords) },
];

// --- CUSTOM HOOK ---
export function useVehicleData() {
    const [vehicles, setVehicles] = useState(initialVehicles);

    // Simulation Logic (Moves vehicles every 3 seconds)
    useEffect(() => {
        const MOVEMENT_STEP = 0.0001; 
        const interval = setInterval(() => {
            setVehicles(prevVehicles =>
                prevVehicles.map(v => {
                    // Only move if speed > 0 (basic simulation of stopped vehicles)
                    if (v.speed === 0) return v;

                    return {
                        ...v,
                        coords: [
                            v.coords[0] + MOVEMENT_STEP * (Math.random() - 0.4),
                            v.coords[1] + MOVEMENT_STEP * (Math.random() - 0.4),
                        ]
                    };
                })
            );
        }, 3000); // 3 seconds interval
        return () => clearInterval(interval);
    }, []);

    // Future-proofed function hooks (Admin/Driver features)
    const updateVehicle = (id, updates) => {
        setVehicles(prev => prev.map(v => (v.id === id ? { ...v, ...updates } : v)));
    };

    return {
        vehicles,
        stopsData,
        routesData,
        updateVehicle, // Exporting update function for Driver/Admin panels
    };
}

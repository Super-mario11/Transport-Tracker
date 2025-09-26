import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function VehicleMarker({ map, vehicle }) {
  useEffect(() => {
    if (!map) return;

    const el = document.createElement("div");
    el.className = "vehicle-marker";
    el.style.width = "20px";
    el.style.height = "20px";
    el.style.backgroundColor = "red";
    el.style.borderRadius = "50%";

    const marker = new mapboxgl.Marker(el)
      .setLngLat([vehicle.lng, vehicle.lat])
      .setPopup(new mapboxgl.Popup().setText(`Bus ${vehicle.id}`))
      .addTo(map);

    return () => marker.remove();
  }, [map, vehicle]);

  return null;
}

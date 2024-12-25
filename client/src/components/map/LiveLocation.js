// LiveLocation.js
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getDistance } from "geolib"; // Import getDistance from geolib
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

function LiveLocation({ destination }) {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (!map || !destination) return; // Check if map and destination are ready

    // Initialize the routing control
    const control = L.Routing.control({
      waypoints: [],
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      createMarker: () => null, // Disable default markers
    }).addTo(map);

    setRoutingControl(control);

    // Function to handle location updates
    const handlePosition = (position) => {
      const { latitude, longitude } = position.coords;
      const userLocation = [latitude, longitude];
      map.setView(userLocation, 15); // Zoom in closer to the user

      // Set waypoints
      control.setWaypoints([
        L.latLng(userLocation),
        L.latLng(destination.latitude, destination.longitude),
      ]);

      // Calculate distance
      const calculatedDistance = getDistance(
        { latitude, longitude },
        { latitude: destination.latitude, longitude: destination.longitude }
      );

      setDistance((calculatedDistance / 1000).toFixed(2)); // Distance in kilometers
    };

    const watchId = navigator.geolocation.watchPosition(handlePosition, (error) => {
      console.error("Error fetching location: ", error);
    }, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    });

    return () => {
      control.remove(); // Clean up on component unmount
      navigator.geolocation.clearWatch(watchId); // Clear the geolocation watch
    };
  }, [map, destination]);

  return (
    distance && (
      <div className="distance-info">
        Distance to destination: {distance} km
      </div>
    )
  );
}

export default LiveLocation;

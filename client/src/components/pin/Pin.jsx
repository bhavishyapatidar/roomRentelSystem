import { Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet to define custom icons
import "./pin.scss";
import { Link } from "react-router-dom";

// Define the custom marker icon
const customMarkerIcon = L.icon({
  iconUrl: "/pin.png", // Replace with the path to your custom marker image
  iconSize: [38, 38], // Adjust the size of the icon if needed
  iconAnchor: [19, 38], // The point of the icon which will correspond to the marker's location
  popupAnchor: [0, -38], // Position of the popup relative to the icon
});

function Pin({ item }) {
  return (
    <Marker
      position={[item.latitude, item.longitude]}
      icon={customMarkerIcon} // Use the custom marker icon here
    >
      <Popup>
        <div className="popupContainer">
          {item.images && item.images[0] ? (
            <img src={item.images[0]} alt={item.title} />
          ) : (
            <p>No image available</p>
          )}
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;

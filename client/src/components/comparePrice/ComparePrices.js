import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ComparePrices.scss";

const ComparePrices = () => {
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8800/api/compare-prices?query=${query}`
      );
      setRooms(response.data.olx);
    } catch (error) {
      console.error("Error fetching room data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPrices();
  };

  return (
    <div className="comparePrices">
      <h1>Compare Room Prices</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter room type or location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="roomList">
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div className="roomCard" key={index}>
                <h3>{room.title}</h3>
                <p>Price: ₹{room.price}</p>
                <a href={room.link} target="_blank" rel="noopener noreferrer">
                  View on OLX
                </a>
              </div>
            ))
          ) : (
            <p>No rooms found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComparePrices;

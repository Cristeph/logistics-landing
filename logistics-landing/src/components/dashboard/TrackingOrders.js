import React, { useState } from "react";
import {
  FaSearch,
  FaSlidersH,
  FaBox,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

const TrackingOrders = () => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/orders/${trackingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 px-5 py-2 bg-white rounded-lg shadow-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <p className="font-bold text-xl mr-2">Tracking Orders</p>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 h-1">
          <div className="bg-blue-500 h-1 w-full"></div>
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Enter Tracking ID..."
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-grow bg-transparent outline-none text-gray-700"
          />
          <button onClick={handleSearch} className="text-blue-500 ml-2">
            Search
          </button>
          {/* <FaSlidersH className="text-gray-400 ml-2" /> */}
        </div>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {order && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg">Order Details</h2>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <FaBox className="text-blue-500 mr-2" />
                <p className="font-semibold">
                  Order ID: #{order.trackingNumber}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mb-2">
              <div className="flex items-center mb-1">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <p className="text-sm text-gray-700">
                  Pickup Location:{" "}
                  {`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.country}`}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <p className="text-sm text-gray-700">
                  Drop Location:{" "}
                  {`${order.dropoffAddress.street}, ${order.dropoffAddress.city}, ${order.dropoffAddress.country}`}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-sm text-gray-700">{order.customer.name}</p>
              </div>
              <p className="font-semibold text-blue-500">
                ${order.price.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingOrders;

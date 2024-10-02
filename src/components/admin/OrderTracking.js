import React, { useState } from "react";
import { FaSearch, FaBox, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const OrderTracking = () => {
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
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await fetch(`/api/orders/${trackingId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token
        },
      });

      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setOrder(data); // Assuming the response contains the order details
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-xl font-bold mb-4">Track Your Order</h1>
        <form onSubmit={handleSearch} className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="border rounded-l-md px-4 py-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-md px-4 py-2 flex items-center"
          >
            <FaSearch className="mr-1" />
            Search
          </button>
        </form>

        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {order && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg">Order Details</h2>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <FaBox className="text-blue-500 mr-2" />
                <p className="font-semibold">Order ID: #{order.trackingNumber}</p>
              </div>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mb-2">
              <div className="flex items-center mb-1">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <p className="text-sm text-gray-700">Pickup Location: {`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.country}`}</p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-2" />
                <p className="text-sm text-gray-700">Drop Location: {`${order.dropoffAddress.street}, ${order.dropoffAddress.city}, ${order.dropoffAddress.country}`}</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaUser className="text-gray-500 mr-2" />
                <p className="text-sm text-gray-700">{order.customer.name}</p>
              </div>
              <p className="font-semibold text-blue-500">${order.price.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
import React, { useState } from "react";
import { FaSearch, FaBox, FaMapMarkerAlt, FaUser, FaCreditCard } from "react-icons/fa";

const GetPayment = () => {
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
      const response = await fetch(`/api/payments/${trackingId}`, {
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
    <div className="my-5">
      <h1 className="text-2xl font-bold mb-4">Get Payment by ID</h1>
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Enter Payment ID..."
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-grow bg-transparent outline-none text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="text-blue-500 ml-2"
        >
          Search
        </button>
      </div>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {order && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Order Details</h2>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FaBox className="text-blue-500 mr-2" />
              <p className="font-semibold">Order ID: #{order.order.trackingNumber}</p>
            </div>
            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mb-2">
            <div className="flex items-center mb-1">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              <p className="text-sm text-gray-700">Pickup Location: {`${order.order.pickupAddress.street}, ${order.order.pickupAddress.city}, ${order.order.pickupAddress.country}`}</p>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-blue-500 mr-2" />
              <p className="text-sm text-gray-700">Drop Location: {`${order.order.dropoffAddress.street}, ${order.order.dropoffAddress.city}, ${order.order.dropoffAddress.country}`}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaUser className="text-gray-500 mr-2" />
              <p className="text-sm text-gray-700">Order ID: {order.order.customer}</p>
            </div>
            <p className="font-semibold text-blue-500">${order.amount.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Payment Information</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaCreditCard className="text-gray-500 mr-2" />
                <p className="text-sm text-gray-700">Payment Method: {order.method}</p>
              </div>
              <p className="font-semibold text-gray-700">Transaction ID: {order.transactionId}</p>
            </div>
            <p className="text-sm text-gray-500">Status: {order.status}</p>
            <p className="text-sm text-gray-500">Amount Paid: ${order.amount.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPayment;
import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const CourierAssignmentCard = ({ onClose }) => {
  const [courierId, setCourierId] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleAssignCourier = async (e) => {
    e.preventDefault();

    const assignmentData = {
      courierId,
      orderId,
    };

    try {
      const response = await fetch('/api/couriers/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to assign courier');
      }

      const result = await response.json();
      console.log("Courier assigned successfully:", result);
      // Optionally, you can reset the state or close the card
      onClose();
    } catch (error) {
      console.error("Error assigning courier:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Assign Courier to Order</h2>
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleAssignCourier}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Courier ID:</label>
            <input
              type="text"
              value={courierId}
              onChange={(e) => setCourierId(e.target.value)}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Order ID:</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaSave className="inline mr-1" /> Assign Courier
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourierAssignmentCard;
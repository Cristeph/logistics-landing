import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const CourierCreationCard = ({ onSubmit, onClose }) => {
  const [name, setName] = useState("");
  const [vehicleType, setVehicleType] = useState("bike");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourier = {
      name,
      vehicleType,
    };
    onSubmit(newCourier);
    
    // Reset form after submission
    setName("");
    setVehicleType("bike");
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-11/12 max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Courier</h2>
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Courier Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Vehicle Type:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="bike">Bike</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            <FaSave className="inline mr-1" /> Save Courier
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourierCreationCard;
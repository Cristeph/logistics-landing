import React from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

const TrackingOrders = () => {
  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold mb-4">Tracking orders</h1>
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow bg-transparent outline-none text-gray-700"
        />
        <FaSlidersH className="text-gray-400 ml-2" />
      </div>
    </div>
  );
};

export default TrackingOrders;
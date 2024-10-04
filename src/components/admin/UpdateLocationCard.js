import React, { useState } from "react";

const UpdateLocationCard = () => {
  const [courierId, setCourierId] = useState(""); // State for courier ID
  const [location, setLocation] = useState(""); // Default location
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const locationData = {
      location,
    };

    try {
      const response = await fetch(`/api/couriers/${courierId}/location`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        throw new Error("Failed to update courier location");
      }

      const result = await response.json();
      setSuccess("Courier location updated successfully!");
      setError(null);
      console.log("Updated location response:", result);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="my-4">
      <div className="mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Update Courier Location</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Courier ID</label>
            <input
              type="text"
              value={courierId}
              onChange={(e) => setCourierId(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              placeholder="Enter Courier ID"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location (latitude, longitude)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              placeholder="Enter Location"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Update Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateLocationCard;
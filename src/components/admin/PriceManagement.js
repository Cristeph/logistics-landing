import React, { useState } from "react";

const PricingManagementCard = ({ order }) => {
  const [price, setPrice] = useState("");

  const handlePriceUpdate = (e) => {
    e.preventDefault();
    // Logic to save the price to database
    alert(`Price for ${order.product} has been set to ${price}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4 my-2">
      <h2 className="text-lg font-semibold">Price Management</h2>
      <p><strong>Product:</strong> {order.product}</p>
      <p><strong>Destination:</strong> {order.destination}</p>
      <p><strong>Weight:</strong> {order.weight} kg</p>

      <form onSubmit={handlePriceUpdate}>
        <label className="block mb-2 text-gray-700">Enter Price ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          Set Price
        </button>
      </form>
    </div>
  );
};

export default PricingManagementCard;
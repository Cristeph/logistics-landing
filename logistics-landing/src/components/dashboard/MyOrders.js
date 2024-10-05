import React from "react";

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      product: "Laptop",
      location: "Warehouse",
      eta: "2 Days",
      status: "In Transit",
    },
    {
      id: 2,
      product: "Smartphone",
      location: "Out for Delivery",
      eta: "Today",
      status: "Out for Delivery",
    },
    // More orders...
  ];
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
      <table className="min-w-full table-auto text-justify">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Current Location</th>
            <th className="px-4 py-2">Estimated Delivery</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.product}</td>
              <td className="px-4 py-2">{order.location}</td>
              <td className="px-4 py-2">{order.eta}</td>
              <td className="px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ShippingStatus = () => {
  const trackingData = [
    { label: "Start", value: 0 },
    { label: "In Transit", value: 25 },
    { label: "Warehouse", value: 50 },
    { label: "Out for Delivery", value: 55 },
    { label: "Delivered", value: 10 },
  ];

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
  ];

  return (
    <div className="my-4 space-y-8">
      {/* Product Tracking Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Product Tracking Details
        </h2>
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-100 p-4 rounded-lg mb-4 shadow-sm"
          >
            <p className="text-gray-700">
              <strong>Product:</strong> {order.product}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {order.location}
            </p>
            <p className="text-gray-700">
              <strong>ETA:</strong> {order.eta}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {order.status}
            </p>
          </div>
        ))}
      </div>
      {/* Bar Chart for Shipment Progress */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Shipment Status
        </h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trackingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ShippingStatus;

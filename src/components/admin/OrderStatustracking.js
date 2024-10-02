import React from "react";

const OrderStatusCard = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Order Status</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Product:</strong> {order.product}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>ETA:</strong> {order.eta}</p>
    </div>
  );
};

export default OrderStatusCard;

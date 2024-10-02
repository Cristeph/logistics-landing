import React from "react";

const OrderMetricsCard = ({ metrics }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Order Metrics</h2>
      <p><strong>Total Orders:</strong> {metrics.totalOrders}</p>
      <p><strong>Pending Orders:</strong> {metrics.pendingOrders}</p>
      <p><strong>Orders in Transit:</strong> {metrics.inTransitOrders}</p>
      <p><strong>Delivered Orders:</strong> {metrics.deliveredOrders}</p>
      <p><strong>Average Delivery Time:</strong> {metrics.avgDeliveryTime} days</p>
    </div>
  );
};

export default OrderMetricsCard;

import React from "react";

const DeliveryPerformanceCard = ({ performance }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Delivery Performance</h2>
      <p><strong>Time from Approval to Delivery:</strong> {performance.timeToDeliver} hours</p>
      <p><strong>On-Time Delivery Rate:</strong> {performance.onTimeRate}%</p>
    </div>
  );
};

export default DeliveryPerformanceCard;

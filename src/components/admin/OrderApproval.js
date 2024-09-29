import React, { useState } from "react";

const OrderApprovalCard = ({ order }) => {
  const [status, setStatus] = useState(null);

  const handleApprove = () => {
    setStatus("Approved");
    // Additional logic for approving the order can go here
  };

  const handleReject = () => {
    setStatus("Rejected");
    // Additional logic for rejecting the order can go here
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Order Details</h2>
      <p><strong>Customer Name:</strong> {order.customerName}</p>
      <p><strong>Description:</strong> {order.description}</p>
      <p><strong>Destination:</strong> {order.destination}</p>
      <p><strong>Current Status:</strong> {status || "Pending"}</p>
      
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={handleApprove}
          className="bg-green-500 text-white py-1 px-4 rounded"
        >
          Approve
        </button>
        <button 
          onClick={handleReject}
          className="bg-red-500 text-white py-1 px-4 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default OrderApprovalCard;

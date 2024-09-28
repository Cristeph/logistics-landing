import React from "react";

const PaymentOverviewCard = ({ payment }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Payment Overview</h2>
      <p><strong>Order ID:</strong> {payment.orderId}</p>
      <p><strong>Amount Paid:</strong> ${payment.amountPaid}</p>
      <p><strong>Payment Status:</strong> {payment.status}</p>
      <p><strong>Paid On:</strong> {payment.datePaid}</p>
    </div>
  );
};

export default PaymentOverviewCard;

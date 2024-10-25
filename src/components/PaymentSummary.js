import React, { useEffect, useState } from "react";
import { numberWithCommas } from 'utils/helpers';

const PaymentSummaryCard = () => {
  const [summary, setSummary] = useState({
    totalPayments: 0,
    totalAmount: 0, 
    recentPaymentDate: "",
  });

  useEffect(() => {
    const fetchPaymentsSummary = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/payments/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }

        const payments = await response.json();

        // Calculate summary
        const totalPayments = payments.length;
        const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
        const recentPaymentDate = payments.length
          ? new Date(Math.max(...payments.map(payment => new Date(payment.createdAt)))).toLocaleDateString()
          : "N/A";

        setSummary({
          totalPayments,
          totalAmount: totalAmount.toFixed(2),
          recentPaymentDate,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentsSummary();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600">Total Payments</p>
          <p className="text-xl font-semibold">{summary.totalPayments}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-xl font-semibold">₦{numberWithCommas(summary.totalAmount)}</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600">Most Recent Payment</p>
        <p className="text-xl font-semibold">{summary.recentPaymentDate}</p>
      </div>
    </div>
  );
};

export default PaymentSummaryCard;
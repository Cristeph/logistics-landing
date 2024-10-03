import React, { useState } from "react";

const PaymentTokenCard = () => {
  const [orderId, setOrderId] = useState(""); // Example order ID
  const [amount, setAmount] = useState(); // Example amount
  const [transactionId, setTransactionId] = useState(""); // Example transaction ID
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve the token from local storage

    const paymentData = {
      orderId,
      amount,
      method: "credit_card",
      transactionId,
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the authorization header
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment token");
      }

      const result = await response.json();
      setSuccess("Payment token created successfully!");
      setError(null); // Clear any previous errors
      console.log("Payment token created:", result);
    } catch (error) {
      setError(error.message);
      setSuccess(null); // Clear any previous success messages
    }
  };

  return (
    <div className="py-4">
      <div className=" bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Create Payment Token</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Order ID</label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID"
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              placeholder="Enter amount"
              onChange={(e) => setAmount(Number(e.target.value))}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Transaction ID</label>
            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Create Payment Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentTokenCard;

import React, { useState } from "react";
import Swal from 'sweetalert2';

const PaymentTokenCard = () => {
  const [orderId, setOrderId] = useState(""); 
  const [amount, setAmount] = useState(""); 
  const [method, setMethod] = useState("credit_card"); 
  const [transactionId, setTransactionId] = useState(""); 
  const [paymentMade, setPaymentMade] = useState(false);

  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_95aeb37b0446963663690ae1c66ac7545b29d4be', 
      email: 'plutonium712@gmail.com',
      amount: amount * 100,
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: orderId,
          },
        ],
      },
      callback: function (response) {
        // Handle successful payment here
        console.log('Payment successful:', response);
        setTransactionId(response.reference); 
        setPaymentMade(true); 
        createPaymentToken(response.reference); 
      },
      onClose: function () {
        Swal.fire({
          title: 'Warning!',
          text: 'Payment window closed.',
          icon: 'warning',
        });
      },
    });
    handler.openIframe(); 
  };

  const createPaymentToken = async (reference) => {
    const token = localStorage.getItem("token"); 

    const paymentData = {
      orderId,
      amount,
      method,
      transactionId: reference,
    };

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment token");
      }

      const result = await response.json();
      Swal.fire({
        title: 'Success!',
        text: 'Payment token created successfully!',
        icon: 'success',
      });
      console.log("Payment token created:", result);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
      });
    } finally {
      clearForm(); // Clear the form after processing
    }
  };

  const clearForm = () => {
    setOrderId("");
    setAmount("");
    setTransactionId("");
    setPaymentMade(false);
    setMethod("credit_card"); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment(); // Initiate payment
  };

  return (
    <div className="py-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Create Payment Token</h1>
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
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
            >
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              {/* Add more payment methods as needed */}
            </select>
          </div>
          {paymentMade && (
            <div className="mb-4">
              <label className="block text-gray-700">Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                readOnly
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              />
            </div>
          )}
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
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Invoice = () => {
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
            display_name: "Invoice",
            variable_name: "invoice_id",
            value: orderId
          },
        ],
      },
      callback: function (response) {
        // Handle successful payment here
        console.log('Payment successful:', response);

        // Set the transaction ID from the Paystack response
        setTransactionId(response.reference);
        setPaymentMade(true); // Mark payment as made

        // Create payment token after successful payment
        createPaymentToken(response.reference);
      },
      onClose: function () {
        alert('Payment window closed.');
      },
    });
    handler.openIframe();
  };

  const createPaymentToken = async (reference) => {
    const token = localStorage.getItem('token');
    const paymentData = {
      orderId: orderId,
      amount: amount,
      method: method,
      transactionId: reference,
    };

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Payment token created successfully!',
          icon: 'success',
        });
      } else {
        throw new Error(result.message || 'Failed to create payment token');
      }
    } catch (error) {
      console.error('Error creating payment token:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Error creating payment token: ' + error.message,
        icon: 'error',
      });
    } finally {
      // Clear the form after processing
      clearForm();
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
    handlePayment(); 
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Order ID</label>
            <input
              type="text"
              value={orderId}
              placeholder="Enter order ID"
              onChange={(e) => setOrderId(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount (₦)</label>
            <input
              type="number"
              value={amount}
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              required
              step="0.01"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
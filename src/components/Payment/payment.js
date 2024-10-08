import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PaymentBillingComponent = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");


  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem("token"); // Get the token from local storage

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

        const data = await response.json();
        setPayments(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handlePayment = (orderId, amount) => {
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
        console.log(transactionId);

        // Create payment token after successful payment
        // createPaymentToken(response.reference);
      },
      onClose: function () {
        alert('Payment window closed.');
      },
    });
    handler.openIframe();
  };


  if (loading) {
    return <div>Loading payments...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Payment and Billing</h1>
        <Link to="invoice">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
            Create New Invoice
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md my-10">
        <div className="overflow-x-auto">
          {payments.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500">No payments available.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.order ? payment.order.trackingNumber : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.amount ? `₦${payment.amount.toFixed(2)}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <button
                        className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                        onClick={() => handlePayment(payment.order.trackingNumber, payment.amount)}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentBillingComponent;
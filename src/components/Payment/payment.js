import React from "react";
import { Link } from 'react-router-dom';

const orders = [
  {
    id: 1,
    description: "Order #12345",
    amount: "₦10000.00",
    date: "2023-09-20",
    status: "Paid",
  },
  {
    id: 2,
    description: "Order #12346",
    amount: "₦25000.00",
    date: "2023-09-22",
    status: "Pending",
  },
  {
    id: 3,
    description: "Order #12347",
    amount: "₦7500.00",
    date: "2023-09-25",
    status: "Paid",
  },
  {
    id: 4,
    description: "Order #12348",
    amount: "₦30000.00",
    date: "2023-09-26",
    status: "Pending",
  },
];

const PaymentBillingComponent = () => {
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
      <div className=" bg-white rounded-lg shadow-md my-10">
        <div className="overflow-x-auto">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentBillingComponent;

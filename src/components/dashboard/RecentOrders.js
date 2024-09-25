import React from "react";

const orders = [
  {
    orderNumber: "#4523 - 5248",
    name: "Adam mark",
    orderDate: "Sep 04, 2024",
    shippedDate: "Sep 07, 2024",
    address: "235, main flat, near ek park....",
    city: "Manchester",
    state: "UK",
    amount: "₦4000.00",
    status: "Shipped",
  },
  {
    orderNumber: "#4523 - 4652",
    name: "Ak Shan",
    orderDate: "Sep 01, 2024",
    shippedDate: "Sep 04, 2024",
    address: "35, Second APK Apartment",
    city: "London",
    state: "UK",
    amount: "₦4000.00",
    status: "Shipped",
  },
  {
    orderNumber: "#4523 - 3566",
    name: "Britto",
    orderDate: "Aug 26, 2024",
    shippedDate: "Sep 01, 2024",
    address: "235, main flat, near ek park....",
    city: "Manchester",
    state: "UK",
    amount: "₦4000.00",
    status: "Shipped",
  },
];

const RecentOrders = () => {
  return (
    <div className="">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders #
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipped to
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order date
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipped date
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.orderDate}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.shippedDate}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.address}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.city}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.state}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{order.amount}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {order.status}
                    </span>
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

export default RecentOrders;

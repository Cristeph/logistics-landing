import React, { useEffect, useState } from "react";
import { FaBox, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const DashboardStats = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [availableCarriers, setAvailableCarriers] = useState(262); // Assuming a static value for now
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage

      try {
        const response = await fetch("/api/orders/my-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token as a bearer token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setTotalOrders(data.length); 
        const totalPrice = data.reduce((acc, order) => acc + order.price, 0); // Sum of prices
        setTotalMoney(totalPrice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading stats...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex space-x-4 bg-gray-50 p-4">
      <Card
        title="Total Orders"
        value={totalOrders}
        icon={<FaBox className="text-yellow-500" />}
        trend="8.5% Up from yesterday" // Example trend, replace with actual data if available
        trendType="up"
      />
      <Card
        title="Total Money Received"
        value={`₦${totalMoney.toLocaleString()}`} // Format the total money
        icon={<FaMoneyBillWave className="text-blue-500" />}
        trend="1.3% Up from past week" // Example trend, replace with actual data if available
        trendType="up"
      />
      <Card
        title="Available Carriers"
        value={availableCarriers}
        icon={<FaChartLine className="text-green-500" />}
        trend="4.3% Down from yesterday" // Example trend, replace with actual data if available
        trendType="down"
      />
    </div>
  );
};

const Card = ({ title, value, icon, trend, trendType }) => {
  const trendColor = trendType === "up" ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-4 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-blue-500">{value}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className={`flex items-center ${trendColor}`}>
        <span className="mr-2">{trendType === "up" ? "↑" : "↓"}</span>
        <p className="text-sm">{trend}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
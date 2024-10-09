import React, { useEffect, useState } from "react";
import { FaBox, FaChartLine, FaBell } from "react-icons/fa";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMoney: 0,
    totalPayments: 0,
    recentPaymentDate: "",
    totalUnreadNotifications: 0,
    loading: true,
    error: null,
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
        const totalPayments = payments.length;
        const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
        const recentPaymentDate = payments.length
          ? new Date(Math.max(...payments.map(payment => new Date(payment.createdAt)))).toLocaleDateString()
          : "N/A";

        setStats(prev => ({
          ...prev,
          totalPayments,
          totalMoney: totalAmount.toFixed(2),
          recentPaymentDate,
        }));
      } catch (error) {
        setStats(prev => ({ ...prev, error: error.message }));
      }
    };

    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/orders/my-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        const totalOrders = data.length;
        const totalPrice = data.reduce((acc, order) => acc + order.price, 0);

        setStats(prev => ({
          ...prev,
          totalOrders,
          totalMoney: totalPrice.toFixed(2),
        }));
      } catch (error) {
        setStats(prev => ({ ...prev, error: error.message }));
      } finally {
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const notifications = await response.json();
        const unreadNotifications = notifications.filter(notification => !notification.read).length;

        setStats(prev => ({
          ...prev,
          totalUnreadNotifications: unreadNotifications,
        }));
      } catch (error) {
        setStats(prev => ({ ...prev, error: error.message }));
      }
    };

    fetchPaymentsSummary();
    fetchOrders();
    fetchNotifications();
  }, []);

  if (stats.loading) {
    return <p>Loading stats...</p>;
  }

  if (stats.error) {
    return <p>Error: {stats.error}</p>;
  }

  return (
    <div className="flex space-x-4 bg-gray-50 py-4">
      <Card
        title="Total Orders"
        value={stats.totalOrders}
        icon={<FaBox className="text-yellow-500" />}
        trend="8.5% Up from yesterday" // Example trend
        trendType="up"
      />
      <Card
        title="Total Payments"
        value={stats.totalPayments}
        icon={<FaChartLine className="text-green-500" />}
        trend="4.3% Down from yesterday" // Example trend
        trendType="down"
      />
      <Card
        title="Unread Notifications"
        value={stats.totalUnreadNotifications}
        icon={<FaBell className="text-red-500" />}
        trend="New notifications" // Example trend
        trendType="up"
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

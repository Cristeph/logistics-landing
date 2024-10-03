import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NotificationsCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
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
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="my-5 px-5 py-2 bg-white rounded-lg shadow-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <p className="font-bold text-xl mr-2">Notifications</p>
          </div>
        </div>
        <Link to={"/dashboard/notifications"} className="font-bold text-sm mr-2 text-teal-500">View All</Link>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 h-1">
          <div className="bg-blue-500 h-1 w-full"></div>
        </div>
      </div>

      {notifications.map((notification) => (
        <div className="mb-4" key={notification._id}>
          <div className="flex items-center mb-2">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
            </div>
            <div className="flex-grow">
              <p className="font-semibold capitalize">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.type}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{new Date(notification.createdAt).toLocaleDateString()}</p>
              <p>{new Date(notification.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsCard;

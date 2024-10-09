import React, { useEffect, useState } from "react";
import { FaTruck } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import Swal from "sweetalert2";
import waitingIllustration from 'assets/images/no-data-available.svg';

const Notify = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the notification!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`/api/notifications/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setNotifications((prev) => prev.filter((n) => n._id !== id));
          Swal.fire(
            "Deleted!",
            "Your notification has been deleted.",
            "success"
          );
        } else {
          throw new Error("Failed to delete notification");
        }
      } catch (error) {
        console.error(error);
        Swal.fire(
          "Error!",
          "There was a problem deleting the notification.",
          "error"
        );
      }
    }
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      } else {
        throw new Error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <button
          className="text-teal-600"
          onClick={() => {
            // Logic to delete all notifications could go here
          }}
        >
          Delete all
        </button>
      </div>
      <div className="bg-white rounded-lg">
        {notifications.length === 0 ? (
          <>
            <p className="text-center text-gray-600 p-4 text-lg">You have no notifications</p>
            <div className="flex">
              <img className="self-center mx-auto" src={waitingIllustration} alt="illustration" />
            </div>
          </>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id} className="border-b last:border-b-0 p-4">
                <div className="flex items-start space-x-4">
                  <FaTruck className="text-3xl text-teal-500" />
                  <div className="flex-1">
                    <p className="capitalize">
                      {notification.message}{" "}
                      <span className="text-teal-600">
                        {notification.project}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()} •{" "}
                      {notification.team}
                    </p>
                    {notification.comment && (
                      <p className="text-sm mt-1">{notification.comment}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <IoMdCheckmark
                        className="text-teal-500 w-5 h-5 cursor-pointer"
                        onClick={() => markAsRead(notification._id)}
                      />
                    )}
                    <AiFillDelete
                      className="text-red-500 w-5 h-5 cursor-pointer"
                      onClick={() => handleDelete(notification._id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default Notify;

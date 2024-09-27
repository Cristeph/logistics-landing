import React from "react";
import { FaTruck, } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const notifications = [
  {
    id: 1,
    name: "Logistics Manager",
    action: "updated the delivery schedule of",
    project: "Order #12345",
    date: "Oct 5",
    time: "Today",
    team: "Operations Team",
  },
  {
    id: 2,
    name: "Warehouse Supervisor",
    action: "added a note to",
    project: "Shipment #67890",
    comment: "Ensure all packages are labeled correctly.",
    time: "Yesterday",
    team: "Warehouse Team",
  },
  {
    id: 3,
    name: "Fleet Manager",
    action: "requested vehicle maintenance for",
    project: "Truck #5",
    time: "Yesterday",
    team: "Maintenance Team",
  },
  {
    id: 4,
    name: "Dispatch Coordinator",
    action: "assigned a new driver to",
    project: "Route #88",
    time: "2 days ago",
    team: "Dispatch Team",
  },
  {
    id: 5,
    name: "Customer Service",
    action: "received feedback on",
    project: "Delivery #55678",
    comment: "Customer mentioned a delay in delivery.",
    time: "3 days ago",
    team: "Customer Support",
  },
];

const Notify = () => {
  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <button className="text-teal-600">Delete all</button>
      </div>
      <div className="bg-white rounded-lg">
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b last:border-b-0 p-4">
              <div className="flex items-start space-x-4">
                <FaTruck className="text-3xl text-teal-500" />
                <div className="flex-1">
                  <p>
                    <span className="font-medium">{notification.name}</span>{" "}
                    {notification.action}{" "}
                    <span className="text-teal-600">
                      {notification.project}
                    </span>{" "}
                    {notification.date && `to ${notification.date}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notification.time} • {notification.team}
                  </p>
                  {notification.comment && (
                    <p className="text-sm mt-1">{notification.comment}</p>
                  )}
                  {notification.id === 3 && (
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-gray-200 rounded-md">
                        Decline
                      </button>
                      <button className="px-3 py-1 bg-teal-500 text-white rounded-md">
                        Approve
                      </button>
                    </div>
                  )}
                </div>
                <AiFillDelete className="text-red-500 w-5 h-5 cursor-pointer" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notify;
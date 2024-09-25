import React from "react";

const AdminTasks = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-4">
      <h2 className="text-xl font-semibold mb-4">Admin Tasks</h2>
      <ul className="space-y-4">
        <li className="p-4 bg-gray-50 rounded border border-gray-200">
          <strong>Update Shipment Status:</strong> There are 5 orders waiting
          for shipment status updates.
        </li>
        <li className="p-4 bg-gray-50 rounded border border-gray-200">
          <strong>Manage Users:</strong> Review new user registrations and
          manage user permissions.
        </li>
        {/* More admin tasks */}
      </ul>
    </div>
  );
};

export default AdminTasks;

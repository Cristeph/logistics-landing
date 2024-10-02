import React, { useState } from "react";
import DashboardStats from "components/admin/StatsCard";
import NotificationsCard from "components/dashboard/NotificationsCard";
import OrderRequests from "components/admin/OrderRequests";
import TrackingOrders from "components/dashboard/TrackingOrders";
import CourierCreationCard from "components/admin/CourierCreation";
import CourierAssignmentCard from "components/admin/CourierAssignment";

const Admin = () => {
  const [showCard, setShowCard] = useState(false);
  const [showAssignmentCard, setShowAssignmentCard] = useState(false);
  const handleCreateCourier = async (courier) => {
    try {
      const response = await fetch("/api/couriers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courier),
      });

      if (!response.ok) {
        throw new Error("Failed to Create courier");
      }

      const result = await response.json();
      console.log("Courier created successfully:", result);
    } catch (error) {
      console.error("Error creating courier:", error);
      // Handle error (e.g., show an error message)
    }
    setShowCard(false);
  };
  return (
    <div className="m-4">
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <TrackingOrders />
        </div>

        <div className="lg:col-span-2 md:col-span-1">
          <button
            onClick={() => setShowCard(true)}
            className="bg-teal-500 text-white px-4 py-2 mt-5 rounded hover:bg-teal-600 w-full"
          >
            Create Courier
          </button>

          {showCard && (
            <CourierCreationCard
              onSubmit={handleCreateCourier}
              onClose={() => setShowCard(false)}
            />
          )}
          <button
            onClick={() => setShowAssignmentCard(true)}
            className="bg-teal-500 text-white px-4 py-2 mt-5 rounded hover:bg-teal-600 w-full"
          >
            Assign Courier
          </button>

          {showAssignmentCard && (
            <CourierAssignmentCard
              onClose={() => setShowAssignmentCard(false)}
            />
          )}
          <NotificationsCard />
        </div>
      </div>

      <OrderRequests />

      {/* Additional Cards or Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6 mt-6">
        <div className="lg:col-span-5 md:col-span-2">
          {/* Placeholder for additional content */}
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          {/* Placeholder for additional content */}
        </div>
      </div>
    </div>
  );
};

export default Admin;

import React, { useState } from "react";
import DashboardStats from "components/admin/StatsCard";
import NotificationsCard from "components/dashboard/NotificationsCard";
import OrderRequests from "components/admin/OrderRequests";
import TrackingOrders from "components/dashboard/TrackingOrders";
import CourierCreationCard from "components/admin/CourierCreation";
import CourierAssignmentCard from "components/admin/CourierAssignment";
import GetPayment from "components/admin/GetUserPayment";
import NotificationSender from "components/admin/NotificationSender";
import PaymentSummaryCard from "components/PaymentSummary";
import PaymentTokenCard from "components/admin/CreateInvoice";
import UpdateLocationCard from "components/admin/UpdateLocationCard";
import PaymentBillingCard from "components/admin/Payment";

const Admin = () => {
  const [showCard, setShowCard] = useState(false);
  const [showAssignmentCard, setShowAssignmentCard] = useState(false);
  const handleCreateCourier = async (courier) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/couriers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    }
    setShowCard(false);
  };
  return (
    <div className="m-4">
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <TrackingOrders />
          <GetPayment />
          <PaymentBillingCard />

          <PaymentTokenCard />
          <NotificationSender />
        </div>

        <div className="lg:col-span-2 md:col-span-1">
          <PaymentSummaryCard />
          <UpdateLocationCard />
          <NotificationsCard />

          <div className="bg-white shadow-lg rounded-lg p-5 mb-5">
            <h2 className="text-2xl font-bold mb-2">Create Courier</h2>
            <p className="text-gray-700 mb-4">
              Fill in the details to create a new courier. Make sure to provide
              accurate information.
            </p>
            <button
              onClick={() => setShowCard(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full transition duration-200"
            >
              Create Courier
            </button>
            {showCard && (
              <CourierCreationCard
                onSubmit={handleCreateCourier}
                onClose={() => setShowCard(false)}
              />
            )}
          </div>

          <div className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-2xl font-bold mb-2">Assign Courier</h2>
            <p className="text-gray-700 mb-4">
              Choose a courier to assign to a specific route or task. Ensure the
              courier is available.
            </p>
            <button
              onClick={() => setShowAssignmentCard(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full transition duration-200"
            >
              Assign Courier
            </button>
            {showAssignmentCard && (
              <CourierAssignmentCard
                onClose={() => setShowAssignmentCard(false)}
              />
            )}
          </div>
        </div>
      </div>
      <OrderRequests />
    </div>
  );
};

export default Admin;

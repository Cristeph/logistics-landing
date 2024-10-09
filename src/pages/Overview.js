import React from "react";
// import Stats from "components/Stats";
import DashboardStats from "components/dashboard/StatsCard";
import NotificationsCard from "components/dashboard/NotificationsCard";
import OrderRequests from "components/dashboard/OrderRequests";
import OrdersAnalytics from "components/dashboard/OrderAnalytics"; 
import PaymentSummaryCard from "components/PaymentSummary";

const Overview = () => {
  return (
    <div className="m-4">
      {/* <Stats /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <DashboardStats />
          <PaymentSummaryCard/> 
          <OrdersAnalytics />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <OrderRequests />
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
};

export default Overview;

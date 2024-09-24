import React from "react";
// import Stats from "components/Stats";
import DashboardStats from "components/dashboard/StatsCard";
import TrackingOrders from "components/dashboard/TrackingOrders";
import NotificationsCard from "components/dashboard/NotificationsCard";
import OrderRequests from "components/dashboard/OrderRequests";
import OrdersAnalytics from "components/dashboard/OrderAnalytics";
import RecentOrders from "components/dashboard/RecentOrders";

const Overview = () => {
  return (
    <div className="m-4">
      {/* <Stats /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <DashboardStats />
          <OrdersAnalytics />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <OrderRequests />
        </div>
      </div>
      <RecentOrders />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <TrackingOrders />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <NotificationsCard />
        </div>
      </div>
    </div>
  );
};

export default Overview;

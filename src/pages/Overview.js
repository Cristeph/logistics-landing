import React from "react";
import Stats from "components/Stats";
import Card from "components/dashboard/Card";
import TrackingOrders from "components/dashboard/TrackingOrders";
import NotificationsCard from "components/dashboard/NotificationsCard";

const Overview = () => {
  return (
    <div className="m-4">
      {/* <Stats /> */}
      {/* Cards */}
      <Card />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 md:col-span-2">
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

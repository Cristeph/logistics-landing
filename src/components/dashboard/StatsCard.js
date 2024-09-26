import React from "react";
import { FaBox, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

const DashboardStats = () => {
  return (
    <div className="flex space-x-4 bg-gray-50">
      <Card
        title="Total Order"
        value="8,652"
        icon={<FaBox className="text-yellow-500" />}
        trend="8.5% Up from yesterday"
        trendType="up"
      />
      <Card
        title="Total Money Received"
        value="₦1,02,932"
        icon={<FaMoneyBillWave className="text-blue-500" />}
        trend="1.3% Up from past week"
        trendType="up"
      />
      <Card
        title="Available Carries"
        value="262"
        icon={<FaChartLine className="text-green-500" />}
        trend="4.3% Down from yesterday"
        trendType="down"
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
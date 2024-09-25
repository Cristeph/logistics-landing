import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 800 },
  { month: "Mar", value: 600 },
  { month: "Apr", value: 13000 },
  { month: "May", value: 900 },
  { month: "Jun", value: 500 },
  { month: "Jul", value: 700 },
  { month: "Aug", value: 1000 },
  { month: "Sep", value: 4000 },
  { month: "Oct", value: 3000 },
  { month: "Nov", value: 5000 },
  { month: "Dec", value: 6000 },
];

const OrdersAnalytics = () => {
  return (
    <div className="my-4 bg-gray-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Orders Analytics</h1>
          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">
            This year
          </button>
        </div>
        <div>
          <BarChart
            dataset={data}
            series={[{ dataKey: "value" }]}
            height={250}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            yAxis={[
              {
                scaleType: "linear",
                tickCount: 10,
              },
            ]}
            margin={{ top: 10, bottom: 30, right: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersAnalytics;

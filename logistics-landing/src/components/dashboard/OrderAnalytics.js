import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const OrdersAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("/api/orders/my-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const orders = await response.json();
        
        // Process data for the chart
        const orderSummary = orders.reduce((acc, order) => {
          const month = new Date(order.createdAt).toLocaleString("default", { month: "short" });
          if (!acc[month]) {
            acc[month] = 0;
          }
          acc[month] += order.price; 
          return acc;
        }, {});

        
        const chartData = Object.entries(orderSummary).map(([month, value]) => ({
          month,
          value,
        })).sort((a, b) => new Date(`1 ${a.month}`) - new Date(`1 ${b.month}`)); // Sort by month

        setData(chartData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading chart data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
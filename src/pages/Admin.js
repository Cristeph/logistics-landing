import React from "react";
// import Stats from "components/Stats";
import DashboardStats from "components/dashboard/StatsCard";
import NotificationsCard from "components/dashboard/NotificationsCard";
import OrderRequests from "components/dashboard/OrderRequests";
import OrdersAnalytics from "components/dashboard/OrderAnalytics";
import RecentOrders from "components/dashboard/RecentOrders";
import AdminTasks from "components/dashboard/AdminTasks";
import ShippingStatus from "components/dashboard/ShippingStatus";
import SystemPerformance from "components/dashboard/SystemPerformance";
import OrderApprovalCard from "components/admin/OrderApproval";
import OrderStatusCard from "components/admin/OrderStatustracking";
import PricingManagementCard from "components/admin/PriceManagement";
import OrderMetricsCard from "components/admin/OrderMetrics";
import DeliveryPerformanceCard from "components/admin/DeliveryPerformance";
import PaymentOverviewCard from "components/admin/PaymentOverview";
import InvoiceCard from "components/admin/Invoice";

const Admin = () => {
  const sampleOrder = {
    id: 1,
    customerName: "John Doe",
    description: "Laptop Delivery",
    destination: "New York",
    weight: 3,
    status: "In Transit",
    eta: "2 days",
  };

  const metrics = {
    totalOrders: 120,
    pendingOrders: 30,
    inTransitOrders: 60,
    deliveredOrders: 30,
    avgDeliveryTime: 5,
  };

  const performance = {
    timeToDeliver: 48,
    onTimeRate: 85,
  };

  const payment = {
    orderId: 1,
    amountPaid: 300,
    status: "Paid",
    datePaid: "2024-09-24",
  };

  const invoice = {
    orderId: 1,
    totalAmount: 300,
    date: "2024-09-24",
      const result = await response.json();
        console.log("Courier created successfully:", result);
      } catch (error) {
        console.error("Error creating courier:", error);
        // Hadndle error (e.g., show an error message)
      }
      setShowCard(false);
  };
  return (
    <div className="m-4">
      {/* <Stats /> */}
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <SystemPerformance />

          <ShippingStatus />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <OrderApprovalCard order={sampleOrder} />
          <OrderMetricsCard metrics={metrics} />

          <OrderRequests />
          <OrderStatusCard order={sampleOrder} />
        </div>
      </div>
      <RecentOrders />

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-5 md:col-span-2">
          <OrdersAnalytics />
          <PricingManagementCard order={sampleOrder} />
        </div>
        <div className="lg:col-span-2 md:col-span-1">
          <NotificationsCard />
          <InvoiceCard invoice={invoice} />
          <DeliveryPerformanceCard performance={performance} />

          <AdminTasks />
          <PaymentOverviewCard payment={payment} />
        </div>
      </div>
    </div>
  );
};

export default Admin;

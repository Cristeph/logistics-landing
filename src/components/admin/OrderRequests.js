import React, { useEffect, useState } from "react";
import { FaBox, FaMapMarkerAlt, FaSyncAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert
import OrderDetailsModal from "./OrderModal";

const OrderRequests = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
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

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = async (updatedOrder) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/orders/${updatedOrder._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      const data = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === data._id ? data : order))
      );
      setModalVisible(false);
      setSelectedOrder(null);

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "Order status updated successfully.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      setError(error.message);
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div className="my-2">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Recent Orders</h1>
          <div className="flex space-x-3">
            <FaBox className="text-gray-500 cursor-pointer" />
            <FaSyncAlt className="text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-blue-500 h-1 w-full"></div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                orderId={`#${order.trackingNumber}`}
                date={new Date(order.createdAt).toLocaleDateString()}
                dropLocation={`${order.dropoffAddress.street}, ${order.dropoffAddress.city}, ${order.dropoffAddress.country}`}
                pickupLocation={`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.country}`}
                customer={order.customer.name}
                orderStatus={order.status}
                onViewDetails={() => handleViewDetails(order)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No recent orders found.</p>
          )}
        </div>
      </div>
      {modalVisible && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

const OrderCard = ({
  orderId,
  date,
  dropLocation,
  pickupLocation,
  customer,
  orderStatus,
  onViewDetails,
}) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <FaBox className="text-blue-500 mr-2" />
        <p className="font-semibold">{orderId}</p>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <div className="mb-2">
      {pickupLocation && (
        <div className="flex items-center mb-1">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-700">
            Pickup Location: {pickupLocation}
          </p>
        </div>
      )}
      {dropLocation && (
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-700">Drop Location: {dropLocation}</p>
        </div>
      )}
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <FaMapMarkerAlt className="text-blue-500 mr-2" />
        <p className="text-sm text-gray-700 capitalize">Order Status: {orderStatus}</p>
      </div>

      <button
        onClick={onViewDetails}
        className="text-blue-500 text-sm font-semibold"
      >
        View Details
      </button>
    </div>
  </div>
);

export default OrderRequests;

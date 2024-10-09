import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderModal from './DetailedOrderModal'; // Import the modal component
import PaymentModal from './PaymentModal';  // Import the modal

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const token = localStorage.getItem('token');
    // Fetch orders based on the current page
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/orders/admin?page=${currentPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrders(response.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, [currentPage, isModalOpen, token]);

    // Handle order click to open modal
    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleOpenPaymentModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsPaymentModalOpen(true);
    };

    const handleClosePaymentModal = () => {
        setIsPaymentModalOpen(false);
        setSelectedOrderId(null);
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="text-black">
                        <tr>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">#</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Tracking Number</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Status</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Pickup Address</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Dropoff Address</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Customer</th>
                            <th className="px-4 py-2 text-xs md:text-sm lg:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="cursor-pointer hover:bg-gray-100">
                                <td className="border px-2 py-1 md:px-4 md:py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">{order.trackingNumber}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">{order.status}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">{order.pickupAddress.city}, {order.pickupAddress.state}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">{order.dropoffAddress.city}, {order.dropoffAddress.state}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">{order.customer.name}</td>
                                <td className="border px-2 py-1 md:px-4 md:py-2">
                                    <button
                                        className="text-blue-500 flex items-center"
                                        onClick={() => handleOrderClick(order)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="bg-blue-600 text-white px-2 py-1 rounded-md"
                                        onClick={() => handleOpenPaymentModal(order.trackingNumber)}
                                    >
                                        Set Payment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border bg-gray-300 disabled:bg-gray-100"
                >
                    Previous
                </button>
                <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border bg-gray-300 disabled:bg-gray-100"
                >
                    Next
                </button>
            </div>

            {/* Order Modal */}
            {isModalOpen && selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    refreshOrders={() => setCurrentPage(currentPage)} // Refresh after updates
                />
            )}

            {/* Payment Modal */}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={handleClosePaymentModal}
                orderId={selectedOrderId}
            />

        </div>
    );
}

export default OrderTable;

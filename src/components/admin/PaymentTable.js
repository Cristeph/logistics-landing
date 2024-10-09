import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { numberWithCommas } from 'utils/helpers';
import PaymentDetailsModal from './PaymentDetailsModal';  // Modal component

const PaymentTable = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const token = localStorage.getItem('token');
    // Fetch Payments
    const fetchPayments = async (page) => {
        try {
            const res = await axios.get(`/api/payments/admin?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayments(res.data); // Adjust according to your API response structure
            setTotalPages(res.data.totalPages); // Adjust based on your pagination
        } catch (err) {
            console.error("Failed to fetch payments", err);
        }
    };

    useEffect(() => {
        fetchPayments(currentPage);
        // eslint-disable-next-line
    }, [currentPage]);

    // Open Modal
    const handlePaymentClick = (payment) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    // Close Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPayment(null);
    };

    return (
        <div>
            <h2 className="text-xl font-bold m-4 text-center">Payment Management</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4">#</th>
                        <th className="py-2 px-4">Payment ID</th>
                        <th className="py-2 px-4">Amount</th>
                        <th className="py-2 px-4">Method</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment._id} className="text-center">
                            <td className="py-2 px-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4">{payment._id}</td>
                            <td className="py-2 px-4">₦{numberWithCommas((payment.amount).toFixed(2))}</td>
                            <td className="py-2 px-4">{payment.method}</td>
                            <td className="py-2 px-4">
                                {
                                    (payment.status === 'pending') ? (
                                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Pending</span>
                                    ) : (payment.status === 'completed') ? (
                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
                                    ) : (
                                        <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Failed</span>
                                    )
                                }
                            </td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => handlePaymentClick(payment)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Next
                </button>
            </div>

            {/* Payment Details Modal */}
            {isModalOpen && (
                <PaymentDetailsModal
                    payment={selectedPayment}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default PaymentTable;

import React from 'react';
import { numberWithCommas } from 'utils/helpers';

const PaymentDetailsModal = ({ payment, onClose }) => {
    if (!payment) return null;

    const { order } = payment;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-1/2">
                <h2 className="text-xl font-bold mb-4">Payment Details</h2>

                <div className="mb-4">
                    <h3 className="font-bold">Payment Info:</h3>
                    <p><strong>Payment ID:</strong> {payment._id}</p>
                    <p><strong>Amount:</strong> ₦{numberWithCommas((payment.amount / 100).toFixed(2))}</p>
                    <p><strong>Method:</strong> {payment.method}</p>
                    <p><strong>Status:</strong>
                        {
                            (payment.status === 'pending') ? (
                                <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">Pending</span>
                            ) : (payment.status === 'completed') ? (
                                <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Completed</span>
                            ) : (
                                <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Failed</span>
                            )
                        }
                    </p>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold">Order Info:</h3>
                    <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Pickup Address:</strong> {order.pickupAddress.street}, {order.pickupAddress.city}, {order.pickupAddress.state}, {order.pickupAddress.country}</p>
                    <p><strong>Dropoff Address:</strong> {order.dropoffAddress.street}, {order.dropoffAddress.city}, {order.dropoffAddress.state}, {order.dropoffAddress.country}</p>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;

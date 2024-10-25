import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdateOrderStatusModal = ({ courier, onClose }) => {
    const [status, setStatus] = useState('pending'); // default to 'pending'
    const token = localStorage.getItem('token');

    const updateStatus = async () => {
        try {
            await axios.put(`/api/couriers/${courier._id}/orders/status`, { status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            MySwal.fire({
                title: 'Success!',
                text: 'Status updated!',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();
        } catch (err) {
            console.error('Failed to update order status', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-center">Update Order Status for {courier.name}</h2>
                <div className="space-y-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                        <option value="in transit">In Transit</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                    </select>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={updateStatus}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                        Update Status
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderStatusModal;

import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AssignOrdersModal = ({ courier, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orderResults, setOrderResults] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const token = localStorage.getItem('token');

    // Fetch orders by tracking ID
    const searchOrders = async (trackingID) => {
        if (!trackingID) {
            setOrderResults([]);
            return;
        }
        try {
            const response = await axios.get(`/api/orders/${trackingID}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrderResults([response.data]); // Assuming response contains a single order object
        } catch (error) {
            console.error('Error fetching order by tracking ID:', error);
            setOrderResults([]);
        }
    };

    const handleOrderSelect = (order) => {
        if (!selectedOrders.some(o => o._id === order._id)) {
            setSelectedOrders([...selectedOrders, order]);
        }
    };

    const assignOrders = async () => {
        const orderIds = selectedOrders.map(order => order._id);
        try {
            await axios.put(`/api/couriers/${courier._id}/assign-orders`, { orderIds }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            MySwal.fire({
                title: 'Success!',
                text: 'Order assigned successfully',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();
        } catch (err) {
            console.error('Failed to assign orders', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-center">Assign Orders to {courier.name}</h2>
                <div className="space-y-4">
                    <div className="form-group">
                        <label>Search Order by Tracking ID</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                searchOrders(e.target.value);
                            }}
                            placeholder="Enter tracking ID"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {orderResults.length > 0 && (
                            <ul className="suggestions-list">
                                {orderResults.map((order) => (
                                    <li
                                        key={order._id}
                                        onClick={() => handleOrderSelect(order)}
                                        className="cursor-pointer hover:bg-gray-200 p-2"
                                    >
                                        {order.trackingNumber} - {order.status}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="form-group">
                        <h4>Selected Orders</h4>
                        {selectedOrders.length > 0 ? (
                            <ul>
                                {selectedOrders.map(order => (
                                    <li key={order._id}>
                                        {order.trackingNumber} - {order.status}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No orders selected yet</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={assignOrders}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                        Assign Orders
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

export default AssignOrdersModal;

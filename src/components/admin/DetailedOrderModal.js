import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaUser, FaBox } from "react-icons/fa";

const MySwal = withReactContent(Swal);

function DetailedOrderModal({ order, onClose, refreshOrders }) {
    const [status, setStatus] = useState(order.status);
    const [location, setLocation] = useState('');
    const [event, setEvent] = useState('');

    const token = localStorage.getItem('token');
    // Function to update order status
    const updateStatus = async () => {
        try {
            await axios.put(`/api/orders/${order._id}/status`, { status }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            refreshOrders();
            MySwal.fire({
                title: 'Success!',
                text: 'Order status updated',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Function to geocode the location using openstreetmap API
    const geocodeLocation = async () => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
            const { lat, lon } = response.data[0];
            await addLocationHistory(lat, lon);  // Call the function to add the history
        } catch (error) {
            console.error("Error geocoding location:", error);
        }
    };

    // Function to add location history
    const addLocationHistory = async (latitude, longitude) => {
        try {
            await axios.put(`/api/orders/${order._id}/history`, {
                location,
                latitude,
                longitude,
                event,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            refreshOrders();
            MySwal.fire({
                title: 'Success!',
                text: 'Order history updated',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();
        } catch (error) {
            console.error("Error adding location history:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-5xl gap-4">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-2">
                    {/* Left Column */}
                    <div className="pr-4">
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <FaBox className="text-blue-500 mr-2" />
                                <p className="font-semibold">Tracking ID:</p>
                                <span className="ml-2">{order.trackingNumber}</span> {/* Display-only */}
                            </div>
                            <div className="flex items-center mb-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <p className="text-sm text-gray-700">Customer: {order.customer.name}</p>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaUser className="text-gray-500 mr-2" />
                                <p className="text-sm text-gray-700">Email: {order.customer.email}</p>
                            </div>
                        </div>

                        <h3 className="font-semibold mb-2">Pickup Location:</h3>
                        <p>{`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.state}, ${order.pickupAddress.postalCode}, ${order.pickupAddress.country}`}</p>

                        <h3 className="font-semibold mb-2 mt-4">Dropoff Location:</h3>
                        <p>{`${order.dropoffAddress.street}, ${order.dropoffAddress.city}, ${order.dropoffAddress.state}, ${order.dropoffAddress.postalCode}, ${order.dropoffAddress.country}`}</p>
                    </div>

                    {/* Right Column */}
                    <div className="pl-4 border-l border-gray-300">
                        <h3 className="font-semibold mb-2 mt-4">Package Details:</h3>
                        <p>Weight: {order.packageDetails.weight} kg</p>
                        <p>Dimensions: {order.packageDetails.dimensions.length} x {order.packageDetails.dimensions.width} x {order.packageDetails.dimensions.height} cm</p>
                        <p>Description: {order.packageDetails.description}</p>


                        <h3 className="font-semibold mb-2 mt-4">Order History:</h3>
                        <ul>
                            {order.history.map((event) => (
                                <li key={event._id} className="mb-2">
                                    <p>{event.event}</p>
                                    <p className="text-xs text-gray-500">{new Date(event.updatedAt).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Status Update */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="pending">Pending</option>
                        <option value="received">Received</option>
                        <option value="in transit">In Transit</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={updateStatus}
                            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                        >
                            Update Status
                        </button>
                    </div>
                </div>

                {/* Add Location History */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Event</label>
                    <input
                        type="text"
                        placeholder="Enter event description"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    <label className="block text-sm font-medium text-gray-700 mt-4">Location</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={geocodeLocation}
                            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                        >
                            Add History
                        </button>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>


    );
}

export default DetailedOrderModal;

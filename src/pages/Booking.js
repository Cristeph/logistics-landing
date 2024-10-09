import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Booking = () => {
    const [activeTab, setActiveTab] = useState('create');
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({
        pickupStreet: '',
        pickupCity: '',
        pickupState: '',
        pickupPostalCode: '',
        pickupCountry: '',
        dropoffStreet: '',
        dropoffCity: '',
        dropoffState: '',
        dropoffPostalCode: '',
        dropoffCountry: '',
        weight: '',
        length: '',
        width: '',
        height: '',
        description: ''
    });

    const token = localStorage.getItem('token');

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders/my-orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                Swal.fire('Error', 'Unable to fetch orders.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong while fetching orders.', 'error');
        }
    };

    useEffect(() => {
        // Fetch orders on component mount
        fetchOrders();
        // eslint-disable-next-line
    },[activeTab]);

    const handleCreateOrder = async (e) => {
        e.preventDefault();

        const orderData = {
            pickupAddress: {
                street: formData.pickupStreet,
                city: formData.pickupCity,
                state: formData.pickupState,
                postalCode: formData.pickupPostalCode,
                country: formData.pickupCountry
            },
            dropoffAddress: {
                street: formData.dropoffStreet,
                city: formData.dropoffCity,
                state: formData.dropoffState,
                postalCode: formData.dropoffPostalCode,
                country: formData.dropoffCountry
            },
            packageDetails: {
                weight: formData.weight,
                dimensions: {
                    length: formData.length,
                    width: formData.width,
                    height: formData.height
                },
                description: formData.description
            }
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok) {
                // Alert user of success
                Swal.fire('Success', 'Order created successfully!', 'success');

                // Clear form fields
                setFormData({
                    pickupStreet: '',
                    pickupCity: '',
                    pickupState: '',
                    pickupPostalCode: '',
                    pickupCountry: '',
                    dropoffStreet: '',
                    dropoffCity: '',
                    dropoffState: '',
                    dropoffPostalCode: '',
                    dropoffCountry: '',
                    weight: '',
                    length: '',
                    width: '',
                    height: '',
                    description: ''
                });

                // Fetch updated list of orders
                fetchOrders();
            } else {
                Swal.fire('Error', data.message || 'Failed to create order.', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                {/* Tabs for switching between Create Order and Orders List */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`text-lg font-bold px-4 py-2 ${activeTab === 'create' ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500'}`}
                    >
                        Create Order
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`text-lg font-bold px-4 py-2 ${activeTab === 'orders' ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500'}`}
                    >
                        My Orders
                    </button>
                </div>

                {activeTab === 'create' ? (
                    <form onSubmit={handleCreateOrder}>
                        <h2 className="text-2xl font-bold mb-4">Create a New Order</h2>

                        {/* Pickup Address */}
                        <h3 className="font-bold mb-2">Pickup Address</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" name="pickupStreet" value={formData.pickupStreet} onChange={handleInputChange} placeholder="Street" className="border p-2 rounded" />
                            <input type="text" name="pickupCity" value={formData.pickupCity} onChange={handleInputChange} placeholder="City" className="border p-2 rounded" />
                            <input type="text" name="pickupState" value={formData.pickupState} onChange={handleInputChange} placeholder="State" className="border p-2 rounded" />
                            <input type="text" name="pickupPostalCode" value={formData.pickupPostalCode} onChange={handleInputChange} placeholder="Postal Code" className="border p-2 rounded" />
                            <input type="text" name="pickupCountry" value={formData.pickupCountry} onChange={handleInputChange} placeholder="Country" className="border p-2 rounded" />
                        </div>

                        {/* Dropoff Address */}
                        <h3 className="font-bold mb-2">Dropoff Address</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="text" name="dropoffStreet" value={formData.dropoffStreet} onChange={handleInputChange} placeholder="Street" className="border p-2 rounded" />
                            <input type="text" name="dropoffCity" value={formData.dropoffCity} onChange={handleInputChange} placeholder="City" className="border p-2 rounded" />
                            <input type="text" name="dropoffState" value={formData.dropoffState} onChange={handleInputChange} placeholder="State" className="border p-2 rounded" />
                            <input type="text" name="dropoffPostalCode" value={formData.dropoffPostalCode} onChange={handleInputChange} placeholder="Postal Code" className="border p-2 rounded" />
                            <input type="text" name="dropoffCountry" value={formData.dropoffCountry} onChange={handleInputChange} placeholder="Country" className="border p-2 rounded" />
                        </div>

                        {/* Package Details */}
                        <h3 className="font-bold mb-2">Package Details</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight (kg)" className="border p-2 rounded" />
                            <input type="number" name="length" value={formData.length} onChange={handleInputChange} placeholder="Length (cm)" className="border p-2 rounded" />
                            <input type="number" name="width" value={formData.width} onChange={handleInputChange} placeholder="Width (cm)" className="border p-2 rounded" />
                            <input type="number" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height (cm)" className="border p-2 rounded" />
                        </div>
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Package Description" className="border p-2 rounded w-full mb-4" />

                        <button className="flex justify-center bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300">Create Order</button>
                    </form>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
                        {orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="p-4 bg-gray-100 rounded-lg">
                                        <h3 className="font-bold text-lg mb-2">Tracking: {order.trackingNumber}</h3>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        <p><strong>Pickup:</strong> {order.pickupAddress.street}, {order.pickupAddress.city}, {order.pickupAddress.state}, {order.pickupAddress.country}</p>
                                        <p><strong>Dropoff:</strong> {order.dropoffAddress.street}, {order.dropoffAddress.city}, {order.dropoffAddress.state}, {order.dropoffAddress.country}</p>
                                        <p><strong>Package:</strong> {order.packageDetails.description} ({order.packageDetails.weight}kg)</p>
                                        <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Booking;

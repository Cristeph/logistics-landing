import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCourierModal from 'components/admin/CreateCourierModal';
import AssignOrdersModal from 'components/admin/AssignOrdersModal';
import UpdateLocationModal from 'components/admin/UpdateLocationModal';
import UpdateOrderStatusModal from 'components/admin/UpdateOrderStatusModal';
import UpdateOrderHistoryModal from 'components/admin/UpdateOrderHistoryModal';

const CourierManagement = () => {
    const [couriers, setCouriers] = useState([]);
    const [selectedCourier, setSelectedCourier] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Separate state for create modal
    const [modalType, setModalType] = useState(''); // State to track the type of modal
    const token = localStorage.getItem('token');

    // Fetch Couriers
    const fetchCouriers = async () => {
        try {
            const res = await axios.get('/api/couriers', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCouriers(res.data);
        } catch (err) {
            console.error('Failed to fetch couriers', err);
        }
    };

    useEffect(() => {
        fetchCouriers();
        // eslint-disable-next-line
    }, [isCreateModalOpen]);

    const openModal = (courier, type) => {
        setSelectedCourier(courier);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedCourier(null);
        setModalType('');
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Courier Management</h2>
            <button
                onClick={() => setIsCreateModalOpen(true)} // Open the create modal
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                Create Courier
            </button>
            <table className="min-w-full bg-white rounded-md shadow-md overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Name</th>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Phone Number</th>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Email</th>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Vehicle</th>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Location</th>
                        <th className="py-3 px-4 border-b-2 border-gray-300 text-left text-sm text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {couriers.map((courier) => (
                        <tr key={courier._id} className="text-center">
                            <td className="py-3 px-4 border-b border-gray-300">{courier.name}</td>
                            <td className="py-3 px-4 border-b border-gray-300">{courier.phoneNumber}</td>
                            <td className="py-3 px-4 border-b border-gray-300">{courier.email}</td>
                            <td className="py-3 px-4 border-b border-gray-300">{courier.vehicle.type}</td>
                            {/* <td className="py-3 px-4 border-b border-gray-300">{`Lat: ${courier.location.latitude}, Lng: ${courier.location.longitude}`}</td> */}
                            <td className="py-3 px-4 border-b border-gray-300">
                                <button
                                    onClick={() => openModal(courier, 'assign')}
                                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Assign Orders
                                </button>
                                {/* <button
                                    onClick={() => openModal(courier, 'location')}
                                    className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    Update Location
                                </button> */}
                                <button
                                    onClick={() => openModal(courier, 'status')}
                                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Update Status
                                </button>
                                <button
                                    onClick={() => openModal(courier, 'history')}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Update History
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal for creating courier */}
            {isCreateModalOpen && (
                <CreateCourierModal onClose={() => setIsCreateModalOpen(false)} /> // Close the modal when done
            )}
            {modalType === 'assign' && selectedCourier && (
                <AssignOrdersModal courier={selectedCourier} onClose={closeModal} />
            )}
            {modalType === 'location' && selectedCourier && (
                <UpdateLocationModal courier={selectedCourier} onClose={closeModal} />
            )}
            {modalType === 'status' && selectedCourier && (
                <UpdateOrderStatusModal courier={selectedCourier} onClose={closeModal} />
            )}
            {modalType === 'history' && selectedCourier && (
                <UpdateOrderHistoryModal courier={selectedCourier} onClose={closeModal} />
            )}
        </div>
    );
};

export default CourierManagement;

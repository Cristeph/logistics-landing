import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const UpdateOrderHistoryModal = ({ courier, onClose }) => {
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [event, setEvent] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const token = localStorage.getItem('token');

    // Function to fetch location suggestions
    const fetchLocationSuggestions = async (query) => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=5`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
        }
    };

    // Handle location select from suggestions
    const handleLocationSelect = (suggestion) => {
        setLocation(suggestion.display_name);
        setLatitude(suggestion.lat);
        setLongitude(suggestion.lon);
        setSuggestions([]); // Clear suggestions after selection
    };

    // Function to update order history with input validation
    const updateHistory = async () => {
        if (!location || !latitude || !longitude || !event) {
            MySwal.fire({
                title: 'Error',
                text: 'All fields must be filled out.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        const historyUpdate = { location, latitude, longitude, event };
        try {
            await axios.put(`/api/couriers/${courier._id}/orders/history`, historyUpdate, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            MySwal.fire({
                title: 'Success!',
                text: 'History info updated successfully',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();
        } catch (err) {
            console.error('Failed to update history', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-center">Update Order History for {courier.name}</h2>
                <div className="space-y-4">
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                                fetchLocationSuggestions(e.target.value);
                            }}
                            placeholder="Search for location"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list bg-white border border-gray-300 rounded-md mt-2 max-h-40 overflow-auto">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.place_id}
                                        onClick={() => handleLocationSelect(suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                    >
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700">Event</label>
                        <input
                            value={event}
                            onChange={(e) => setEvent(e.target.value)}
                            placeholder="Event"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        onClick={updateHistory}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
                    >
                        Update
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

export default UpdateOrderHistoryModal;

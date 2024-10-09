import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaTrashAlt } from 'react-icons/fa';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem('token');
    // Fetch Users
    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users/admin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            console.error('Failed to fetch users', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    },);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">User Management</h2>
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="text-black">
                    <tr>
                        <th className="py-3 px-4">User ID</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Created At</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="text-center border-b">
                            <td className="py-3 px-4">{user._id}</td>
                            <td className="py-3 px-4">{user.name}</td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">{user.role}</td>
                            <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4 flex justify-center space-x-4">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaEye />
                                </button>
                                <button className="text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;

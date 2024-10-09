import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AccountManagement = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token]);

  const toggleEditingPersonal = () => setIsEditingPersonal(!isEditingPersonal);
  const toggleEditingPassword = () => setIsEditingPassword(!isEditingPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSavePersonal = async () => {
    try {
      await axios.put('/api/users/profile', {
        name: userData.name,
        phone: userData.phone,
        address: userData.address
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditingPersonal(false);
      MySwal.fire({
        title: 'Success!',
        text: 'Data updated successfully!',
        icon: 'success',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error updating user data:', error);
      const errorMessage = error.response?.data?.errors?.join(', ') || 'An unexpected error occurred';
      MySwal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleSavePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      await axios.put('/api/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditingPassword(false);
      MySwal.fire({
        title: 'Success!',
        text: 'Password updated successfully!',
        icon: 'success',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error updating password:', error);
      const errorMessage = error.response?.data?.errors?.join(', ') || 'An unexpected error occurred';
      MySwal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-4">
      <div className="w-full space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Account Management</h2>

        {/* Personal Details Card */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
            <button
              onClick={toggleEditingPersonal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEditingPersonal ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditingPersonal ? (
            <form>
              <div className="grid grid-cols-1 gap-4 mt-6">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 mt-6">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Address:</strong> {userData.address}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Phone Number:</strong> {userData.phone}</p>
            </div>
          )}

          {isEditingPersonal && (
            <div className="text-right">
              <button
                onClick={handleSavePersonal}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mt-4"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Password Reset Card */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Password Reset</h2>
            <button
              onClick={toggleEditingPassword}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEditingPassword ? 'Cancel' : 'Edit Password'}
            </button>
          </div>

          {isEditingPassword ? (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-gray-700">Old Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your old password"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                  placeholder="Enter a new password"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                  placeholder="Confirm your new password"
                />
              </div>
            </div>
          ) : (
            <p className="mt-6">********</p>
          )}

          {isEditingPassword && (
            <div className="text-right">
              <button
                onClick={handleSavePassword}
                className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mt-4"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;

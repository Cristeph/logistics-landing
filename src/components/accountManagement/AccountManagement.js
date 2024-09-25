import React, { useState } from 'react';

const AccountManagement = () => {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const toggleEditingPersonal = () => setIsEditingPersonal(!isEditingPersonal);
  const toggleEditingPassword = () => setIsEditingPassword(!isEditingPassword);

  return (
    <div className="p-4">
      <div className="w-full space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Account Management </h2>
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
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4 mt-6">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Address:</strong> 123 Main St</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Phone Number:</strong> (123) 456-7890</p>
            </div>
          )}

          {isEditingPersonal && (
            <div className="text-right">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mt-4">
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
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your old password"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
                  placeholder="Enter a new password"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
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
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mt-4">
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

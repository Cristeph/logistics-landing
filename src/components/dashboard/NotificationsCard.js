import React from "react";

const NotificationsCard = () => {
  return (
    <div className="my-5 px-5 py-2 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center">
            <p className="font-bold text-xl mr-2">Notifications</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-full bg-gray-200 h-1">
          <div className="bg-blue-500 h-1 w-full"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <div className="bg-blue-500 w-3 h-3 rounded-full"></div>
          </div>
          <div className="flex-grow">
            <p className="font-semibold">Warsaw, Poland</p>
            <p className="text-sm text-gray-500">Branch 39</p>
          </div>
          <div className="text-right text-sm text-gray-500">
            <p>06.12.2023</p>
            <p>09:18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsCard;
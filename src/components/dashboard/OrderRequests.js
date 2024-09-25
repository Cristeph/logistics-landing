import React from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaUser,
  FaSyncAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderRequests = () => {
  return (
    <div className="">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Recent Order Requests</h1>
          <div className="flex space-x-3">
            <FaBox className="text-gray-500 cursor-pointer" />
            <FaSyncAlt className="text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-full bg-gray-200 h-1">
            <div className="bg-blue-500 h-1 w-full"></div>
          </div>
        </div>
        <div className="overflow-y-auto max-h-96">
          <OrderCard
            orderId="#4523 - 5248"
            date="Sep 04, 2024"
            dropLocation="456, ak Industries, Manchester, UK"
            pickupLocation="235, main flat, near ek park, Manchester, UK"
            customer="Adam mark"
          />
          <OrderCard
            orderId="#4523 - 4652"
            date="Sep 01, 2024"
            pickupLocation="235, main flat, Manchester, UK"
            dropLocation="35, Second APK Apartment, London, UK"
            customer="Ak Shan"
          />
          <OrderCard
            orderId="#4523 - 3566"
            date="Aug 26, 2024"
            pickupLocation="123, Some Street, London, UK"
            dropLocation="789, Another Place, Manchester, UK"
            customer="John Doe"
          />
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({
  orderId,
  date,
  dropLocation,
  pickupLocation,
  customer,
}) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <FaBox className="text-blue-500 mr-2" />
        <p className="font-semibold">{orderId}</p>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <div className="mb-2">
      {pickupLocation && (
        <div className="flex items-center mb-1">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-700">
            Pickup Location: {pickupLocation}
          </p>
        </div>
      )}
      {dropLocation && (
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-700">Drop Location: {dropLocation}</p>
        </div>
      )}
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <FaUser className="text-gray-500 mr-2" />
        <p className="text-sm text-gray-700">{customer}</p>
      </div>
      <Link to="#" className="text-blue-500 text-sm font-semibold">
        View Details
      </Link>
    </div>
  </div>
);

export default OrderRequests;

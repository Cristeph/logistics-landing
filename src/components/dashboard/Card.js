import React from "react";
import { FaCube, FaTruck, FaCheckCircle, FaRoute } from "react-icons/fa";

const Card = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Cards
          title="Total"
          value="2083"
          icon={<FaCube className="text-green-900" />}
          bgColor="bg-green-100"
        />
        <Cards
          title="In the way"
          value="234"
          icon={<FaTruck className="text-yellow-500" />}
          bgColor="bg-yellow-100"
        />
        <Cards
          title="Delivered"
          value="1849"
          icon={<FaCheckCircle className="text-green-500" />}
          bgColor="bg-green-100"
        />
        <Cards
          title="Distance"
          value="983 km"
          icon={<FaRoute className="text-red-500" />}
          bgColor="bg-red-100"
        />
      </div>
    </div>
  );
};

const Cards = ({ title, value, icon, bgColor }) => (
  <div className="flex items-center p-6  bg-white rounded-lg shadow-md">
    <div
      className={`flex  items-center justify-center w-12 h-12 rounded-full mr-4 ${bgColor}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-gray-500 font-medium">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default Card;

import React from "react";
import { FaSearch } from "react-icons/fa";
const SupportCard = () => {
  return (
    <div className=" bg-white p-4 px-10  py-10 shadow-lg rounded-lg items-center">
      <div className="">
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Welcome to CRISTEPH Support
          </h2>
          <div className="flex gap-5 max-w-2xl mx-auto">
            <div className="flex items-center  border border-gray-300 rounded-lg overflow-hidden w-full">
              <FaSearch className="text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="How can we help you?"
                className="flex-grow p-3 outline-none"
              />
            </div>
            <button className="bg-teal-700 text-white px-4 py-2 rounded-full text-nowrap">
              Try Your Luck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;

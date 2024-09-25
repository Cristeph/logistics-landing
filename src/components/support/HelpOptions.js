import React from "react";
import {
  FaPuzzlePiece,
  FaUserCog,
  FaDollarSign,
  FaBell,
  FaShieldAlt,
  FaQuestionCircle,
  FaBookOpen,
  FaTrailer,
} from "react-icons/fa";

const HelpSection = () => {
  const cards = [
    {
      icon: <FaPuzzlePiece className="text-purple-500" />,
      title: "Getting Started",
      description: "Start off on the right foot! Not the left one!",
      textColor: "text-purple-500",
    },
    {
      icon: <FaUserCog className="text-teal-500" />,
      title: "Account Settings",
      description: "You're a special snowflake and so is your account",
      textColor: "text-teal-500",
    },
    {
      icon: <FaDollarSign className="text-green-500" />,
      title: "Payment & Billing",
      description: "That feel when you look at your bank account",
      textColor: "text-green-500",
    },
    {
      icon: <FaBookOpen className="text-teal-400" />,
      title: "Booking",
      description: "Bringing people together from all over the world",
      textColor: "text-teal-400",
    },
    {
      icon: <FaTrailer className="text-red-400" />,
      title: "Order Tracking",
      description: "Almost as exciting as interior decorating",
      textColor: "text-red-400",
    },
    {
      icon: <FaBell className="text-pink-500" />,
      title: "Notifications",
      description: "What does this button do .#???",
      textColor: "text-pink-500",
    },
    {
      icon: <FaShieldAlt className="text-red-500" />,
      title: "Trust & Safety",
      description: "Keep things safe & sound for you and your buddies",
      textColor: "text-red-500",
    },
    {
      icon: <FaQuestionCircle className="text-indigo-500" />,
      title: "F.A.Q",
      description: "All you can eat self-serve problem solving",
      textColor: "text-indigo-500",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-4">
        Need help? We've got your back
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Perhaps you can find the answers in our collections
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="mb-4 flex justify-center text-2xl">{card.icon}</div>
            <h3 className="text-lg font-semibold text-teal-600">
              {card.title}
            </h3>
            <hr className="my-2" />
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSection;

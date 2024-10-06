import React, { useState } from "react";

const NotificationSender = () => {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info"); 
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 

    const body = {
      userId,
      message,
      type,
    };

    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to send notification");
      }

      setStatus("Notification sent successfully!");
      // Clear the form
      setUserId("");
      setMessage("");
      setType("info");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">Send Notification</h2>
        
        {status && <p className="mb-4 text-green-500">{status}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 w-full transition duration-200"
          >
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotificationSender;
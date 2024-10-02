// AddInvoice.jsx
import React, { useState } from "react";

const AddInvoice = ({ orderId }) => {
    const [invoice, setInvoice] = useState("");

    const handleAddInvoice = () => {
        // Handle invoice addition logic
        console.log(`Invoice added for Order ID: ${orderId} - ${invoice}`);
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="text-lg font-semibold mb-2">Add Invoice</h2>
            <textarea
                className="border p-2 rounded w-full mb-2"
                placeholder="Enter invoice details"
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
            />
            <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAddInvoice}
            >
                Add Invoice
            </button>
        </div>
    );
};

export default AddInvoice;
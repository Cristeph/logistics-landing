import React from "react";

const InvoiceCard = ({ invoice }) => {
  const handleDownloadInvoice = () => {
    // Logic to download or email the invoice
    alert(`Invoice for Order ${invoice.orderId} has been downloaded.`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2 my-2">
      <h2 className="text-lg font-semibold">Invoice Details</h2>
      <p><strong>Order ID:</strong> {invoice.orderId}</p>
      <p><strong>Total Amount:</strong> ${invoice.totalAmount}</p>
      <p><strong>Invoice Date:</strong> {invoice.date}</p>
      <button
        onClick={handleDownloadInvoice}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Download Invoice
      </button>
    </div>
  );
};

export default InvoiceCard;

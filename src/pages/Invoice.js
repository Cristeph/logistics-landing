import React, { useState } from 'react';

const items = [
  { name: "Item A", price: 10000 },
  { name: "Item B", price: 25000 },
  { name: "Item C", price: 7500 },
  { name: "Item D", price: 30000 },
];

const Invoice = () => {
  const [selectedItems, setSelectedItems] = useState([{ name: items[0].name, price: items[0].price }]);
  const [total, setTotal] = useState(items[0].price);

  const handleItemChange = (index, e) => {
    const newItems = [...selectedItems];
    const selectedItem = items.find(item => item.name === e.target.value);
    
    if (selectedItem) {
      newItems[index] = { name: selectedItem.name, price: selectedItem.price };
      setSelectedItems(newItems);
      calculateTotal(newItems);
    }
  };

  const addItem = () => {
    setSelectedItems([...selectedItems, { name: items[0].name, price: items[0].price }]);
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
    setTotal(totalAmount);
  };

  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: 'YOUR_PUBLIC_KEY', // Replace with your Paystack public key
      email: 'customer@example.com', // Replace with the customer's email
      amount: total * 100, // Amount is in kobo (₦1 = 100kobo)
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: "Invoice",
            variable_name: "invoice_id",
            value: "INV-1234"
          },
        ],
      },
      callback: function (response) {
        // Handle successful payment here
        console.log('Payment successful:', response);
        alert('Payment successful! Reference: ' + response.reference);
      },
      onClose: function () {
        alert('Payment window closed.');
      },
    });
    handler.openIframe();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePayment(); // Process payment
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Client Name</label>
            <p className='mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2'>John Doe</p>
          </div>
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          {selectedItems.map((item, index) => (
            <div key={index} className="flex space-x-4 mb-4">
              <select
                value={item.name}
                onChange={(e) => handleItemChange(index, e)}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200 py-2"
              >
                {items.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} - ₦{item.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="mb-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Add Item
          </button>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Submit Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Invoice;
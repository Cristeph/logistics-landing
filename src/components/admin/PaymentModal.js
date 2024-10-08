import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const PaymentModal = ({ isOpen, onClose, orderId }) => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [transactionId] = useState('0000000000');
    const token = localStorage.getItem('token');

    const handlePaymentSubmit = async () => {
        try {
            const paymentData = {
                orderId: orderId,
                amount: parseFloat(amount),
                method: paymentMethod,
                transactionId: transactionId
            };
            await axios.post('/api/payments', paymentData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            MySwal.fire({
                title: 'Success!',
                text: 'Payment created successfully!',
                icon: 'success',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            onClose();  // Close the modal
        } catch (error) {
            console.error("Error while creating payment:", error);
            alert('Failed to set payment. Try again.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
                <h2 className="text-xl font-bold mb-4">Set Payment Information</h2>

                <label className="block mb-2">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-md"
                    placeholder="Enter amount"
                />

                <label className="block mb-2">Payment Method:</label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-md"
                >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                </select>

                <button
                    className="bg-[#9d1111] text-white px-4 py-2 rounded-md w-full"
                    onClick={handlePaymentSubmit}
                >
                    Submit Payment
                </button>

                <button
                    className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-md w-full"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;

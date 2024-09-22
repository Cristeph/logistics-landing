import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const mockTrackingData = {
    '12345': {
        status: 'In Transit',
        location: 'New York, NY',
        estimatedDelivery: '2024-09-25',
        currentStep: 2, // Step in the progress bar (1: Shipped, 2: In Transit, 3: Out for Delivery, 4: Delivered)
        history: [
            { date: '2024-09-21', event: 'Package received at origin facility' },
            { date: '2024-09-22', event: 'Package departed from facility' },
            { date: '2024-09-23', event: 'Package arrived at sorting center' },
        ],
    },
    '67890': {
        status: 'Delivered',
        location: 'Los Angeles, CA',
        estimatedDelivery: '2024-09-20',
        currentStep: 4,
        history: [
            { date: '2024-09-18', event: 'Package received at origin facility' },
            { date: '2024-09-19', event: 'Package out for delivery' },
            { date: '2024-09-20', event: 'Package delivered' },
        ],
    },
};

const progressSteps = ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];

function TrackingPage() {
    const { trackingID } = useParams();
    const trackingInfo = mockTrackingData[trackingID];

    if (!trackingInfo) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <h1 className="text-2xl font-bold text-red-600">Tracking ID Not Found</h1>
                <p className="text-lg text-gray-700">Please check the tracking number and try again.</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-6xl mx-auto py-10 px-6">
                    {/* Shipment Status */}
                    <h1 className="text-4xl font-bold text-[#0c0e37] mb-4">Shipment Status: {trackingInfo.status}</h1>
                    <p className="text-lg text-gray-700">Tracking ID: <span className="font-bold">{trackingID}</span></p>
                    <p className="text-lg text-gray-700">Current Location: <span className="font-bold">{trackingInfo.location}</span></p>
                    <p className="text-lg text-gray-700">Estimated Delivery: <span className="font-bold">{trackingInfo.estimatedDelivery}</span></p>

                    {/* Progress Bar */}
                    <div className="mt-6 mb-10">
                        <div className="flex justify-between items-center">
                            {progressSteps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${trackingInfo.currentStep >= index + 1 ? 'bg-[#9d1111]' : 'bg-gray-300'
                                            }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <p className="mt-2 text-gray-600">{step}</p>
                                </div>
                            ))}
                        </div>
                        {/* Connecting Lines */}
                        <div className="flex justify-between items-center mt-2">
                            {progressSteps.slice(1).map((_, index) => (
                                <div
                                    key={index}
                                    className={`flex-1 h-1 ${trackingInfo.currentStep > index + 1 ? 'bg-[#9d1111]' : 'bg-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tracking History Timeline */}
                    <h2 className="text-2xl font-bold text-[#0c0e37] mb-4">Tracking History</h2>
                    <ul className="bg-white shadow-md rounded-md p-6">
                        {trackingInfo.history.map((event, index) => (
                            <li key={index} className="flex items-start mb-4">
                                <div className="w-4 h-4 mt-1 bg-[#9d1111] rounded-full"></div>
                                <div className="ml-4">
                                    <p className="font-bold">{event.date}</p>
                                    <p className="text-gray-600">{event.event}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* FAQ Section */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold text-[#0c0e37] mb-4">Frequently Asked Questions</h2>
                        <div className="bg-white shadow-md rounded-md p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-800">How long does it take to receive my package?</h3>
                                <p className="text-gray-600">Packages are usually delivered within 3-5 business days depending on your location.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-800">What should I do if my package is delayed?</h3>
                                <p className="text-gray-600">If your package is delayed, please contact our support team and provide your tracking ID.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Can I change the delivery address?</h3>
                                <p className="text-gray-600">Yes, you can modify your delivery address by contacting us before the package is out for delivery.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TrackingPage;

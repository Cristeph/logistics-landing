import React from 'react';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import liveChat from "assets/images/live-chat.svg";
import phoneCall from "assets/images/phone-call.svg";
import emailUs from "assets/images/email-us.svg";
import socialMedia from "assets/images/social-media.svg";


const ContactUs = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-[#0c0e37] mb-8 text-center">Get in Touch with Us</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Live Chat Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300">
                            <img
                                src={liveChat}
                                alt="Live Chat"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">Live Chat</h2>
                            <p className="text-gray-600 mb-4">Talk to us instantly via our live chat system for immediate support.</p>
                            <button className="bg-[#9d1111] text-white py-2 px-6 rounded hover:bg-red-700">
                                Start Chat
                            </button>
                        </div>

                        {/* Phone Support Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300">
                            <img
                                src={phoneCall}
                                alt="Phone Support"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">Phone Support</h2>
                            <p className="text-gray-600 mb-4">Need to speak with a representative? Call us directly for assistance.</p>
                            <p className="text-lg font-bold">1-800-123-4567</p>
                            <p className="text-gray-600">Mon-Fri: 9 AM - 6 PM</p>
                        </div>

                        {/* Email Support Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300">
                            <img
                                src={emailUs}
                                alt="Email Support"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">Email Us</h2>
                            <p className="text-gray-600 mb-4">Send us an email and we’ll get back to you within 24 hours.</p>
                            <p className="text-lg font-bold">support@example.com</p>
                        </div>

                        {/* Social Media Section */}
                        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition duration-300">
                            <img
                                src={socialMedia}
                                alt="Social Media"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2">Social Media</h2>
                            <p className="text-gray-600 mb-4">Reach out to us on social media for updates and support.</p>
                            <div className="flex justify-center space-x-4">
                                <a href="/#" className="text-gray-500 hover:text-[#9d1111]">
                                    <i className="fab fa-facebook fa-2x"></i>
                                </a>
                                <a href="/#" className="text-gray-500 hover:text-[#9d1111]">
                                    <i className="fab fa-twitter fa-2x"></i>
                                </a>
                                <a href="/#" className="text-gray-500 hover:text-[#9d1111]">
                                    <i className="fab fa-instagram fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;

import React, { useState } from 'react';
import Navbar from "components/Navbar";
import Footer from "components/Footer";

function AuthPage() {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <>
            <Navbar />
            <div
                className="min-h-[700px] bg-gray-100 flex justify-center items-center"
                style={{
                    backgroundImage:
                        "url('https://themeperch.net/html/logistip/assets/images/banner-1.jpg')",
                }}

            >
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    {/* Tabs for switching between Login and Signup */}
                    <div className="flex justify-between mb-6">
                        <button
                            onClick={() => setActiveTab('login')}
                            className={`text-lg font-bold px-4 py-2 ${activeTab === 'login' ? 'text-[#9d1111] border-b-4 border-[#9d1111]' : 'text-gray-500'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab('signup')}
                            className={`text-lg font-bold px-4 py-2 ${activeTab === 'signup' ? 'text-[#9d1111] border-b-4 border-[#9d1111]' : 'text-gray-500'}`}
                        >
                            Signup
                        </button>
                    </div>

                    {/* Conditional Form Display */}
                    {activeTab === 'login' ? (
                        <LoginForm />
                    ) : (
                        <SignupForm />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

function LoginForm() {
    return (
        <form>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <div className="flex justify-between items-center mb-6">
                <a href="/#" className="text-sm text-[#9d1111] hover:underline">Forgot Password?</a>
            </div>
            <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
                Login
            </button>
        </form>
    );
}

function SignupForm() {
    return (
        <form>
            <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input type="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9d1111]" />
            </div>
            <button className="w-full bg-[#9d1111] text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
                Signup
            </button>
        </form>
    );
}

export default AuthPage;

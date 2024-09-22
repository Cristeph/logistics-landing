import React from "react";

function HeroSection() {
    return (
        <section
            className="bg-cover bg-center py-24 text-white"
            style={{
                backgroundImage:
                    "url('https://themeperch.net/html/logistip/assets/images/hero-2-bg.jpg')",
            }}
        >
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Fast & Reliable Logistics Services
                </h1>
                <p className="text-lg mb-6">
                    Delivering your packages safely and on time, anywhere in the world.
                </p>

                {/* Track Shipment Form */}
                <form className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto text-left">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Track Your Shipment:
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Enter Tracking Number"
                            className="w-full px-4 py-2 border rounded-l-md focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#9d1111] text-white px-4 py-2 rounded-r-md hover:bg-red-700"
                        >
                            Track
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    <a
                        href="/#"
                        className="bg-white text-[#0c0e37] px-6 py-3 rounded-full font-bold mr-2 hover:bg-gray-100"
                    >
                        Get Started
                    </a>
                    <a
                        href="/#"
                        className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-bold hover:bg-[#0c0e37]"
                    >
                        Track Shipment
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;

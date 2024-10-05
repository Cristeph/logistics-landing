import React from "react";
import requestQuoteBg from "assets/images/request-quote-bg.jpg";

const RequestQuote = () => {
    return (
        <section
            id="requestquotes"
            className="py-16 bg-gray-50"
            style={{
                backgroundImage:
                    `url(${requestQuoteBg})`,
            }}
        >
            <div data-aos="fade-up" className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">
                    Request a Quote
                </h2>
                <form className=" quoteform p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 dalabel mb-2">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dalabel mb-2">
                                Email Address:
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dalabel mb-2">
                                Package Details:
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                placeholder="Package weight/size"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dalabel mb-2">
                                Destination:
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                placeholder="Shipping destination"
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <button
                            type="submit"
                            className="bg-[#9d1111] text-white px-6 py-3 rounded-md hover:bg-red-700 daBTN"
                        >
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default RequestQuote;

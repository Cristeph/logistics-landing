import React from "react";

function FeaturesSection() {
    const features = [
        {
            title: "Fast Delivery",
            description: "We prioritize speed without compromising safety.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
        {
            title: "Trusted by Clients",
            description: "Thousands of satisfied customers globally.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
        {
            title: "24/7 Support",
            description: "Always here to assist you with your needs.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
        {
            title: "Real-Time Tracking",
            description: "Track your shipment from pickup to delivery.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
    ];

    return (
        <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Why Choose Us
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6">
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;

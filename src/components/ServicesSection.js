import React from "react";

function ServicesSection() {
    const services = [
        {
            title: "Express Delivery",
            description: "Same-day delivery with speed and safety in mind.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
        {
            title: "Cargo Services",
            description: "Heavy cargo shipping services for business needs.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
        {
            title: "Worldwide Shipping",
            description: "Global delivery solutions, fast and reliable.",
            icon: "https://themeperch.net/html/logistip/assets/images/service-image-3.jpg",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Our Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-6 rounded-lg shadow-lg"
                        >
                            <img
                                src={service.icon}
                                alt={service.title}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;

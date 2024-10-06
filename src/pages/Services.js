import React from 'react'; 
const Services = () => {
    const servicesData = [
        {
            title: "International Shipping",
            description: "We offer fast, secure, and reliable international shipping to over 150 countries, ensuring your goods arrive safely and on time.",
            image: "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
        },
        {
            title: "Freight Forwarding",
            description: "Our freight forwarding services include air, sea, and land options, with customized solutions for oversized and specialized cargo.",
            image: "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
        }, 
        {
            title: "Customs Clearance",
            description: "We provide seamless customs clearance, handling all necessary documentation and ensuring compliance with international regulations.",
            image: "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
        },
        {
            title: "Warehousing & Distribution",
            description: "Our state-of-the-art warehouses ensure your goods are stored safely, with efficient distribution services to meet your supply chain needs.",
            image: "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
        },
        {
            title: "E-commerce Logistics",
            description: "Tailored e-commerce logistics services to support your online business with end-to-end solutions for storage, packing, and delivery.",
            image: "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
        },
    ];

    return (
        <> 
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-[#0c0e37] mb-8 text-center">Our Services</h1>
                    <p className="text-lg text-gray-700 text-center mb-10">Discover a range of services designed to meet all your logistics needs, whether you're shipping locally or globally.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map((service, index) => (
                            <div     key={index} 
                            data-aos="fade-up" 
                            data-aos-delay={`${index * 300}`} // Add delay to each feature
                          className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <button className="bg-[#9d1111] text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">Learn More</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div> 
        </>
    );
};

export default Services;

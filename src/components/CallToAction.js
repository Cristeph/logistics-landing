import React from "react";

function CallToAction() {
    return (
        <section
            className="py-16 bg-cover bg-center text-white text-center"
            style={{
                backgroundImage:
                    "url('https://themeperch.net/html/logistip/assets/images/hero-1-bg.jpg')",
            }}
        >
            <h2 className="text-4xl font-bold mb-4">Ready to Ship with Us?</h2>
            <p className="text-lg mb-6">
                Get a free quote today and experience the best logistics services.
            </p>
            <a
                href="/#"
                className="bg-white text-[#0c0e37] px-8 py-4 rounded-full font-bold hover:bg-gray-100"
            >
                Get a Quote
            </a>
        </section>
    );
}

export default CallToAction;

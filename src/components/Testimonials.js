import React from "react";

const Testimonials = () => {
    const testimonials = [
        {
            quote:
                "The best courier service I've ever used. Fast, reliable, and great customer service!",
            name: "John Doe",
        },
        {
            quote:
                "Our go-to shipping partner for all our logistics needs. Highly recommended!",
            name: "Sarah Lee",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12 text-gray-800">
                    What Our Clients Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 p-6 rounded-lg shadow-lg"
                        >
                            <p className="text-gray-600 mb-4">&quot;{testimonial.quote}&quot;</p>
                            <p className="font-bold">— {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;

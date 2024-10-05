import React, { useState } from 'react';
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const faqData = [
    {
        question: "What areas or countries do you cover?",
        answer: "We provide shipping services to over 50 countries, covering regions in North America, Europe, Asia, and Africa. Our network ensures that we can ship to even the most remote locations."
    },
    {
        question: "What types of goods do you handle?",
        answer: "We handle a variety of goods including general cargo, hazardous materials, perishable items, and oversized cargo. Our team is equipped to manage specialized shipments with care and precision."
    },
    {
        question: "What are your shipping options and transit times?",
        answer: "We offer multiple shipping methods including air, sea, road, and rail. Delivery times vary depending on the method: air shipping takes 2-5 days, sea shipping takes 15-30 days, and road/rail options vary by region."
    },
    {
        question: "How do you calculate shipping costs?",
        answer: "Shipping costs are determined by the weight, volume, distance, and type of goods being shipped. Additional services such as insurance or special handling may also affect the final price."
    },
    {
        question: "What documents are required for international shipping?",
        answer: "Documents typically include the invoice, bill of lading, certificate of origin, and customs forms specific to the destination country. We guide our customers through the paperwork process to ensure compliance."
    },
    {
        question: "Do you offer door-to-door delivery?",
        answer: "Yes, we offer comprehensive door-to-door delivery services, including customs clearance and last-mile delivery to the final destination. Our goal is to make the shipping process as seamless as possible for you."
    },
    {
        question: "What is your policy on tracking shipments?",
        answer: "Customers can track their shipments in real-time using our tracking system, which provides updates on the package’s status at every stage of the journey, from pickup to delivery."
    },
    {
        question: "What measures do you take to ensure the safety of goods?",
        answer: "We follow strict safety protocols including secure packaging, insurance options, and tracking systems to ensure your goods are protected during transit. Our warehouses are monitored 24/7 to prevent theft or damage."
    },
    {
        question: "How do you handle customs clearance?",
        answer: "Our experienced customs brokers handle all documentation and communication with customs authorities to ensure quick and smooth clearance, reducing the risk of delays."
    },
    {
        question: "What happens in the event of a delay or loss?",
        answer: "In case of delays, we keep customers informed at every step. For lost or damaged shipments, we assist in filing claims and offer compensation depending on the insurance coverage selected at the time of shipping."
    }
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open/close
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-[#0c0e37] text-center mb-8">Frequently Asked Questions</h1>
                    <div className="bg-white shadow-md rounded-md p-6">
                        {faqData.map((item, index) => (
                            <div key={index} className="mb-4">
                                <div
                                    className="cursor-pointer flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 rounded-md"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <h3 className="text-lg font-bold text-gray-800">{item.question}</h3>
                                    <span>{openIndex === index ? '-' : '+'}</span>
                                </div>
                                {openIndex === index && (
                                    <div className="p-4 text-gray-600 bg-gray-100 border-t border-gray-200">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default FAQPage;

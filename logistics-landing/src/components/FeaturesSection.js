import React from "react";
import { IoCopy } from "react-icons/io5";

const FeaturesSection = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "We prioritize speed without compromising safety.",
    },
    {
      title: "Trusted by Clients",
      description: "Thousands of satisfied customers globally.",
    },
    {
      title: "24/7 Support",
      description: "Always here to assist you with your needs.",
    },
    {
      title: "Real-Time Tracking",
      description: "Track your shipment from pickup to delivery.",
    },
  ];

  return (
    <section className="whyChoose ">
      <div className="container mx-auto px-4">
        <div className="packageHead">
          <h2 data-aos="fade-up" className="text-3xl font-bold mb-12  header2">
            Your Packages Are in Safe Hands.
          </h2>

          <p data-aos="fade-up">
            Trust is at the core of what we do. We are committed to the safe and
            timely delivery of your parcels, ensuring every shipment arrives
            intact and on time.
          </p>
        </div>
        <div className=" eachChoose">
          {features.map((feature, index) => (
            <>
              <div    data-aos="fade-up"
                  data-aos-delay={`${index * 300}`} // Add delay to each feature
                   className="flex eachInnerChoose">
                <IoCopy className="chack" />

                <div
                  key={index}
               
                  className=""
                >
                  <h3 className="text-xl header3 mb-2">{feature.title}</h3>
                  <p className=" white">{feature.description}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

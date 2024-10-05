import React from "react";
import expressDelivery from "assets/images/location.svg";
import cargoServies from "assets/images/ship.svg";
import worldwideShipping from "assets/images/track.svg";
import { LuChevronRightCircle } from "react-icons/lu";

const ServicesSection = () => {
  const services = [
    {
      title: "Express Delivery",
      description:
        "Fast and reliable shipping for urgent packages, with same-day or guaranteed delivery across local, national, and international locations.",
      icon: expressDelivery,
    },
    {
      title: "Cargo Services",
      description:
        "Comprehensive international freight shipping by air, sea, or land, ensuring secure and timely delivery of large shipments worldwide.",
      icon: cargoServies,
    },
    {
      title: "Track And Trace",
      description:
        "Monitor your shipments in real-time from pickup to delivery, with instant updates via SMS or email notifications.",
      icon: worldwideShipping,
    },

    {
      title: "Express Delivery",
      description:
        "Fast and reliable shipping for urgent packages, with same-day or guaranteed delivery across local, national, and international locations.",
      icon: expressDelivery,
    },
    {
      title: "Cargo Services",
      description:
        "Comprehensive international freight shipping by air, sea, or land, ensuring secure and timely delivery of large shipments worldwide.",
      icon: cargoServies,
    },
    {
      title: "Track And Trace",
      description:
        "Monitor your shipments in real-time from pickup to delivery, with instant updates via SMS or email notifications.",
      icon: worldwideShipping,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="headerSection">
          <h1      data-aos="fade-up"
 
                   className=" Header">Explore our range of delivery solutions</h1>

          <p      data-aos="fade-up">
            Whether you need express shipping for urgent packages or reliable
            global freight services, we've got you covered. Our comprehensive
            courier solutions are designed to meet every need
          </p>
        </div>

        <div className=" servContainer ">
          {services.map((service, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`} // Delay each service by 300ms
              key={index}
              className="  serviceCont"
            >
              <div className="servinner  p-6 rounded-lg">
                <div
                  style={{
                    backgroundImage: `url(${service.icon})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "80px",
                    width: "80px",
                  }}
                  className=" "
                ></div>

                <h3 className="header3">{service.title}</h3>
                <p className=" ">{service.description}</p>

                <div>
                  <div
                    className="servLink"
                    style={{
                      marginTop: "36px",
                      alignItems: "top",
                      display: "flex",
                    }}
                  >
                    <div>
                      <LuChevronRightCircle
                        style={{ color: "#cecece", marginRight: "6px" }}
                      />
                    </div>
                    <div>
                      {" "}
                      <a> Get quote</a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "I love that Cristeph provides real-time tracking updates for every shipment. It's great to have the peace of mind knowing exactly where my packages are at all times. The notifications are timely, and the customer service team is very responsive if I ever have questions.",
      name: "Laura M",
      title: "Small Business Owner",
      image:
        "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
    },
    {
      quote:
        "We use Cristeph for both express and bulk cargo shipments, and their speed and attention to detail have been outstanding. Whether it's same-day delivery or complex cargo logistics, they always deliver on time with secure handling of our goods.",
      name: "Brian T.",
      title: "Supply Chain Manager",
      image:
        "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
    },
    {
      quote:
        "Cristeph helped us expand our business by providing efficient ocean and air freight solutions. They made international shipping seamless, and their team handled all the paperwork and customs details for us. We trust them with all our major shipments.",
      title: "Global Logistics Coordinator",
      name: "Martha R",
      image:
        "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 ">
        <div style={{ maxWidth: "570px" }}>
          <h2 className="header2 "      data-aos="fade-up"
                  >Trusted by Thousands of Happy Clients</h2>

          <p      data-aos="fade-up"
 >
            Our customers rely on us to deliver their packages quickly and
            safely. Hear what they have to say about their experience with our
            courier service.
          </p>
        </div>

        <div className=" testimonialOwnFlex ">
          {testimonials.map((testimonial, index) => (
            <div key={index} className=" testimonialOwn "      data-aos="fade-up"
            data-aos-delay={`${index * 300}`} >
              <p className="text-gray-600 mb-4">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="testUser">
                <div
                  className="testProfImg"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "40px",
                    backgroundSize: "cover",
                    backgroundImage: `url(${testimonial.image})`,
                  }}
                ></div>
                <div>
                  <p className="font-bold"> {testimonial.name}</p>
                  <p> {testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

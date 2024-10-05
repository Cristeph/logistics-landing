import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "As YC's first Nigerian startup Paystack leads the charge of great companies coming out of Africa, powering modern payments for an entire continent.",
      name: "John Doe",
      title: "CEO, Stripe",
      image:
        "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
    },
    {
      quote:
        "Our investment in Paystack aligns with the kind of investments we look for - those that will help extend our reach into the global commerce ecosystem",
      name: "Sarah Lee",
      title: "CEO, Stripe",
      image:
        "https://cristeph.netlify.app/static/media/hero-section.babe9b414c56a2b7f51d.jpg",
    },
    {
      quote:
        "Our investment in Paystack aligns with the kind of investments we look for - those that will help extend our reach into the global commerce ecosystem",
      title: "CEO, Stripe",
      name: "Sarah Lee",
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

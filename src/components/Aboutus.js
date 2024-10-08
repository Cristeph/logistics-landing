import React, { useEffect, useState, useRef } from "react";
import { IoCopy } from "react-icons/io5";

const Aboutus = ({ counters }) => {
  const elementsRef = useRef([]); // Store references to multiple elements
  const [counts, setCounts] = useState(counters.map(() => 0)); // Initialize counts for all items

  useEffect(() => {
    let observer;

    // Function to start counting
    const startCounting = (index, end, duration) => {
      let start = 0;
      const increment = end / (duration / 10); // Increment value based on duration
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = end; // Set the final value
            return newCounts;
          });
          clearInterval(timer); // Stop the timer when end value is reached
        } else {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = Math.ceil(start); // Update the count
            return newCounts;
          });
        }
      }, 10); // Update every 10ms for a smoother effect
    };

    // Intersection Observer to detect visibility of all counters
    if (elementsRef.current.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = elementsRef.current.indexOf(entry.target); // Get the index of the current element
              const { end, duration } = counters[index]; // Get the end and duration for this counter
              startCounting(index, end, duration);
              observer.unobserve(entry.target); // Stop observing once it's in view
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the component is visible
      );

      elementsRef.current.forEach((element) => {
        if (element) observer.observe(element);
      });
    }

    // Cleanup on unmount
    return () => {
      if (observer) observer.disconnect();
    };
  }, [counters]);



  return (
    <section className="aboutUsCont " id="about-us">
      <div className="container mx-auto px-4 flexGoat">
        <div className="packageHead"
        
        >
          <h2 data-aos="fade-up" className="text-3xl font-bold mb-12  header2">
            We reach globally
          </h2>

          <p data-aos="fade-up">
            Seamless global logistics, connecting key international market like
            China andf Nigeria. with trusted partnerships and expertise in
            ocean, air and road freight. we provide reliable, cost effecttive
            solutions for both large and small shipments, ensuring smooth
            delivery and customers clearance worldwide.
          </p>

          <div className=""  style={{display: 'flex', justifyContent: 'space-between'}}
            data-aos="fade-up" 
          >
 

          {/* Counters displayed separately but corresponding to each feature */}
          {counters.map((counter, index) => (
            <div>
              <div
                key={index}
                ref={(el) => (elementsRef.current[index] = el)} // Assign each element a ref
                style={{ fontSize: "2rem", textAlign: 'left' ,fontWeight: "bold", marginTop: "60px" }}
                className="text-xl header3  "
              >
                {counts[index]}
              </div>
              <div style={{maxWidth: '100px', fontSize: '13px', textAlign: 'left'}}>{counter.name}</div>
            </div>
          ))}
        </div>
        </div>


      </div>
    </section>
  );
};

const App = () => {
  const counters = [
    { end: 20, duration: 2000, name: "Years Experience" }, // Counter for the first feature
    { end: 500, duration: 3000, name: "Happy Clients" }, // Counter for the second feature
    { end: 10, duration: 1500, name: "Monthly shipments" }, // Counter for the third feature
  ];

  return <Aboutus counters={counters} />;
};

export default App;

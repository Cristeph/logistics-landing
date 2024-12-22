import React, { useState,  useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slide1 from "assets/images/ship.webp";
import slide2 from "assets/images/plane.jpg";
import slide3 from "assets/images/truck.webp";
 
import { ReactTyped } from "react-typed";

const HeroSection = () => {
  const [trackingID, setTrackingID] = useState("");
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingID) { 
      navigate(`/track/${trackingID}`);
    } else {
      alert("Please enter a tracking ID");
    }
  }; 
  const slides = [slide1, slide2, slide3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false); // To prevent abrupt transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true); // Start transition
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [slides.length]);

  // This effect ensures smooth looping
  useEffect(() => {
    if (!transitioning) return;
    const timeout = setTimeout(() => {
      setTransitioning(false); // End transition once the slide change happens
    }, 500); // Matches transition duration

    return () => clearTimeout(timeout);
  }, [transitioning]);

 
  return (
    <div className="herosection">

      <div className="container mx-auto px-4  thatTopX" >

        <div style={{maxWidth: '550px'}}>
        <h1 className="Heroheader">
          Experience Fast & Reliable{" "}
          <ReactTyped
            strings={["Delivery", "Shipping", "Courier", "Service"]}
            typeSpeed={100}
            backSpeed={50}
            loop
          />
        </h1>
        <p className="text-lg mb-6" style={{ color: "#fff", marginTop:'40px' }}>
          Delivering your packages safely and on time, anywhere in the world.
        </p>

        </div>


        {/* Track Shipment Form */}
        <form onSubmit={handleTrack}>
    
          <div className="flex" style={{gap: '10px'}}>
            <input
              type="text"
              value={trackingID}
              onChange={(e) => setTrackingID(e.target.value)}
              placeholder="Enter Tracking Number"
              className="heroInput"
            />
            <button
              type="submit"
              className="bg-[#9d1111] text-white py-2 rounded hover:bg-red-700"
            
            style={{fontSize: '12px',  minWidth: '100px'}}>
              Start Tracking
            </button>

    
          </div>
    
        </form>

 
      </div>

      <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${currentSlide * 100}vw)`,
            display: "flex",
            transition: transitioning ? "transform 0.5s ease-in-out" : "none", // Smooth transition only when transitioning
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${slide})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh",
              }}
            ></div>
          ))}
        </div>

      <div className="backgroundvideobefore">

</div>
    </div>
  );
};

export default HeroSection;

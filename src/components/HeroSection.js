import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "assets/images/hero-section.jpg";
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

  return (
    <div
      className="herosection"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="container mx-auto px-4 ">

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
    </div>
  );
};

export default HeroSection;

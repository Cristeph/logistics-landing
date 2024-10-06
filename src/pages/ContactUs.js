import React from 'react';
import * as FiIcons from "react-icons/fa";
import * as mdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as IOicons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as GoIcons from "react-icons/go";
const ContactUs = () => {

 

  return (
    <>
      <div className="contactSection" style={{overflow:'hidden', }}  >
        <div style={{overflow:'hidden', }}   data-aos="fade-up"
             // Add delay to each feature
                  >
          <h2 className="contactHeader"> let’s get in touch with us </h2>

          <div className="iconsNotis" style={{paddingTop: '35px', paddingBottom: '35px'}}>
            <FiIcons.FaFacebookF className="IconsLog" />
            <FiIcons.FaInstagram className="IconsLog" />
            <BsIcons.BsLinkedin className="IconsLog" />
            <IOicons.IoLogoYoutube className="IconsLog" />
          </div>

          <div className="contactDetails">
            <div className="contactInfo">
              <div className="thaIcons">
                <mdIcons.MdLocalPhone />
              </div>
              <div>0917749254</div>
            </div>

            <div className="contactInfo">
              <div className="thaIcons">
                <Io5Icons.IoMailOutline />
              </div>
              <div>support@logisticslight.com</div>
            </div>

            <div className="contactInfo">
              <div className="thaIcons">
                <GoIcons.GoLocation  />
              </div>
              <div>support@logisticslight.com</div>
            </div>
          </div>
        </div>

 <div className="contact-form-container">
 

            <form    data-aos="fade-left    "
                className="contact-form">
                <div className='contactformimg'>

                </div>
            </form>
        </div>


      </div>
    </>
  );
};

export default ContactUs;

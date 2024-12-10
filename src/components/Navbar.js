import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoTransparent from  "assets/images/logo-transparent.webp";
import logoWhite from "assets/images/logo-white.webp";
import { FaArrowRight } from "react-icons/fa6"; 

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleMenu = () => {
        setNavOpen(!navOpen);
    };
 
    const [scrolled, setScrolled] = useState(false);

    // Function to check the scroll position
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 150) {  // You can adjust the scrollY value as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    useEffect(() => {
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    // Define the class name based on scroll state
    let navbarClass = scrolled ? 'NavBarB scrolledNav' : 'NavBarB';
  

    return (
        <nav className={navbarClass}>
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="/#" className="text-2xl font-bold text-[#0c0e37]">
                <img 
            alt="Cristeph Logo" 
            fetchpriority="high" 
            loading="lazy" 
            width="231" 
            height="71" 
            decoding="async" 
            data-nimg="1" 
            className="h-10 w-auto" 
            style={{ color: 'transparent' }} 
            srcSet={scrolled ?  logoTransparent : logoWhite} 
        />
                </a>
                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 zUlt"
                            fill="none"
                            stroke={scrolled ? 'black' : 'white'}  
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Conditional rendering for the icon: show "X" if menu is open */}
                            {navOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
    
                <ul className='flex topNav'    >
                    <div className='flex innerTopNav'>
       <li onClick={toggleMenu}>
                        <a href="/#" className=" ">
                            Home
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="#about-us" className="">
                            About Us
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="#ourservices" className="">
                            Services
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="#contact" className="">
                            Contact
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="/faq" className="">
                            FAQ
                        </a>
                    </li>

                    </div>
             

                 <Link
                    to="/auth"
                    className="hidden md:inline-block bg-[#9d1111] text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Login / Signup
                </Link>
                  
                </ul>
       
            
            </div>

            <div className={`phoneNav ${navOpen ? 'openNavg' : ''}`}  >

           <div className='CloseIc' onClick={toggleMenu}>
             <FaArrowRight />
            </div>

   <ul className='  '    >
                    <div className=' innerTopNav'>
       <li onClick={toggleMenu}>
                        <a href="/#" className=" ">
                            Home
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="#about-us" className="">
                            About us 
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="/#ourservices" className="">
                            Services
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="#contact" className="">
                            Contact
                        </a>
                    </li>

                    
                    <li onClick={toggleMenu}>
                        <a href="#faq" className="">
                            FAQ
                        </a>
                    </li>

                    <li>

                    <Link
                    to="/auth"
                    className="thaBtn"
                >
                    Login / Signup
                </Link>
                    </li>

                    </div>
             

                 <Link
                    to="/auth"
                    className="hidden md:inline-block bg-[#9d1111] text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Login / Signup
                </Link>
                  
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

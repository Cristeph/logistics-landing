import React, { useState } from "react";

function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

    const toggleMenu = () => {
        setNavOpen(!navOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="/#" className="text-2xl font-bold text-[#0c0e37]">
                    <img alt="Cristeph Logo" fetchpriority="high" loading="lazy" width="231" height="71" decoding="async" data-nimg="1" class="h-10 w-auto" style={{"color": "transparent"}} srcset="https://cristeph.vercel.app/_next/image?url=%2Fimages%2Flogo-transparent.png&w=256&q=75" />
                </a>
                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
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
                {/* Navigation Links */}
                <ul
                    className={`${navOpen ? "block" : "hidden"
                        } md:flex space-x-6 md:space-x-6 absolute md:static bg-white w-full md:w-auto left-0 md:mt-0 mt-2 md:p-0 p-4`}
                >
                    <li onClick={toggleMenu}>
                        <a href="/#" className="block text-gray-600 hover:text-[#0c0e37] py-2">
                            Home
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="/#" className="block text-gray-600 hover:text-[#0c0e37] py-2">
                            Services
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="/#" className="block text-gray-600 hover:text-[#0c0e37] py-2">
                            About
                        </a>
                    </li>
                    <li onClick={toggleMenu}>
                        <a href="/#" className="block text-gray-600 hover:text-[#0c0e37] py-2">
                            Contact
                        </a>
                    </li>
                    {/* Mobile Get a Quote button */}
                    <li className="md:hidden" onClick={toggleMenu}>
                        <a
                            href="/#"
                            className="block bg-[#9d1111] text-white px-4 py-2 rounded hover:bg-red-700 mt-2"
                        >
                            Get a Quote
                        </a>
                    </li>
                </ul>
                {/* Desktop Get a Quote button */}
                <a
                    href="/#"
                    className="hidden md:inline-block bg-[#9d1111] text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Get a Quote
                </a>
            </div>
        </nav>
    );
}

export default Navbar;

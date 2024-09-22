import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-800 py-8 text-white">
            <div className="container mx-auto px-4 text-center md:flex md:justify-between">
                <p className="mb-4 md:mb-0">© 2024 LogiFast. All rights reserved.</p>
                <ul className="flex justify-center space-x-4">
                    <li>
                        <a href="/#" className="hover:text-red-400">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/#" className="hover:text-red-400">
                            Services
                        </a>
                    </li>
                    <li>
                        <a href="/#" className="hover:text-red-400">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="/#" className="hover:text-red-400">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;

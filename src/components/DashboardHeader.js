import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ toggleSidebar, isSidebarOpen, toggleHideSidebar, isSidebarHidden }) => {

    return (
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={() => toggleSidebar()} id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                            <svg id="toggleSidebarMobileHamburger" className={`w-6 h-6 ${isSidebarOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg id="toggleSidebarMobileClose" className={`w-6 h-6 ${isSidebarOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <Link to="/" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <img alt="Cristeph Logo" fetchpriority="high" loading="lazy" width="231" height="71" decoding="async" data-nimg="1" className="h-10 w-auto" style={{ "color": "transparent" }} srcSet="https://cristeph.vercel.app/_next/image?url=%2Fimages%2Flogo-transparent.png&w=256&q=75" />
                        </Link>
                    </div>
                    <div className="items-center flex">
                        <span onClick={toggleHideSidebar} href="/#" className="hidden lg:inline-flex ml-5 text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                            {isSidebarHidden ? 'Show Sidebar' : 'Hide Sidebar'}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default DashboardHeader;
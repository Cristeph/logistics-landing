import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    if (user == null) {
        // redirect to auth page
        navigate('/auth');
    }
    let userObj = JSON.parse(user);
    console.log(userObj)

    const handleLogout = () => {
        // redirect to home page
        navigate('/');
    }

    return (
        <aside id="sidebar" className={`fixed ${isSidebarOpen ? 'flex' : 'hidden'}  z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-white divide-y space-y-1">
                        <ul className="space-y-2 pb-2">
                            {userObj.role === "customer" ? (
                                <>
                                    <li>
                                        <Link to="overview" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="booking" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="h-6 w-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 114.58">
                                                <path d="M118.13,9.54a3.25,3.25,0,0,1,2.2.41,3.28,3.28,0,0,1,2,3l.57,78.83a3.29,3.29,0,0,1-1.59,3L89.12,113.93a3.29,3.29,0,0,1-2,.65,3.07,3.07,0,0,1-.53,0L3.11,105.25A3.28,3.28,0,0,1,0,102V21.78H0A3.28,3.28,0,0,1,2,18.7L43.89.27h0A3.19,3.19,0,0,1,45.63,0l72.5,9.51Zm-37.26,1.7-24.67,14,30.38,3.88,22.5-14.18-28.21-3.7Zm-29,20L50.75,64.62,38.23,56.09,25.72,63.17l2.53-34.91L6.55,25.49V99.05l77.33,8.6V35.36l-32-4.09Zm-19.7-9.09L56.12,8,45.7,6.62,15.24,20l16.95,2.17ZM90.44,34.41v71.12l25.9-15.44-.52-71.68-25.38,16Z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Bookings</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="notifications" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Notifications</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="accountmanagement" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Account Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="payment" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2M3 13h18M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Payment and Billing</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="support" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 11-12.728 0 9 9 0 0112.728 0zM12 8v4m0 4h.01" />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Support and Help</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="overview" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="usersmanagement" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 8a7 7 0 0114 0H3z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Users Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="ordermanagement" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 3h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm0 2v10h14V5H3zm2 2h10v2H5V7zm0 4h10v2H5v-2z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Order Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="paymentmanagement" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2M3 13h18M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Payment Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="couriermanagement" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 3h16a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm0 2v10h16V5H2zm2 2h12v2H4V7zm0 4h12v2H4v-2z"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Courier Management</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="notifications" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Notifications</span>
                                        </Link>
                                    </li>
                                </>
                            )}

                        </ul>
                        <div className="space-y-2 pt-2">
                            <span onClick={handleLogout} className="cursor-pointer text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-4">Logout</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;
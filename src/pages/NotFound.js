import React from 'react';
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import illustration from 'assets/images/not-found-404.svg';

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="flex">
                    <img className="self-center mx-auto" src={illustration} alt="illustration" />
                </div>

                <a href="/" className="flex pt-4">
                    <button className="mx-auto rounded-full uppercase bg-blue-500 text-white px-7 py-3 font-bold text-xs hover:drop-shadow-lg">
                        Return Home
                    </button>
                </a>
            </div>
            <Footer />
        </>
    )
}

export default NotFound;
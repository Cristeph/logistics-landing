import React from 'react';

const Stats = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <img alt="Coming soon" loading="lazy" width="96" height="96" decoding="async" data-nimg="1" style={{ "color": "transparent" }} srcSet="https://cristeph.vercel.app/_next/image?url=%2Fimages%2Frocket.png&w=96&q=75" />
            <h2 className="text-xl mt-4 font-medium">Launching Soon!</h2>
            <a href="/"><button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white h-10 px-4 py-2 bg-core hover:bg-blue-600 transition-colors duration-300">Go home</button></a>
        </div>

    )
}

export default Stats;
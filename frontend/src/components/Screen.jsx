import React from "react";

const Screen = () => {
  return (
    <div className="flex justify-center items-center py-12 px-4 bg-gradient-to-tr from-gray-950 via-black to-gray-900 min-h-screen">
      <div className="relative rounded-[2rem] border border-gray-700 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden bg-black max-w-6xl w-full">
        {/* Top bezel / mockup border */}
        <div className="bg-gray-900 h-6 w-full absolute top-0 left-0 rounded-t-[2rem] z-10"></div>

        {/* Screen placeholder */}
        <div className="w-full aspect-video bg-gray-800 rounded-[2rem] relative z-20 flex items-center justify-center text-white text-xl font-semibold">
          {/* No image for now */}
          Screen Preview
        </div>

        {/* Bottom bezel / fake keyboard bar */}
        <div className="absolute bottom-0 w-full h-5 bg-gray-900 rounded-b-[2rem] z-10"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-white/5 pointer-events-none" />
      </div>
    </div>
  );
};

export default Screen;

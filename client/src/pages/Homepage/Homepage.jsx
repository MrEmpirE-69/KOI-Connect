import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import home from "../../assets/home.jpeg";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="bg-white py-10 min-h-screen flex items-center">
        <div className="flex flex-col justify-center items-center px-6 md:px-20 w-full">
          {/* Headline */}
          <h1 className="font-semibold text-5xl md:text-6xl pb-8 text-center animate-fadeInUp transition duration-700 leading-snug">
            <span className="text-[#226CD1]">Connect </span>
            <span className="text-[#1C628F]">Collaborate </span>
            <span className="text-white bg-[#6E63FF] px-3 py-1 rounded-md">
              Achieve
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-semibold text-2xl text-[#22C6D1] pb-10 text-center animate-fadeInUp transition delay-150 duration-700">
            Your Gateway to Seamless Communication
          </p>

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row gap-16 justify-center items-center w-full animate-fadeIn transition duration-700">
            {/* Bigger image with animation */}
            <img
              src={home}
              alt="home"
              className="w-full max-w-2xl h-auto rounded-xl shadow-xl transform hover:scale-105 transition duration-500 ease-in-out"
            />

            {/* Bigger text block */}
            <p className="max-w-2xl font-medium text-xl md:text-[1.35rem] leading-relaxed text-[#302d2d] text-justify animate-fadeInRight transition delay-200 duration-700">
              <span className="block mb-5">
                <strong>KOI Connect</strong> is your all-in-one platform to
                collaborate, communicate, and stay updated within the King's Own
                Institute community. Whether you're exploring courses, sharing
                ideas, or catching the latest news, KOI Connect brings
                everything together for a seamless experience.
              </span>
              <span className="block">
                Designed with students in mind, KOI Connect fosters meaningful
                interactions through dedicated spaces for courses, community
                engagement, and news updates. Stay informed, participate in
                discussions, and grow together with your peers and faculty — all
                in one intuitive platform.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

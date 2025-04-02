import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import home from "../../assets/home.jpeg";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="bg-white py-10">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-4xl pb-8">
            <span className="text-[#226CD1]">Connect </span>
            <span className="text-[#1C628F]">Collaborate</span>{" "}
            <span className="text-[#FFFFFF] bg-[#6E63FF] px-2 py-1">
              Acheive
            </span>
          </h1>
          <p className="font-semibold text-xl text-[#22C6D1] pb-6">
            Your Gateway to Seamless Communication
          </p>
          <div className="flex w-full gap-12 px-12 justify-center">
            <img src={home} alt="home" className="w-[600px] h-[400px]" />
            <p className="w-[600px] font-medium text-lg text-[#302d2d] text-justify">
              KOI Connect is your all-in-one platform to collaborate,
              communicate, and stay updated within the King's Own Institute
              community. Whether you're exploring courses, sharing ideas, or
              catching the latest news, KOI Connect brings everything together
              for a seamless experience. <br /> <br />
              Designed with students in mind, KOI Connect fosters meaningful
              interactions through dedicated spaces for courses, community
              engagement, and news updates. Stay informed, participate in
              discussions, and grow together with your peers and faculty — all
              in one intuitive platform.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

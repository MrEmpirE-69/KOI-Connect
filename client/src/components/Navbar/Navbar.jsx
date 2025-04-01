import React from "react";
import logo from "../../../public/koi.png";

const Navbar = () => {
  return (
    <div className="bg-white ">
      <div className="flex gap-20 items-center w-full shadow">
        {/* Logo */}
        <div className="flex w-32 h-32 p-4">
          <img src={logo} alt="logo" className="w-24 h-20" />
        </div>
        {/* Right Side */}
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-between w-[500px]">
            <p className="font-semibold text-xl text-[#36384E] cursor-pointer hover:underline">
              Courses
            </p>
            <p className="font-semibold text-xl text-[#36384E] cursor-pointer hover:underline">
              Community
            </p>
            <p className="font-semibold text-xl text-[#36384E] cursor-pointer hover:underline">
              News
            </p>
            <p className="font-semibold text-xl text-[#36384E] cursor-pointer hover:underline">
              About
            </p>
          </div>
          <div className="flex w-[200px] items-center justify-between mr-12">
            <button className="flex gap-2 items-center uppercase font-semibold text-xl text-[#36384E] cursor-pointer hover:scale-110">
              Login
            </button>
            <button className="flex gap-2 uppercase font-semibold text-[#F5F5F5] bg-[#6C63FF] px-3 py-2 cursor-pointer hover:bg-[#827cee]">
              Sign UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

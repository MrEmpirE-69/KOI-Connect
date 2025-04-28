import React from "react";
import logo from "../../assets/koi.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md w-full animate-fade-in-down">
      <div className="flex flex-wrap justify-between items-center px-4 md:px-8 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 md:w-20 md:h-20 animate-zoom-in"
          />
        </div>

        {/* Menu Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 items-center mt-4 md:mt-0">
          {["Courses", "Community", "News", "About"].map((item, i) => (
            <p
              key={i}
              className="font-semibold text-base md:text-lg text-[#36384E] cursor-pointer transition duration-300 hover:underline hover:scale-105"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center mt-4 md:mt-0 relative">
          <button
            onClick={handleLoginClick}
            className="uppercase font-semibold text-sm md:text-base text-white bg-[#6C63FF] px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#827cee] hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

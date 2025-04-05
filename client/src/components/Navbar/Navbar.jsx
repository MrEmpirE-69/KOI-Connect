import React from "react";
import logo from "../../assets/koi.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="bg-white animate-fade-in-down shadow-md">
      <div className="flex gap-20 items-center w-full px-6 py-4">
        {/* Logo */}
        <div className="flex w-32 h-32 p-4">
          <img src={logo} alt="logo" className="w-24 h-20 animate-zoom-in" />
        </div>

        {/* Right Side */}
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-between w-[500px]">
            {["Courses", "Community", "News", "About"].map((item, i) => (
              <p
                key={i}
                className="font-semibold text-xl text-[#36384E] cursor-pointer transition duration-300 hover:underline hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="flex w-[200px] items-center justify-between mr-12">
            <button
              onClick={handleLoginClick}
              className="flex gap-2 items-center uppercase font-semibold text-xl text-[#36384E] cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              Login
            </button>
            <button className="flex gap-2 uppercase font-semibold text-white bg-[#6C63FF] px-3 py-2 cursor-pointer transition-all duration-300 hover:bg-[#827cee] hover:scale-105">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

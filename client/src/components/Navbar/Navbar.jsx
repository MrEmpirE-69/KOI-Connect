import React from "react";
import logo from "../../assets/koi.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const navLinks = [
    { name: "Courses", path: "/courses" },
    { name: "News", path: "/news" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="bg-white shadow-md w-full animate-fade-in-down">
      <div className="flex flex-wrap justify-between items-center px-4 md:px-8 py-4 max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 md:w-20 md:h-20 animate-zoom-in"
          />
        </Link>

        {/* Menu Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-10 items-center mt-4 md:mt-0">
          {navLinks.map((item, i) => (
            <Link
              to={item.path}
              key={i}
              className="font-semibold text-base md:text-lg text-[#36384E] cursor-pointer transition duration-300 hover:underline hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Button */}
        <div className="flex gap-4 items-center mt-4 md:mt-0">
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

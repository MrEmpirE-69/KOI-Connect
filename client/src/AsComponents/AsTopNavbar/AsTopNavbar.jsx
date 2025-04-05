import React from "react";
import { BsBell } from "react-icons/bs";

const AsTopNavbar = () => {
  return (
    <div className="flex justify-between items-center px-6 h-[80px] bg-white shadow-sm rounded-md animate-fadeInDown">
      <input
        type="text"
        placeholder="Search here"
        className="border rounded-md px-4 py-2 w-[300px] outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition duration-300"
      />

      <div className="flex items-center gap-6">
        <BsBell className="text-2xl text-[#6C63FF] cursor-pointer hover:scale-110 transition" />
        <div className="text-right">
          <p className="font-semibold text-sm">Logged in as</p>
          <p className="text-sm text-gray-500">Academic Supervisor</p>
        </div>
      </div>
    </div>
  );
};

export default AsTopNavbar;

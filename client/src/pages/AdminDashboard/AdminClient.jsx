import React from "react";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import SideMenu from "../../components/SideMenu/SideMenu";
import { FaArrowLeft } from "react-icons/fa";

const clientList = [
  "TechFlow Inc.",
  "Visionary Co.",
  "AI Labs",
  "Creative Minds",
  "Digital Surge",
  "Cloud Nexus",
  "NextWave Solutions",
  "SmartApps",
  "NeoTech Systems",
  "CodeBase Partners",
];

const AdminClient = () => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-tr from-[#f5f7fb] to-[#ebeff5]">
      {/* Sidebar */}
      <SideMenu currentPage="clients" />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <TopNavbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-12 md:py-10 animate-fade-in-up">
          {/* Back Button */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition duration-300">
              <FaArrowLeft />
              Back
            </button>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-center text-[#226CD1] mb-12 animate-fade-in-down">
            List of Clients
          </h1>

          {/* Client Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {clientList.map((name, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center animate-fade-in-up"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#dce9f9] flex items-center justify-center text-[#226CD1] font-bold text-xl">
                  {name.charAt(0)}
                </div>
                <h2 className="text-lg font-semibold text-[#1C628F]">{name}</h2>
                <p className="text-sm text-gray-500">
                  Client ID: CLT{100 + index}
                </p>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-12 flex justify-center">
            <button className="bg-[#226CD1] text-white font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClient;

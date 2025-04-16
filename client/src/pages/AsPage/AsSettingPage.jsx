import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { FaUserCircle, FaShieldAlt } from "react-icons/fa";

const AsSettingPage = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6fa]">
      {/* Sidebar */}
      <AsSideMenu currentPage="setting" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <AsTopNavbar />

        {/* Page Content */}
        <section className="flex-1 px-6 py-8 md:px-12 md:py-10 overflow-y-auto animate-fade-in-up duration-700">
          {/* Page Title */}
          <h1 className="text-4xl font-extrabold text-[#226CD1] text-center mb-12">
            Settings
          </h1>

          {/* Settings Options */}
          <div className="flex flex-wrap justify-center items-center gap-10 max-w-6xl mx-auto">
            {/* Profile Settings Card */}
            <Link
              to="/as-settingprofile" // Use Link to navigate to Profile page
              className="w-72 h-52 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center gap-3 border hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FaUserCircle className="text-5xl text-[#226CD1]" />
              <h3 className="text-xl font-semibold text-[#333]">Profile</h3>
              <p className="text-sm text-gray-500 text-center px-4">
                Manage your personal information
              </p>
            </Link>

            {/* Account Security Card */}
            <Link
              to="/as-settingaccount" // Use Link to navigate to Account Security page
              className="w-72 h-52 bg-white shadow-md rounded-2xl flex flex-col items-center justify-center gap-3 border hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <FaShieldAlt className="text-4xl text-[#226CD1]" />
              <h3 className="text-xl font-semibold text-[#333]">
                Account Security
              </h3>
              <p className="text-sm text-gray-500 text-center px-4">
                Update password & secure your account
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AsSettingPage;

import React from "react";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";

import { FaUserShield } from "react-icons/fa";

const AsSettingAccount = () => {
    return (
      <div className="flex h-screen bg-[#f4f6fa] overflow-hidden">
        {/* Sidebar */}
        <AsSideMenu currentPage="setting" />
  
        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full">
          <AsTopNavbar />
  
          <section className="flex-1 overflow-y-auto p-6 md:p-10 animate-fade-in-up duration-700">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-[#226CD1] text-center mb-12">
              Security
            </h1>
  
            {/* Content Grid */}
            <div className="flex flex-col lg:flex-row gap-10 items-start justify-center max-w-6xl mx-auto">
              {/* Icon */}
              <div className="w-full lg:w-auto flex justify-center">
                <FaUserShield className="text-6xl text-[#226CD1]" />
              </div>
  
              {/* Password Section */}
              <div className="flex-1 min-w-[280px] w-full max-w-md">
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  Change Password
                </h2>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Old Password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
  
              {/* Address Section */}
              <div className="flex-1 min-w-[280px] w-full max-w-md">
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  Address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    defaultValue="135-234 George st"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="Suburb"
                    defaultValue="Sydney, 2000"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    defaultValue="NSW"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
  
            {/* Save Button */}
            <div className="mt-10 text-center">
              <label className="inline-flex items-center text-sm text-gray-600 mb-3">
                <input type="checkbox" className="mr-2 accent-green-500" />
                Do you confirm the above details
              </label>
              <div>
                <button className="mt-2 bg-[#226CD1] hover:bg-blue-600 text-white px-6 py-2 rounded-full transition">
                  Save
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  };
  
  export default AsSettingAccount;
  
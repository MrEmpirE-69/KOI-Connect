import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import { FaUserShield } from "react-icons/fa";

const AsSettingAccount = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    streetAddress: "135-234 George st",
    suburb: "Sydney, 2000",
    state: "NSW",
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.confirm) {
      alert("Account updated successfully!");
      navigate("/as-setting");  // Navigate to the as-setting page after saving
    } else {
      alert("Please confirm the details before saving.");
    }
  };

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
                  name="oldPassword"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
                  name="streetAddress"
                  placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="suburb"
                  placeholder="Suburb"
                  value={formData.suburb}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-10 text-center">
            <label className="inline-flex items-center text-sm text-gray-600 mb-3">
              <input
                type="checkbox"
                name="confirm"
                checked={formData.confirm}
                onChange={handleChange}
                className="mr-2 accent-green-500 w-4 h-4"
              />
              Do you confirm the above details
            </label>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}  // Submit and navigate
                className="mt-2 bg-[#226CD1] text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition"
              >
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

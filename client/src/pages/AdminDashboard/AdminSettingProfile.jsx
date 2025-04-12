import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { FaUserCircle } from "react-icons/fa";

const AdminSettingProfile = () => {
  const [formData, setFormData] = useState({
    givenName: "Abdul ali",
    familyName: "Khan",
    email: "abdulali@gmail.com",
    mobile: "0444554456",
    confirm: false,
  });

  const navigate = useNavigate();  // Initialize the navigate function

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
      alert("Profile updated successfully!");
      // Navigate to the admin-setting page after successful form submission
      navigate("/admin-setting");  // Redirect to the settings page
    } else {
      alert("Please confirm the details before saving.");
    }
  };

  return (
    <div className="flex h-screen bg-[#f9f9f9] overflow-hidden">
      {/* Sidebar */}
      <SideMenu currentPage="setting" />

      {/* Main Section */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />

        <section className="flex-1 px-6 py-8 md:px-12 md:py-10 overflow-y-auto animate-fade-in-up duration-700">
          <h1 className="text-4xl font-extrabold text-[#226CD1] text-center mb-10">
            Profile
          </h1>

          {/* Form Card */}
          <div className="bg-white shadow-md rounded-2xl p-8 max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <FaUserCircle className="text-6xl text-[#226CD1]" />
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Given Name
                  </label>
                  <input
                    type="text"
                    name="givenName"
                    value={formData.givenName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Family Name
                  </label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Confirmation & Button */}
              <div className="mt-8">
                <label className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="confirm"
                    checked={formData.confirm}
                    onChange={handleChange}
                    className="accent-[#226CD1] w-4 h-4"
                  />
                  Do you confirm the above details
                </label>

                <button
                  type="submit"
                  className="bg-[#226CD1] text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminSettingProfile;

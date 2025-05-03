import React from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import { BASE_URL } from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import { adminRequest, updateAuthToken } from "../../utils/requestMethods";
import { Loader } from "lucide-react";
import admin from "../../assets/admin.png";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminSettingProfile = () => {
  const { data, loading } = useFetch(`${BASE_URL}/user/profile`, adminRequest);
  updateAuthToken();

  console.log("Profile data:", data);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <Loader className="animate-spin w-12 h-12 text-blue-500" />
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  const profile = data?.data || {};

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#eef2f7] to-[#d6e4f5] overflow-hidden">
      <SideMenu currentPage="setting" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <section className="flex-1 px-6 py-8 md:px-12 md:py-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 animate-fade-in-up">
            {/* Profile Summary */}
            <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-lg flex flex-col items-center md:w-1/3 hover:shadow-2xl transition">
              <img
                src={admin}
                alt="profile"
                className="w-32 h-32 rounded-full"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {profile.fullName || "N/A"}
              </h2>
              <div className="mt-6 bg-[#226CD1]/10 text-[#226CD1] text-center rounded-full px-4 py-1 text-xs font-semibold tracking-wider">
                Profile ID: {profile.uuid || "N/A"}
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-lg flex-1 hover:shadow-2xl transition">
              <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">
                Account Details
              </h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <FaEnvelope className="text-[#226CD1]" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-base font-medium text-gray-700">
                      {profile.email || "N/A"}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <FaPhoneAlt className="text-[#226CD1]" />
                  <div>
                    <p className="text-xs text-gray-400">Mobile</p>
                    <p className="text-base font-medium text-gray-700">
                      {profile.mobileNumber || "N/A"}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-[#226CD1]" />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-base font-medium text-gray-700">
                      {profile.address || "N/A"}
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <FaCalendarAlt className="text-[#226CD1]" />
                  <div>
                    <p className="text-xs text-gray-400">Joined Date</p>
                    <p className="text-base font-medium text-gray-700">
                      {profile.createdAt
                        ? new Date(profile.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminSettingProfile;

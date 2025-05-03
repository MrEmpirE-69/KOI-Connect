import React, { useState } from "react";
import TopNavbar from "../../../components/TopNavbar/TopNavbar";
import SideMenu from "../../../components/SideMenu/SideMenu";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  Calendar,
  Fingerprint,
  UserCircle,
} from "lucide-react";
import { BASE_URL } from "../../../utils/config";
import { adminRequest } from "../../../utils/requestMethods";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = adminRequest.post(`${BASE_URL}/student/create`, formData);
    toast.promise(
      request,
      {
        loading: "Processing...",
        success: (response) => {
          setFormData({
            studentId: "",
            fullName: "",
            email: "",
            mobileNumber: "",
            address: "",
            dateOfBirth: "",
            gender: "",
          });
          setTimeout(() => {
            navigate(-1);
          }, 500);
          return response.data.message;
        },
        error: (error) => {
          return error.response?.data?.message || "Something went wrong.";
        },
      },
      {
        success: { duration: 1500 },
        error: { duration: 2000 },
      }
    );
    try {
      await request;
    } catch (err) {}
  };

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      <SideMenu currentPage="dashboard" />
      <main className="flex-1 flex flex-col overflow-y-auto p-6">
        <TopNavbar />
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm mt-8 text-gray-600 bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft />
            Back
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow p-8 w-full">
          <h2 className="text-3xl font-semibold mb-4 text-left text-gray-800">
            Create a New Student
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {/* Student ID */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Fingerprint className="w-5 h-5 mr-2 text-blue-500" />
                Student ID
              </label>
              <input
                type="number"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                min={0}
                placeholder="Enter student ID"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Phone className="w-5 h-5 mr-2 text-blue-500" />
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                placeholder="Enter mobile number"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col rounded-xl p-5 transition">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <UserCircle className="w-5 h-5 mr-2 text-blue-500" />
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 shadow hover:scale-105 transition-transform duration-200"
              >
                Create Student
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CreateStudent;

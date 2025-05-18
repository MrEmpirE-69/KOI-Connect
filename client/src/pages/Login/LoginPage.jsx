import React, { useState, useEffect } from "react";
import logo from "../../assets/koi.png";
import student from "../../assets/student.png";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Navbar from "../../components/Navbar/Navbar";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.fromChangePassword) {
      toast.success("Password changed successfully. Please log in again.");
    }
  }, [location]);

  const handleChange = (event, field) => {
    const changedValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: changedValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = loginDetail;

    try {
      const response = await axios.post(`${BASE_URL}/authenticate`, {
        email,
        password,
      });

      const { data } = response;

      if (data.success) {
        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("userRole", data.role);
        sessionStorage.setItem("userId", data.userId);

        if (data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else if (data.role === "STUDENT") {
          navigate("/student-dashboard");
        } else if (data.role === "SUPERVISOR") {
          navigate("/as-dashboard");
        }

        toast.success(`Logged in as ${data.role}`);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const isFormValid = loginDetail.email && loginDetail.password;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Left Column */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-white to-blue-50 flex justify-center items-center p-4 md:p-8 animate-fadeInLeft">
          <div className="max-w-md w-full text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-4">
              <img
                src={logo}
                alt="KOI Logo"
                className="w-12 h-12 md:w-14 md:h-14 mr-2"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-[#1C628F]">
                KOI Connect
              </h1>
            </div>

            {/* Welcome Message */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#1C628F]">
              Welcome Back!
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Log in to access your dashboard and continue your academic journey
              with KOI Connect 🎓
            </p>

            {/* Illustration */}
            <div className="mt-6 flex justify-center">
              <img
                src={student}
                alt="Student Illustration"
                className="w-40 md:w-52 drop-shadow-xl transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f9f9ff] flex justify-center items-center p-4 md:p-8 animate-fadeInRight">
          <div className="w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#333]">
              Log in
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter email or username"
                className="p-3 rounded-lg bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                value={loginDetail.email}
                onChange={(e) => handleChange(e, "email")}
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="p-3 rounded-lg w-full bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                  value={loginDetail.password}
                  onChange={(e) => handleChange(e, "password")}
                />
                <span
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
                Forgot password?
              </div>
              <button
                type="submit"
                disabled={!isFormValid}
                onClick={handleFormSubmit}
                className="bg-[#6C63FF] text-white py-3 rounded-lg hover:bg-[#827cee] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

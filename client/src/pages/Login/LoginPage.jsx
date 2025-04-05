import React, { useState } from "react";
import logo from "../../assets/koi.png";
import student from "../../assets/student.png";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white overflow-hidden">
      
      {/* Left Column */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-white to-blue-50 flex flex-col justify-center p-8 md:p-12 animate-fadeInLeft transition-all duration-700">
        <div className="max-w-md mx-auto text-center">
          {/* Logo and Title */}
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <img src={logo} alt="KOI Logo" className="w-14 h-14 md:w-16 md:h-16 mr-2" />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1C628F]">KOI Connect</h1>
          </div>

          {/* Welcome Message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1C628F]">Welcome Back!</h2>
          <p className="text-md md:text-lg text-gray-600 mb-6">
            Log in to access your dashboard and continue your academic journey with KOI Connect 🎓
          </p>

          {/* Sign Up Prompt */}
          <p className="text-sm text-gray-500 mb-1">Don’t have an account?</p>
          <p className="text-sm font-medium text-[#6C63FF] cursor-pointer hover:underline">
            <a href="/signup">Register here</a>
          </p>

          {/* Illustration */}
          <div className="mt-10 flex justify-center">
            <img
              src={student}
              alt="Student Illustration"
              className="w-64 md:w-72 drop-shadow-xl transition duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#f9f9ff] p-8 md:p-12 animate-fadeInRight transition-all duration-700">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#333]">Log in</h2>
          <form className="flex flex-col gap-6 animate-slideUp transition-all duration-700">
            <input
              type="text"
              placeholder="Enter email or username"
              className="p-4 rounded-lg bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition duration-300"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-4 rounded-lg w-full bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF] transition duration-300"
              />
              <span
                className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
              Forgot password?
            </div>
            <button className="bg-[#6C63FF] text-white py-3 rounded-lg shadow-md hover:bg-[#827cee] transition duration-300">
              Login
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">or continue with</div>

          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Login"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

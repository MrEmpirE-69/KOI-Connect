import React, { useState } from "react";
import logo from "../../assets/koi.png";
import student from "../../assets/student.png";
import { Eye, EyeOff } from "lucide-react"; // 👈 Import toggle icons

export default function SignUpPage() {
  // Visibility toggle state for both password fields
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="flex items-center mb-6 md:mb-8">
          <img src={logo} alt="KOI Logo" className="w-14 h-14 md:w-16 md:h-16 mr-2" />
          <h1 className="text-2xl md:text-3xl font-bold text-[#1C628F]">KOI Connect</h1>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-[#333]">Sign Up to</h2>
        <h3 className="text-lg md:text-xl mb-4 md:mb-6 text-[#1C628F] font-medium flex items-center">
          KOI Connect <span className="ml-2 text-2xl">🎓</span>
        </h3>
        <p className="text-gray-600 mb-1">If you already have an account</p>
        <p className="text-sm font-medium text-[#6C63FF] cursor-pointer hover:underline">
          You can <a href="/login">Login here!</a>
        </p>
        <img src={student} alt="Student Illustration" className="w-60 md:w-[300px] mt-8" />
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#f9f9ff] p-8 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#333]">Sign Up</h2>
          <form className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Enter Email"
              className="p-4 rounded-lg bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            />
            <input
              type="text"
              placeholder="Create Username"
              className="p-4 rounded-lg bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="p-4 rounded-lg bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-4 rounded-lg w-full bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
              <span
                className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="p-4 rounded-lg w-full bg-[#f0eeff] focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
              <span
                className="absolute right-4 top-4 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <button className="bg-[#6C63FF] text-white py-3 rounded-lg shadow-md hover:bg-[#827cee] transition">
              Register
            </button>
          </form>

          <div className="my-6 text-center text-gray-500">or continue with</div>

          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google Sign Up"
              className="w-10 h-10 cursor-pointer hover:scale-110 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

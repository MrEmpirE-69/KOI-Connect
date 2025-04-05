import React, { useState, useEffect } from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

const StudentsAssessmentPage = () => {
  const assessments = [
    { title: "Sample 1", percentage: 72 },
    { title: "Sample 2", percentage: 54 },
    { title: "Sample 3", percentage: 77 },
  ];

  const submissionHistory = [
    {
      title: "NLP Assignment",
      date: "03 Apr 2025",
      time: "10:15 AM",
      status: "Submitted",
    },
    {
      title: "Web Design",
      date: "24 Mar 2025",
      time: "2:00 PM",
      status: "Late",
    },
    {
      title: "AI Project",
      date: "15 Mar 2025",
      time: "11:45 AM",
      status: "Submitted",
    },
  ];

  // Countdown Timer
  const deadline = new Date("2025-04-10T23:59:59");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Deadline passed");
        clearInterval(interval);
      } else {
        const hrs = Math.floor(diff / 1000 / 60 / 60);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#f7fafd] to-[#edf2f8] overflow-hidden">
      <StudentsSideMenu />

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <StudentTopNavbar />

        <div className="flex-1 overflow-y-auto p-8">
          {/* Heading */}
          <motion.h1
            variants={fadeIn(0.1)}
            initial="hidden"
            animate="visible"
            className="text-3xl font-extrabold text-[#226CD1] text-center mb-6 drop-shadow-sm"
          >
            📊 Current Assessment Progress
          </motion.h1>

          {/* Countdown */}
          <motion.div
            variants={fadeIn(0.15)}
            initial="hidden"
            animate="visible"
            className="text-center mb-10"
          >
            <p className="text-sm text-gray-500">⏰ Time left to submit:</p>
            <p className="text-xl font-bold text-[#FF5858]">{timeLeft}</p>
          </motion.div>

          {/* Progress Cards */}
          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-lg p-10 mb-14 flex justify-around items-center"
          >
            {assessments.map((item, idx) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={idx}
                className="flex flex-col items-center"
              >
                <h2 className="font-semibold mb-4 text-gray-700">
                  {item.title}
                </h2>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="38"
                      stroke="#e5e7eb"
                      strokeWidth="10"
                      fill="none"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="38"
                      stroke="url(#grad)"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 38}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 38 * (1 - item.percentage / 100)
                      }`}
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#6C63FF" />
                        <stop offset="100%" stopColor="#22D1EE" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-sm">
                    <p className="font-semibold text-gray-600">Completed</p>
                    <p className="text-lg font-bold text-[#226CD1]">
                      {item.percentage}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Upload Heading */}
          <motion.h2
            variants={fadeIn(0.3)}
            initial="hidden"
            animate="visible"
            className="text-2xl font-bold text-[#226CD1] text-center mb-6"
          >
            📁 Upload Your Assessment File
          </motion.h2>

          {/* Upload Box */}
          <motion.div
            variants={fadeIn(0.35)}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl p-10 text-center shadow-md flex flex-col items-center gap-4 transition hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#6C63FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-8m0 0L8 12m4-4l4 4m-4-4v8m8 0a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-700">
              Choose a file or drag & drop it here
            </p>
            <p className="text-gray-500 text-sm">
              PDF, DOCX, JPEG, MP4 formats up to 50MB
            </p>
            <button className="mt-4 px-6 py-2 bg-[#6C63FF] text-white rounded-full shadow hover:bg-[#5952e4] transition">
              Browse File
            </button>
          </motion.div>

          {/* Submission History */}
          <motion.div
            variants={fadeIn(0.4)}
            initial="hidden"
            animate="visible"
            className="mt-16"
          >
            <h3 className="text-xl font-bold text-[#226CD1] mb-4 text-center">
              🕓 Submission History
            </h3>
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              {submissionHistory.map((entry, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-3 h-3 mt-2 rounded-full bg-[#6C63FF]"></div>
                  <div>
                    <p className="font-semibold text-gray-700">{entry.title}</p>
                    <p className="text-sm text-gray-500">
                      {entry.date} • {entry.time} •{" "}
                      <span
                        className={`font-medium ${
                          entry.status === "Late"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div
            variants={fadeIn(0.5)}
            initial="hidden"
            animate="visible"
            className="mt-16"
          >
            <h3 className="text-xl font-bold text-[#226CD1] mb-4 text-center">
              💡 Quick Tips Before You Submit
            </h3>
            <ul className="bg-[#fefefe] border border-gray-200 shadow-sm p-6 rounded-xl space-y-3 text-gray-700 text-sm">
              <li>✅ Double-check file size and format.</li>
              <li>✅ Name your files clearly (e.g., Brad_Assignment2.pdf).</li>
              <li>✅ Upload before the deadline to avoid issues.</li>
              <li>✅ Contact your course coordinator for clarifications.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentsAssessmentPage;

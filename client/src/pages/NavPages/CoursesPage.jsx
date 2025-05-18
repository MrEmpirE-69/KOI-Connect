import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const courses = [
  "Diploma of Accounting",
  "Diploma of Management",
  "Bachelor of Business (Accounting)",
  "Bachelor of Business (Management and Finance)",
  "Diploma of Information Technology",
  "Bachelor of Information Technology",
];

const CoursesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Courses
          </h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Explore our range of diplomas and degrees tailored to build your
            future career.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                  {course}
                </h2>
                <p className="text-gray-600 text-sm">
                  Learn essential skills and industry knowledge through our{" "}
                  {course}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;

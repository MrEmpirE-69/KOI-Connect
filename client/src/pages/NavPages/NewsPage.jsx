import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const newsArticles = [
  {
    title: "Australia to Increase International Student Visas in 2025",
    description:
      "The Australian Government has announced an increase in student visa quotas to support demand in fields like IT and healthcare...",
    date: "May 15, 2025",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "AI & Data Analytics Courses See Huge Demand",
    description:
      "As businesses embrace AI, universities report a 40% surge in enrollments for tech-driven programs. Students are choosing AI over traditional majors...",
    date: "May 10, 2025",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "KOI Introduces Hybrid Learning Model for 2025",
    description:
      "King’s Own Institute now allows students to blend online lectures with in-person tutorials, making study more flexible than ever...",
    date: "May 8, 2025",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "New Employability Hub for Sydney Students Opens",
    description:
      "The new student hub focuses on job-readiness skills, internships, and real-world experiences as a bridge to full-time employment...",
    date: "May 5, 2025",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Government Funds Regional Online Learning Access",
    description:
      "With a $10M grant, students in regional NSW can now access high-speed education platforms and virtual labs to match metro counterparts...",
    date: "April 28, 2025",
    image:
      "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=60",
  },
];

const NewsPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            Education News & Updates
          </h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-1">{article.date}</p>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:underline cursor-pointer">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;

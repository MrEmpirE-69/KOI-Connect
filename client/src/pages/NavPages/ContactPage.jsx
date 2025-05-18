import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { publicRequest } from "../../utils/requestMethods";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ContactPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await publicRequest.post("/contact/submit", {
        subject,
        message,
        fullName,
        email,
      });

      if (res.data.success === true) {
        toast.success(res.data.message);
        setSubject("");
        setMessage("");
        setEmail("");
        setFullName("");
      } else {
        toast.error(res.data.message || "Failed to submit contact.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Image Section */}
            <div className="bg-indigo-600 text-white flex flex-col justify-center p-10">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-indigo-100 text-sm">
                We'd love to hear from you! Whether you have a question about
                courses, feedback, or need help, our team is ready to assist
                you.
              </p>
            </div>

            {/* Right Form Section */}
            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Contact Us
              </h3>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        <Toaster position="top-right" />
      </section>
    </>
  );
};

export default ContactPage;

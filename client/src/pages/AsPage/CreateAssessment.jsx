import React, { useState } from "react";
import { Calendar, FileText, AlignLeft, ArrowLeft, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AsTopNavbar from "../../AsComponents/AsTopNavbar/AsTopNavbar";
import AsSideMenu from "../../AsComponents/AsSideMenu/AsSideMenu";
import { BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";

const CreateAssessment = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !file ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.deadline
    ) {
      toast.error("All fields and file are required!");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("data", JSON.stringify(formData));

    const request = adminRequest.post(`${BASE_URL}/assessment/upload`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.promise(
      request,
      {
        loading: "Uploading assessment...",
        success: (res) => {
          setFormData({ title: "", description: "", deadline: "" });
          setFile(null);
          setTimeout(() => navigate(-1), 500);
          return res.data.message || "Assessment uploaded successfully.";
        },
        error: (err) => err.response?.data?.message || "Upload failed.",
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
      <AsSideMenu currentPage="dashboard" />
      <main className="flex-1 flex flex-col overflow-y-auto p-6">
        <AsTopNavbar />
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
            Create a New Assessment
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col max-w-3xl"
            encType="multipart/form-data"
          >
            {/* Title */}
            <div className="flex flex-col p-5">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter assessment title"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col p-5">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <AlignLeft className="w-5 h-5 mr-2 text-blue-500" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter description"
                rows="3"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Due Date */}
            <div className="flex flex-col p-5">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* File Upload */}
            <div className="flex flex-col p-5">
              <label className="flex items-center text-gray-600 text-sm font-medium mb-2">
                <Upload className="w-5 h-5 mr-2 text-blue-500" />
                Upload File
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                required
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="col-span-1 md:col-span-2 p-5">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 shadow hover:scale-105 transition-transform duration-200"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CreateAssessment;

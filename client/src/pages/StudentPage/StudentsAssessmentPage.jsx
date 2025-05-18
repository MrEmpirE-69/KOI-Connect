import React, { useEffect, useState } from "react";
import StudentsSideMenu from "../../StudentComponents/StudentsSideMenu/StudentsSideMenu";
import StudentTopNavbar from "../../StudentComponents/StudentTopNavbar/StudentTopNavbar";
import { BASE_URL, FILE_BASE_URL } from "../../utils/config";
import { adminRequest } from "../../utils/requestMethods";
import toast, { Toaster } from "react-hot-toast";

const StudentsAssessmentPage = () => {
  const [activeTab, setActiveTab] = useState("assessments");
  const [assessments, setAssessments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const fetchAssessments = async () => {
    try {
      const response = await adminRequest.get(`${BASE_URL}/assessment/listAll`);
      setAssessments(response.data.data);
    } catch (error) {
      console.log("assessment list not found");
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await adminRequest.get(
        `${BASE_URL}/assessmentSubmit/listByStudent`
      );
      setSubmissions(response.data.data);
    } catch (error) {
      console.log("submission list not found");
    }
  };

  useEffect(() => {
    fetchAssessments();
    fetchSubmissions();
  }, []);

  const openSubmitDialog = (assessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
    setUploadFile(null);
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleSubmitAssessment = async () => {
    if (!uploadFile) {
      toast.error("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ assessmentId: selectedAssessmentId })
    );
    formData.append("file", uploadFile);

    const request = adminRequest.post(
      `${BASE_URL}/assessmentSubmit/submit`,
      formData
    );

    toast.promise(
      request,
      {
        loading: "Submitting assessment...",
        success: "Assessment submitted successfully!",
        error: "Failed to submit assessment.",
      },
      {
        success: { duration: 1500 },
        error: { duration: 2000 },
      }
    );

    try {
      await request;
      closeSubmitModal();
      fetchAssessments();
      fetchSubmissions();
    } catch (err) {}
  };

  const openViewDialog = (assessment) => {
    setSelectedAssessment(assessment);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedAssessment(null);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#f7fafd] to-[#edf2f8] overflow-hidden">
      <StudentsSideMenu />
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <StudentTopNavbar />
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 flex gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "assessments"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("assessments")}
            >
              My Assessments
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "submissions"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("submissions")}
            >
              My Submissions
            </button>
          </div>

          {activeTab === "assessments" ? (
            <table className="w-full table-auto border-collapse bg-white shadow rounded-2xl overflow-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold">Title</th>
                  <th className="p-3 text-sm font-semibold">Supervisor</th>
                  <th className="p-3 text-sm font-semibold">Due Date</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">{assessment.title}</td>
                    <td className="p-3 text-sm">
                      {assessment.supervisor.fullName}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(assessment.deadline).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium">
                        {assessment.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-right space-x-2">
                      <button
                        onClick={() => openSubmitDialog(assessment.id)}
                        className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => openViewDialog(assessment)}
                        className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full table-auto border-collapse bg-white shadow rounded-2xl overflow-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 text-sm font-semibold">Title</th>
                  <th className="p-3 text-sm font-semibold">Supervisor</th>
                  <th className="p-3 text-sm font-semibold">Submitted Date</th>
                  <th className="p-3 text-sm font-semibold">Status</th>
                  <th className="p-3 text-sm font-semibold">Grade</th>
                  <th className="p-3 text-sm font-semibold">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b border-b-gray-200 hover:bg-gray-100"
                  >
                    <td className="p-3 text-sm">
                      {submission.assessment.title}
                    </td>
                    <td className="p-3 text-sm">
                      {submission.assessment.supervisor.fullName}
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-sm">{submission.status}</td>
                    <td className="p-3 text-sm">{submission.grade || "-"}</td>
                    <td className="p-3 text-sm">
                      {submission.feedback || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {showSubmitModal && (
            <div className="fixed inset-0 bg-transparent backdrop-blur flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Submit Assessment
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeSubmitModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitAssessment}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {showViewModal && selectedAssessment && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
              <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Assessment Details
                  </h3>
                  <button onClick={closeViewModal}>
                    <span className="text-gray-500 hover:text-red-500 text-xl">
                      &times;
                    </span>
                  </button>
                </div>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>Title:</strong> {selectedAssessment.title}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedAssessment.description}
                  </p>
                  <p>
                    <strong>Supervisor:</strong>{" "}
                    {selectedAssessment.supervisor.fullName}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(selectedAssessment.deadline).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedAssessment.status}
                  </p>
                  {selectedAssessment.fileUrl && (
                    <p>
                      <strong>File:</strong>{" "}
                      <a
                        href={`${FILE_BASE_URL}${selectedAssessment.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                        download
                      >
                        View File
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeViewModal}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default StudentsAssessmentPage;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/LoginPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import StudentDashboard from "./pages/StudentPage/StudentDashboard"
import AsDashboard from "./pages/AsPage/AsDashboard";
import StudentAssessmentPage from "./pages/StudentPage/StudentsAssessmentPage"
import StudentCommunicationPage from "./pages/StudentPage/StudentCommunicationPage"
import StudentSettingPage from "./pages/StudentPage/StudentSettingPage"

import AsProjectReviewPage from "./pages/AsPage/AsProjectReviewPage";
import AsCommunicationPage from "./pages/AsPage/AsCommunicationPage";
import AdminProjectReview from "./pages/AdminDashboard/AdminProjectReview";
import AdminSettingPage from "./pages/AdminDashboard/AdminSettingPage";
import AdminSettingProfile from "./pages/AdminDashboard/AdminSettingProfile";
import AdminSettingAccount from "./pages/AdminDashboard/AdminSettingAccount";
import AdminCommunicationPage from "./pages/AdminDashboard/AdminCommunicationPage";
import AdminRoleDistributorPage from "./pages/AdminDashboard/AdminRoleDistributorPage";

import AdminStudent from "./pages/AdminDashboard/AdminStudent";
import AdminClient from "./pages/AdminDashboard/AdminClient";
import AdminTeacher from "./pages/AdminDashboard/AdminTeacher";
import ClientDashboard from "./pages/ClientPage/ClientDashboard";
import ClientProjectReview from "./pages/ClientPage/ClientProjectReview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-assessment" element={<StudentAssessmentPage />} />
          <Route path="/student-communication" element={<StudentCommunicationPage />} />
          <Route path="/student-setting" element={<StudentSettingPage />} />

          <Route path="/as-dashboard" element={<AsDashboard />} />
          <Route path="/as-projectreview" element={<AsProjectReviewPage />} />
          <Route path="/as-communication" element={<AsCommunicationPage />} />

          <Route path="/admin-projectreview" element={<AdminProjectReview />} />
          <Route path="/student-list" element={<AdminStudent />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-projectreview" element={<ClientProjectReview />} />
          <Route path="/teacher-list" element={<AdminTeacher />} />
          <Route path="/client-list" element={<AdminClient />} />
          <Route path="/admin-setting" element={<AdminSettingPage />} />
          <Route path="/admin-settingprofile" element={<AdminSettingProfile />} />
          <Route path="/admin-settingaccount" element={<AdminSettingAccount />} />
          <Route path="/admin-communication" element={<AdminCommunicationPage />} />
          <Route path="/admin-role-distributor" element={<AdminRoleDistributorPage />} />
          

          <Route path="*" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;

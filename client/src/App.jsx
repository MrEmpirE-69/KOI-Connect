import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/LoginPage";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import StudentDashboard from "./pages/StudentPage/StudentDashboard";
import AsDashboard from "./pages/AsPage/AsDashboard";
import StudentAssessmentPage from "./pages/StudentPage/StudentsAssessmentPage";
import StudentCommunicationPage from "./pages/StudentPage/StudentCommunicationPage";
import StudentSettingPage from "./pages/StudentPage/StudentSettingPage";
import StudentSettingProfile from "./pages/StudentPage/StudentSettingProfile";
import StudentSettingAccount from "./pages/StudentPage/StudentSettingAccount";

import AsProjectReviewPage from "./pages/AsPage/AsProjectReviewPage";
import AsCommunicationPage from "./pages/AsPage/AsCommunicationPage";
import AsSettingPage from "./pages/AsPage/AsSettingPage";
import AsSettingProfile from "./pages/AsPage/AsSettingProfile";
import AsSettingAccount from "./pages/AsPage/AsSettingAccount";

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
import ClientCommunication from "./pages/ClientPage/ClientCommunication";
import ClientSettingPage from "./pages/ClientPage/ClientSettingPage";
import ClientSettingProfile from "./pages/ClientPage/ClientSettingProfile";
import ClientSettingAccount from "./pages/ClientPage/ClientSettingAccount";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route
              path="/student-assessment"
              element={<StudentAssessmentPage />}
            />
            <Route
              path="/student-communication"
              element={<StudentCommunicationPage />}
            />
            <Route path="/student-setting" element={<StudentSettingPage />} />
            <Route
              path="/student-settingprofile"
              element={<StudentSettingProfile />}
            />
            <Route
              path="/student-settingaccount"
              element={<StudentSettingAccount />}
            />

            <Route path="/as-dashboard" element={<AsDashboard />} />
            <Route path="/as-projectreview" element={<AsProjectReviewPage />} />
            <Route path="/as-communication" element={<AsCommunicationPage />} />
            <Route path="/as-setting" element={<AsSettingPage />} />
            <Route path="/as-settingprofile" element={<AsSettingProfile />} />
            <Route path="/as-settingaccount" element={<AsSettingAccount />} />

            <Route
              path="/admin-projectreview"
              element={<AdminProjectReview />}
            />
            <Route path="/student-list" element={<AdminStudent />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route
              path="/client-communication"
              element={<ClientCommunication />}
            />
            <Route path="/client-setting" element={<ClientSettingPage />} />
            <Route
              path="/client-settingprofile"
              element={<ClientSettingProfile />}
            />
            <Route
              path="/client-settingaccount"
              element={<ClientSettingAccount />}
            />

            <Route
              path="/client-projectreview"
              element={<ClientProjectReview />}
            />
            <Route path="/teacher-list" element={<AdminTeacher />} />
            <Route path="/client-list" element={<AdminClient />} />
            <Route path="/admin-setting" element={<AdminSettingPage />} />
            <Route
              path="/admin-settingprofile"
              element={<AdminSettingProfile />}
            />
            <Route
              path="/admin-settingaccount"
              element={<AdminSettingAccount />}
            />
            <Route
              path="/admin-communication"
              element={<AdminCommunicationPage />}
            />
            <Route
              path="/admin-role-distributor"
              element={<AdminRoleDistributorPage />}
            />
          </Route>

          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;

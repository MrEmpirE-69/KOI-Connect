import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/LoginPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import StudentDashboard from "./pages/StudentPage/StudentDashboard"
import AsDashboard from "./pages/AsPage/AsDashboard";

import AdminStudent from "./pages/AdminDashboard/AdminStudent";
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
          <Route path="/as-dashboard" element={<AsDashboard />} />
          <Route path="/student-list" element={<AdminStudent />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-projectreview" element={<ClientProjectReview />} />
          

          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;

import React from "react";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Login from "../Login/LoginPage";

const Home = () => {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

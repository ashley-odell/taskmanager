import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectManagementDashboard from "./components/ProjectManagementDashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectManagementDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

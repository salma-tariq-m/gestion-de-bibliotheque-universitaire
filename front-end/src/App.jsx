import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EtudiantsPage from "./pages/EtudiantsPage";
import LivresPage from "./pages/livresPage";
import EmpruntsPage from "./pages/EmpruntsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/etudiants" element={<EtudiantsPage />} />
        <Route path="/livres" element={<LivresPage />} />
        <Route path="/emprunts" element={<EmpruntsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
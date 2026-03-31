import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EtudiantsPage from "./pages/EtudiantsPage";
import LivresPage from "./pages/livresPage";
import EmpruntsPage from "./pages/EmpruntsPage";
import BlacklistPage from "./pages/RetardPage";
import HistoriquePage from "./pages/historiquePage";

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: "100%", height: "100%", display: "flex", flex: 1 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/etudiants" element={<PageTransition><EtudiantsPage /></PageTransition>} />
        <Route path="/livres" element={<PageTransition><LivresPage /></PageTransition>} />
        <Route path="/emprunts" element={<PageTransition><EmpruntsPage /></PageTransition>} />
        <Route path="/retards" element={<PageTransition><BlacklistPage /></PageTransition>} />
        <Route path="/historique" element={<PageTransition><HistoriquePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
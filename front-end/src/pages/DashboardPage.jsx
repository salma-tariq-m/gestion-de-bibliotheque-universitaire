import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import "../css/dashboard.css"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    pendingRequests: 0,
    monthlyBorrows: [],
    availableBooks: 0
  });

  useEffect(() => {
    // Remplacer par ton URL réelle
    axios.get("http://localhost:5136/api/dashboard")
      .then(res => setStats(res.data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  // Sécurité : on s'assure que monthlyBorrows est bien un tableau avant le map
  const borrowsData = stats.monthlyBorrows || [];

  const barData = {
    labels: borrowsData.map(m => m.month),
    datasets: [{
      label: "Emprunts",
      data: borrowsData.map(m => m.count),
      backgroundColor: "#3b82f6",
      borderRadius: 6,
    }],
  };

  const pieData = {
    labels: ["Disponibles", "Empruntés"],
    datasets: [{
      data: [stats.availableBooks, stats.borrowedBooks],
      backgroundColor: ["#10b981", "#f59e0b"],
      borderWidth: 0,
    }],
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-container">
          <div className="page-header">
            <div>
              <h1>Tableau de bord</h1>
              <p>Aperçu en temps réel de l'activité de la bibliothèque.</p>
            </div>
          </div>

          {/* Section des compteurs (Stat Cards) */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <h3>{stats.totalBooks}</h3>
                <p>Total Livres</p>
              </div>
            </div>

            <div className="stat-card green">
              <div className="stat-icon">🔄</div>
              <div className="stat-info">
                <h3>{stats.borrowedBooks}</h3>
                <p>Emprunts en cours</p>
              </div>
            </div>

            <div className="stat-card orange">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>{stats.pendingRequests}</h3>
                <p>Demandes en attente</p>
              </div>
            </div>
          </div>

          {/* Section des Graphiques */}
          <div className="charts-grid">
            <div className="card chart-card main-chart">
              <h3>📈 Volume des emprunts mensuels</h3>
              <div className="chart-wrapper">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="card chart-card side-chart">
              <h3>📊 État du stock</h3>
              <div className="chart-wrapper">
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
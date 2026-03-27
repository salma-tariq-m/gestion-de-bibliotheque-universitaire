import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale, BarElement,Title,Tooltip,Legend,ArcElement} from "chart.js";
import { BookOpen, RefreshCw, Clock, Package, TrendingUp, PieChart, LayoutDashboard } from "lucide-react";

import "../css/dashboard.css";

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
    axios.get("http://localhost:5136/api/dashboard")
      .then(res => {
        const data = res.data;

        setStats({
          totalBooks: data.totalBooks ?? data.TotalBooks,
          borrowedBooks: data.borrowedBooks ?? data.BorrowedBooks,
          pendingRequests: data.pendingRequests ?? data.PendingRequests,
          availableBooks: data.availableBooks ?? data.AvailableBooks,
          monthlyBorrows: data.monthlyBorrows ?? data.MonthlyBorrows
        });
      })
      .catch(err => console.error("Erreur API:", err));
  }, []);

  const borrowsData = stats.monthlyBorrows || [];

  const barData = {
    labels: borrowsData.map(m => m.month || m.Month),
    datasets: [
      {
        label: "Emprunts",
        data: borrowsData.map(m => m.count || m.Count),
        backgroundColor: "#4F46E5",
        borderRadius: 6
      }
    ]
  };

  const pieData = {
    labels: ["Disponibles", "Empruntés"],
    datasets: [
      {
        data: [stats.availableBooks, stats.borrowedBooks],
        backgroundColor: ["#10b981", "#f59e0b"],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="content-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h1>Tableau de bord</h1>
              </div>
            </div>
          </div>

          {/* 📊 STATS */}
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-icon"><BookOpen size={28} /></div>
              <div className="stat-info">
                <h3>{stats.totalBooks}</h3>
                <p>Total Livres</p>
              </div>
            </div>

            <div className="stat-card green">
              <div className="stat-icon"><RefreshCw size={28} /></div>
              <div className="stat-info">
                <h3>{stats.borrowedBooks}</h3>
                <p>Emprunts en cours</p>
              </div>
            </div>

            <div className="stat-card orange">
              <div className="stat-icon"><Clock size={28} /></div>
              <div className="stat-info">
                <h3>{stats.pendingRequests}</h3>
                <p>Demandes en attente</p>
              </div>
            </div>

            <div className="stat-card purple">
              <div className="stat-icon"><Package size={28} /></div>
              <div className="stat-info">
                <h3>{stats.availableBooks}</h3>
                <p>Stock disponible</p>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="card chart-card main-chart">
              <h3><TrendingUp size={20} className="inline-block" style={{marginRight: '8px'}} /> Emprunts mensuels</h3>
              <div className="chart-wrapper">
                <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="card chart-card side-chart">
              <h3><PieChart size={20} className="inline-block" style={{marginRight: '8px'}} /> État du stock</h3>
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
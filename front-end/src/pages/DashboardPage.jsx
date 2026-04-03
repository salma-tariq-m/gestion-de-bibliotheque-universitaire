import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts } from "../redux/slices/empruntsSlice";
import { Bar, Pie } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale, BarElement,Title,Tooltip,Legend,ArcElement} from "chart.js";
import { BookOpen, RefreshCw, Clock, Package, TrendingUp, PieChart, LayoutDashboard, AlertTriangle, XCircle, Users } from "lucide-react";

import "../css/dashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { emprunts } = useSelector(state => state.emprunts);

  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    pendingRequests: 0,
    monthlyBorrows: [],
    availableBooks: 0
  });

  useEffect(() => {
    dispatch(fetchEmprunts());
    axios.get("http://localhost:5136/api/dashboard")
      .then(res => {
        const data = res.data;

        setStats({
          totalBooks: data.totalBooks ?? data.TotalBooks,
          borrowedBooks: data.borrowedBooks ?? data.BorrowedBooks,
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

  const now = new Date();
  
  const livresRetard = emprunts.filter(e => 
    e.statut && typeof e.statut === "string" && e.statut.includes("Cours") && new Date(e.dateRetourPrevue) < now
  ).length;

  const livresPerdus = emprunts.filter(e => e.statut === "Perdu").length;

  const etudiantsStats = {};
  emprunts.forEach(e => {
    const isRetard = e.statut && typeof e.statut === "string" && e.statut.includes("Cours") && new Date(e.dateRetourPrevue) < now;
    const isPerdu = e.statut === "Perdu";
    if (!etudiantsStats[e.etudiantCef]) etudiantsStats[e.etudiantCef] = { retards: 0, perdus: 0 };
    if (isRetard) etudiantsStats[e.etudiantCef].retards++;
    if (isPerdu) etudiantsStats[e.etudiantCef].perdus++;
  });

  const etudiantsBlacklist = Object.values(etudiantsStats).filter(
    s => s.retards > 1 || s.perdus >= 1
  ).length;

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

          <div className="stats-grid">

            <div className="stat-card green">
              <div className="stat-icon"><RefreshCw size={28} /></div>
              <div className="stat-info">
                <h3>{stats.borrowedBooks}</h3>
                <p>Emprunts en cours</p>
              </div>
            </div>


            <div className="stat-card" style={{ backgroundColor: "#fef2f2", color: "#991b1b" }}>
              <div className="stat-icon text-red-600"><AlertTriangle size={28} /></div>
              <div className="stat-info">
                <h3>{livresRetard}</h3>
                <p>Livres en retard</p>
              </div>
            </div>

            <div className="stat-card" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
              <div className="stat-icon text-amber-600"><XCircle size={28} /></div>
              <div className="stat-info">
                <h3>{livresPerdus}</h3>
                <p>Livres perdus</p>
              </div>
            </div>

            <div className="stat-card" style={{ backgroundColor: "#f3f4f6", color: "#1f2937" }}>
              <div className="stat-icon text-gray-800"><Users size={28} /></div>
              <div className="stat-info">
                <h3>{etudiantsBlacklist}</h3>
                <p>Étudiants listés noirs</p>
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
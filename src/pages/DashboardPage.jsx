import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Bienvenue sur le Dashboard</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ background: "#17a2b8", color: "white", padding: "20px", borderRadius: "5px" }}>
            Nombre de livres : 
          </div>
          <div style={{ background: "#28a745", color: "white", padding: "20px", borderRadius: "5px" }}>
            Emprunts en cours : 
          </div>
          <div style={{ background: "#ffc107", color: "white", padding: "20px", borderRadius: "5px" }}>
            Demandes en attente : 
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", float: "left", background: "#f0f0f0", height: "100vh", padding: "20px" }}>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/livres">Livres</Link></li>
          <li><Link to="/etudiants">Étudiants</Link></li>
          <li><Link to="/emprunts">Emprunts</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
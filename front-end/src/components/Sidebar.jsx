import { Link, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>Gestion<span>bibliotheque</span></h3>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/livres" ? "active" : ""}>
            <Link to="/livres">Livres</Link>
          </li>
          <li className={location.pathname === "/etudiants" ? "active" : ""}>
            <Link to="/etudiants">Étudiants</Link>
          </li>
          <li className={location.pathname === "/emprunts" ? "active" : ""}>
            <Link to="/emprunts">Emprunts</Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 </p>
      </div>
    </aside>
  );
};

export default Sidebar;
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Library, Users, ArrowRightLeft, ShieldBan, LibraryBig, History, User } from "lucide-react";
import "../css/sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <LibraryBig className="brand-logo-icon" size={28} color="var(--accent-primary)" />
        <h3>Gestion<span>biblio</span></h3>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
          </li>
          <li className={location.pathname === "/livres" ? "active" : ""}>
            <Link to="/livres" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Library size={20} /> Livres
            </Link>
          </li>
          <li className={location.pathname === "/etudiants" ? "active" : ""}>
            <Link to="/etudiants" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users size={20} /> Étudiants
            </Link>
          </li>
          <li className={location.pathname === "/emprunts" ? "active" : ""}>
            <Link to="/emprunts" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ArrowRightLeft size={20} /> Emprunts
            </Link>
          </li>
          <li className={location.pathname === "/retards" ? "active" : ""}>
            <Link to="/retards" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldBan size={20} /> Liste Noir
            </Link>
          </li>
          <li className={location.pathname === "/historique" ? "active" : ""}>
            <Link to="/historique " style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <History size={20} /> Historique
            </Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={20} /> Mon Profil
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 Admin</p>
      </div>
    </aside>
  );
};

export default Sidebar;
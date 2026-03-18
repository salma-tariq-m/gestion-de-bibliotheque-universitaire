import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../css/header.css"; // N'oublie pas de décommenter cette ligne

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Biblio<span>Admin</span></h1>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span className="user-role">Administrateur</span>
          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
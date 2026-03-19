import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import "../css/header.css"; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

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
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
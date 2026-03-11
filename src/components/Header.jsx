import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header style={{ background: "#007bff", color: "white", padding: "10px 20px" }}>
      <h1 style={{ display: "inline" }}>Bibliothèque Admin</h1>
      <button 
        onClick={handleLogout} 
        style={{ float: "right", padding: "5px 10px", cursor: "pointer" }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
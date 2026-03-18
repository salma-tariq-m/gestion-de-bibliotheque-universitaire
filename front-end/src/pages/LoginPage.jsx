import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importation de Framer Motion
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      {/* Éléments de background animés */}
      <motion.div 
        className="bg-circle one"
        animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="bg-circle two"
        animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Carte de Login avec animation d'entrée */}
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="login-title">📚 Bibliothèque</h1>
        <h3 className="login-subtitle">Connexion Administrateur</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="error-text">{error}</motion.p>}

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="login-button" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Chargement..." : "Se connecter"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, LibraryBig, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
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
    <div className="login-wrapper">
      {/* Visual background animated shapes */}
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Floating Login Card */}
      <motion.div 
        className="login-box"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="login-box-header">
          <motion.div 
            className="brand-icon"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <LibraryBig size={36} strokeWidth={1.5} />
          </motion.div>
          <h2>Système de Gestion</h2>
          <p>Connectez-vous à votre espace administrateur</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Adresse E-mail</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                placeholder="admin@universite.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input 
                type="password" 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, height: 0, scale: 0.9 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.9 }}
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-submit-login" disabled={loading}>
            {loading ? (
              <><Loader2 className="spinner-icon" size={20} /> Connexion en cours...</>
            ) : (
              <>Se connecter <ArrowRight size={20} className="arrow-icon" /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
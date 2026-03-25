import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiShield } from "react-icons/fi";
import "../css/login.css";
import bgImage from "/image.png";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation de connexion
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* SECTION GAUCHE : Identité du système */}
        <div className="left-panel">
          <img src={bgImage} alt="Fond" id="bg-img" />
          
          <div className="hero-content">
            <h1>Espace <br /> <span>Bibliothécaire.</span></h1>
            <p>
              Interface sécurisée de gestion des ressources académiques 
              et du catalogue universitaire.
            </p>
          </div>

          <div className="bottom-info">
            <nav className="footer-nav">
              <span>ADMINISTRATION CENTRALE</span>
            </nav>
          </div>
        </div>

        {/* SECTION DROITE : Connexion */}
        <motion.div 
          className="right-panel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-wrapper">
            <h2>Connexion</h2>
            <p className="subtitle">Accédez à votre console de gestion</p>

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label>IDENTIFIANT PROFESSIONNEL</label>
                <div className="input-wrapper">
                  <input type="email" placeholder="nom@universite.ma" required />
                  <FiMail className="input-icon" />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>MOT DE PASSE</label>
                  <span className="forgot-link">Oublié ?</span>
                </div>
                <div className="input-wrapper">
                  <input type="password" placeholder="••••••••" required />
                  <FiLock className="input-icon" />
                </div>
              </div>
              <motion.button 
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                whileHover={!isLoading ? { backgroundColor: "#004ecc" } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <motion.div 
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                ) : (
                  <>Accéder à la console <FiArrowRight /></>
                )}
              </motion.button>
            </form>

            <p className="legal-notice">
              <FiShield /> Accès restreint. Les activités de cette session 
              sont enregistrées pour l'audit de sécurité.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
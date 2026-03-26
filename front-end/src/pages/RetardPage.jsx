import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiAlertCircle, FiUser, FiBook, FiCalendar, FiClock } from "react-icons/fi";
import { fetchRetards } from "../redux/slices/retardSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/blacklist.css";

const BlacklistPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.retards);

  useEffect(() => {
    dispatch(fetchRetards());
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <main className="content-container">
          <motion.div 
            className="page-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1>Liste Noire & Retards</h1>
              <p>Étudiants ayant dépassé le délai de restitution des ouvrages.</p>
            </div>
            <div className="alert-badge">
              <FiAlertCircle /> {data.length} Retards critiques
            </div>
          </motion.div>

          <div className="table-card">
            {status === "loading" ? (
              <div className="loading-state">Chargement des données...</div>
            ) : (
              <table className="custom-table">
                <thead>
                  <tr>
                    <th><FiUser /> ÉTUDIANT</th>
                    <th>CEF</th>
                    <th><FiBook /> OUVRAGE</th>
                    <th><FiCalendar /> RETOUR PRÉVU</th>
                    <th><FiClock /> ÉTAT</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((r, index) => (
                    <motion.tr 
                      key={r.id_Emprunt}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="user-cell">
                        <span className="user-name">{r.etudiantNom}</span>
                      </td>
                      <td><code>{r.etudiantCef}</code></td>
                      <td className="book-title">{r.livreTitre}</td>
                      <td>{new Date(r.dateRetourPrevue).toLocaleDateString('fr-FR')}</td>
                      <td>
                        <span className={`status-pill ${r.joursRetard > 7 ? 'critical' : 'warning'}`}>
                          +{r.joursRetard} jours
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlacklistPage;
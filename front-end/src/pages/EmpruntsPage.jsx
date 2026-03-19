import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts, validerEmprunt, retournerEmprunt } from "../redux/slices/empruntsSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ClipboardList, Search, CheckCircle, XCircle, CornerDownLeft, Loader2, FileText, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import "../css/emprunt.css";
import CreateEmprunt from "../components/EmpruntForm";

const EmpruntsPage = () => {
  const dispatch = useDispatch();
  const { emprunts, loading, error } = useSelector(state => state.emprunts);

  const [search, setSearch] = useState("");

  const empruntsFiltres = emprunts.filter(e =>
    e.etudiantNom.toLowerCase().includes(search.toLowerCase()) ||
    e.livreTitre.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => { dispatch(fetchEmprunts()); }, [dispatch]);

  const handleValider = (id) => dispatch(validerEmprunt(id));
  const handleRetourner = (id) => dispatch(retournerEmprunt(id));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-container">
       <CreateEmprunt onSuccess={() => dispatch(fetchEmprunts())} />
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h1>Gestion des Emprunts</h1>
                <p>Validez les demandes et suivez les retours de livres.</p>
              </div>
            </div>
          </div>

          <div className="controls-bar">
            <h3>{empruntsFiltres.length} Emprunt{empruntsFiltres.length !== 1 ? "s" : ""}</h3>
            <div className="search-bar-modern">
              <Search className="search-icon w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par étudiant ou livre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card table-card glass-card">
            {error && (
              <div className="error-msg">
                <AlertCircle className="w-5 h-5 mb-2 mx-auto" />
                <p>Erreur: {error}</p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Livre</th>
                  <th>Date Emprunt</th>
                  <th>Date Retour</th>
                  <th>Statut</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Loader2 className="loading-spinner" />
                      <p className="empty-title">Chargement des emprunts...</p>
                    </td>
                  </tr>
                </tbody>
              ) : empruntsFiltres.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <FileText className="empty-icon w-12 h-12" />
                      <p className="empty-title">Aucun emprunt trouvé</p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {empruntsFiltres.map((emprunt) => (
                    <motion.tr variants={itemVariants} key={emprunt.id}>
                      <td className="font-bold">{emprunt.etudiantNom}</td>
                      <td>{emprunt.livreTitre}</td>
                      <td>{new Date(emprunt.dateEmprunt).toLocaleDateString()}</td>
                      <td>{emprunt.dateRetour ? new Date(emprunt.dateRetour).toLocaleDateString() : "-"}</td>
                      <td>
                        <span className={`status-badge ${emprunt.statut.toLowerCase().replace(/\s/g, '-')}`}>
                          <span className="status-dot" style={{ backgroundColor: 'currentColor' }}></span>
                          {emprunt.statut}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {emprunt.statut === "En attente" && (
                          <div className="btn-group">
                            <button className="btn-action btn-check" onClick={() => handleValider(emprunt.id)}>
                              <CheckCircle className="w-4 h-4 mr-1 inline" /> Valider
                            </button>
                          </div>
                        )}
                        {emprunt.statut === "Emprunté" && (
                          <button className="btn-action btn-return" onClick={() => handleRetourner(emprunt.id)}>
                            <CornerDownLeft className="w-4 h-4 mr-1 inline" /> Retourner
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmpruntsPage;
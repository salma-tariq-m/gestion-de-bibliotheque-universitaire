import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts, validerEmprunt, retournerEmprunt, annulerEmprunt } from "../redux/slices/empruntsSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import CreateEmprunt from "../components/EmpruntForm";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Plus, Search, CheckCircle, RotateCcw, 
  AlertCircle, X, Loader2, Library
} from "lucide-react";
import "../css/emprunt.css";

const EmpruntsPage = () => {
  const dispatch = useDispatch();
  const { emprunts, loading, error } = useSelector(state => state.emprunts);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchEmprunts());
  }, [dispatch]);

  // ✅ Correction filtre
  const filtered = emprunts
    .filter(e => e.statut === "Emprunté" || e.statut === "En attente")
    .filter(e =>
      (e.etudiantNom || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.etudiantPrenom || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.livreTitre || "").toLowerCase().includes(search.toLowerCase())
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const getStatusBadgeClass = (statut) => {
    if (!statut) return "status-badge";
    const s = statut.toLowerCase();
    if (s.includes("attente")) return "status-badge en-attente";
    if (s.includes("emprunt")) return "status-badge emprunté";
    if (s.includes("retour")) return "status-badge retourné";
    if (s.includes("refus")) return "status-badge refusé";
    return "status-badge";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        
        <main className="content-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1>Gestion des Emprunts</h1>
              </div>
            </div>
            <button
              className={`btn-primary ${showForm ? 'btn-close' : ''} header-btn`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? (
                <X className="w-5 h-5"/>
              ) : (
                <>
                  <Plus className="w-5 h-5"/> Ajouter un Emprunt
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.98 }}
                animate={{ opacity: 1, height: "auto", scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="card form-card">
                  <CreateEmprunt onSuccess={() => {
                    dispatch(fetchEmprunts());
                    setShowForm(false);
                  }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="controls-bar">
            <h3>
               {filtered.length} Emprunt{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
            </h3>
            <div className="search-bar-modern">
              <Search className="search-icon w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher étudiant ou livre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card table-card glass-card">
            {error && (
              <div className="error-msg text-center my-4 py-8">
                <AlertCircle className="w-6 h-6 mb-2 mx-auto text-red-500" />
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>Livre</th>
                  <th>Date Emprunt</th>
                  <th>Date Retour Prévue</th>
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
              ) : filtered.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Library className="empty-icon" />
                      <p className="empty-title">Aucun emprunt trouvé</p>
                      <p className="empty-desc">Essayez de modifier vos critères de recherche.</p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <motion.tbody
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filtered.map((e) => (
                    <motion.tr variants={itemVariants} key={e.id}>
                      <td className="font-bold">{e.etudiantNom} {e.etudiantPrenom}</td>
                      <td>
                        <div className="book-cell">
                          <div className="book-icon-bg">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          {e.livreTitre}
                        </div>
                      </td>
                      <td>{e.dateEmprunt ? new Date(e.dateEmprunt).toLocaleDateString() : "-"}</td>
                      <td>{e.dateRetourPrevue ? new Date(e.dateRetourPrevue).toLocaleDateString() : "-"}</td>
                      <td><span className={getStatusBadgeClass(e.statut)}>{e.statut || "N/A"}</span></td>
                      <td className="actions-cell">
                        {e.statut === "En attente" && (
                          <>
                            <button 
                              className="btn-action bg-green-500"
                              onClick={() => dispatch(validerEmprunt(e.id))}
                              title="Valider"
                            >
                              <CheckCircle className="w-4 h-4 inline-block mr-1" /> Valider
                            </button>

                            <button
                              className="btn-action btn-cancel bg-red-500 ml-2"
                              onClick={() => dispatch(annulerEmprunt(e.id))}
                              title="Annuler"
                            >
                              <X className="w-4 h-4 inline-block mr-1" /> Annuler
                            </button>
                          </>
                        )}

                        {(e.statut === "Emprunté" || e.statut === "EnCours") && (
                          <button 
                            className="btn-action btn-return"
                            onClick={() => dispatch(retournerEmprunt(e.id))}
                            title="Retourner"
                          >
                            <RotateCcw className="w-4 h-4 inline-block mr-1" /> Retourner
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts } from "../redux/slices/empruntsSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  AlertCircle,
  Loader2,
  Library
} from "lucide-react";
import "../css/emprunt.css";

const HistoriquePage = () => {
  const dispatch = useDispatch();
  const { emprunts, loading, error } = useSelector(state => state.emprunts);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchEmprunts());
  }, [dispatch]);

  // ✅ FILTRAGE CORRECT (Recherche + Historique)
  const filtered = emprunts
    .filter(e =>
      (e.etudiantNom || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.etudiantPrenom || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.livreTitre || "").toLowerCase().includes(search.toLowerCase())
    )
    .filter(e => e.statut === "Retourné" || e.statut === "Annule");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const getStatusBadgeClass = (statut) => {
    if (!statut) return "status-badge";
    const s = statut.toLowerCase();
    if (s.includes("termine")) return "status-badge retourné";
    if (s.includes("annule")) return "status-badge refusé";
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
                <h1>Historique des Emprunts</h1>
              </div>
            </div>
          </div>
          <div className="controls-bar">
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
                  <th>Date Retour Réelle</th>
                  <th>Statut</th>
                </tr>
              </thead>

              {/* ⏳ Loading */}
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Loader2 className="loading-spinner" />
                      <p className="empty-title">Chargement de l'historique...</p>
                    </td>
                  </tr>
                </tbody>
              ) : filtered.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Library className="empty-icon" />
                      <p className="empty-title">Aucun historique trouvé</p>
                      <p className="empty-desc">
                        Aucun emprunt terminé ou annulé.
                      </p>
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
                      <td className="font-bold">
                        {e.etudiantNom} {e.etudiantPrenom}
                      </td>

                      <td>
                        <div className="book-cell">
                          <div className="book-icon-bg">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          {e.livreTitre}
                        </div>
                      </td>

                      <td>
                        {e.dateEmprunt
                          ? new Date(e.dateEmprunt).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        {e.dateRetourPrevue
                          ? new Date(e.dateRetourPrevue).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        {e.dateRetourReelle
                          ? new Date(e.dateRetourReelle).toLocaleDateString()
                          : new Date(e.dateRetourPrevue).toLocaleDateString()}
                      </td>

                      <td>
                        <span className={getStatusBadgeClass(e.statut)}>
                          {e.statut}
                        </span>
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

export default HistoriquePage;
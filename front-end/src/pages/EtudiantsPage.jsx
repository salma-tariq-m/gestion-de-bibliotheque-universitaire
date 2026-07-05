import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEtudiants } from "../redux/slices/etudiantSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
// import EtudiantForm from "../components/EtudiantForm";
import { Users, Plus, Search, Edit2, Trash2, UserCircle, Loader2, AlertCircle, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/etudiant.css";

const EtudiantsPage = () => {
  const dispatch = useDispatch();
  const { etudiants, loading, error } = useSelector(state => state.etudiants);

  const [showForm, setShowForm] = useState(false);
  const [editEtudiant, setEditEtudiant] = useState(null);
  const [search, setSearch] = useState("");

  // Filtrage par nom ou prenom
  const etudiantsFiltres = etudiants.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.prenom.toLowerCase().includes(search.toLowerCase()) ||
    e.cef.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchEtudiants());
    console.log("etudiants", etudiants);
  }, [dispatch]);

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
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box"><Users className="w-6 h-6" /></div>
              <div>
                <h1>Les Étudiants</h1>
              </div>
            </div>

          </div>

          <div className="controls-bar">
            <h3>
              {etudiantsFiltres.length} Étudiant{etudiantsFiltres.length !== 1 ? 's' : ''} trouvé{etudiantsFiltres.length !== 1 ? 's' : ''}
            </h3>
            <div className="search-bar-modern">
              <Search className="search-icon w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par nom, prénom ou CEF..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card table-card glass-card">
            {error && (
              <div className="error-msg">
                <AlertCircle className="w-5 h-5 mb-2 mx-auto" />
                <p>{error}</p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>CEF</th>
                  <th>Nom Complet</th>
                  <th>Email</th>
                  <th>Telephone</th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="3" className="empty-state">
                      <Loader2 className="loading-spinner" />
                      <p className="empty-title">Chargement des étudiants...</p>
                    </td>
                  </tr>
                </tbody>
              ) : etudiantsFiltres.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="3" className="empty-state">
                      <UserCircle className="empty-icon w-12 h-12" />
                      <p className="empty-title">Aucun étudiant trouvé</p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <motion.tbody variants={containerVariants} initial="hidden" animate="show">
                  {etudiantsFiltres.map((etudiant, index) => (
                    <motion.tr variants={itemVariants} key={etudiant.id || index}>
                      <td>{etudiant.cef}</td>
                      <td className="font-bold">{etudiant.nom} {etudiant.prenom}</td>
                      <td>{etudiant.email}</td>
                      <td>{etudiant.telephone}</td>
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

export default EtudiantsPage;
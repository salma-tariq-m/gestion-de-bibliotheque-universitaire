import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLivres, addLivre, updateLivre, deleteLivre } from "../redux/slices/livresSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LivreForm from "../components/LivreForm";
import { Book, Plus, Search, Edit2, Trash2, Library, Loader2, AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/livres.css"

const LivresPage = () => {
  const dispatch = useDispatch();
  const { livres, loading, error } = useSelector((state) => state.livres);

  const [showForm, setShowForm] = useState(false);
  const [editLivre, setEditLivre] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchLivres());
  }, [dispatch]);

  // Filtrage dynamique des livres
  const filteredLivres = livres.filter(
    (l) =>
      l.titre.toLowerCase().includes(search.toLowerCase()) ||
      l.auteur?.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (livreData) => {
    dispatch(addLivre(livreData));
    setShowForm(false);
  };

  const handleUpdate = (livreData) => {
    dispatch(updateLivre({ id: editLivre.id_Livre, livre: livreData }));
    setEditLivre(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.")) {
      dispatch(deleteLivre(id));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
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
          
          {/* Barre de titre et action */}
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <h1>Catalogue des Livres</h1>
                <p>Gérez l'inventaire complet de votre bibliothèque.</p>
              </div>
            </div>
            <button
              className={`btn-primary ${showForm ? 'btn-close' : ''} header-btn`}
              onClick={() => { setShowForm(!showForm); setEditLivre(null); }}
            >
              {showForm ? <><X className="w-5 h-5"/> Fermer</> : <><Plus className="w-5 h-5"/> Ajouter un Livre</>}
            </button>
          </div>

          {/* Formulaire animé */}
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
                  <LivreForm
                    initialData={editLivre}
                    onSubmit={editLivre ? handleUpdate : handleAdd}
                    onCancel={() => { setShowForm(false); setEditLivre(null); }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contrôles (Recherche) */}
          <div className="controls-bar">
            <h3>
               {filteredLivres.length} Livre{filteredLivres.length !== 1 ? 's' : ''} trouvé{filteredLivres.length !== 1 ? 's' : ''}
            </h3>
            <div className="search-bar-modern">
              <Search className="search-icon w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher par titre ou auteur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table dans une carte */}
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
                  <th>Titre du Livre</th>
                  <th>Auteur</th>
                  <th>Statut / Stock</th>
                  <th>Année</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="empty-state">
                      <Loader2 className="loading-spinner" />
                      <p className="empty-title">Chargement du catalogue...</p>
                    </td>
                  </tr>
                </tbody>
              ) : filteredLivres.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="5" className="empty-state">
                      <Book className="empty-icon" />
                      <p className="empty-title">Aucun livre trouvé</p>
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
                  {filteredLivres.map((livre) => (
                    <motion.tr variants={itemVariants} key={livre.id_Livre}>
                      <td className="font-bold">
                        <div className="book-cell">
                          <div className="book-icon-bg">
                            <Book className="w-4 h-4" />
                          </div>
                          {livre.titre}
                        </div>
                      </td>
                      <td>{livre.auteur}</td>
                      <td>
                        <span className={`badge ${livre.quantite > 0 ? 'badge-success' : 'badge-danger'}`}>
                          {livre.quantite > 0 ? (
                            <>
                              <span className="status-dot dot-success"></span>
                              {livre.quantite} en stock
                            </>
                          ) : (
                            <>
                              <span className="status-dot dot-danger"></span>
                              Épuisé
                            </>
                          )}
                        </span>
                      </td>
                      <td>{livre.annee || "-"}</td>
                      <td className="actions-cell">
                        <button 
                          className="btn-icon edit-icon" 
                          onClick={() => { setEditLivre(livre); setShowForm(true); }}
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          className="btn-icon delete-icon" 
                          onClick={() => handleDelete(livre.id_Livre)}
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

export default LivresPage;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEtudiants, addEtudiant, updateEtudiant, deleteEtudiant } from "../redux/slices/etudiantSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EtudiantForm from "../components/EtudiantForm";
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

  const handleAdd = (etudiant) => {
    dispatch(addEtudiant(etudiant));
    setShowForm(false);
  };

  const handleUpdate = (etudiant) => {
    dispatch(updateEtudiant({ id: editEtudiant.id, etudiant }));
    setEditEtudiant(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ? Cette action est irréversible.")) {
      dispatch(deleteEtudiant(id));
    }
  };

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
                <h1>Gestion des Étudiants</h1>
              </div>
            </div>
            <button
              className={`btn-primary ${showForm ? 'btn-close' : ''} header-btn`}
              onClick={() => { setShowForm(!showForm); setEditEtudiant(null); }}
            >
              {showForm ? <><X className="w-5 h-5" /> </> : <><Plus className="w-5 h-5" /> Ajouter un Étudiant</>}
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
                  <EtudiantForm
                    initialData={editEtudiant || {}}
                    onSubmit={editEtudiant ? handleUpdate : handleAdd}
                    onCancel={() => { setShowForm(false); setEditEtudiant(null); }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  <th className="text-right">Actions</th>
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
                      <td className="actions-cell">
                        {console.log(etudiantsFiltres)}
                        <button
                          className="btn-icon edit-icon"
                          onClick={() => {
                            setEditEtudiant({
                              id: etudiant.id,
                              Cef: etudiant.cef,
                              Nom: etudiant.nom,
                              Prenom: etudiant.prenom,
                              Email: etudiant.email,
                              Id_Fillier: etudiant.Id_Fillier || etudiant.filiereId || etudiant.fillier?.id_Fillier || ""
                            });
                            setShowForm(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="btn-icon delete-icon"
                          onClick={() => handleDelete(etudiant.id)}
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

export default EtudiantsPage;
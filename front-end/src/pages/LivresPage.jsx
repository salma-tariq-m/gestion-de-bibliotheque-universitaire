import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLivres, addLivre, updateLivre, deleteLivre } from "../redux/slices/livresSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LivreForm from "../components/LivreForm";
import "../css/livres.css"
const LivresPage = () => {
  const dispatch = useDispatch();
  const { livres, loading } = useSelector((state) => state.livres);

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
    if (window.confirm("🗑️ Voulez-vous vraiment supprimer ce livre ?")) {
      dispatch(deleteLivre(id));
    }
  };

return (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">
      <Header />
      <main className="content-container">
        {/* Barre de titre et action */}
        <div className="page-header">
          <div>
            <h1>Gestion des Livres</h1>
            <p>Consultez et modifiez l'inventaire de la bibliothèque.</p>
          </div>
          <button 
            className={`btn-primary ${showForm ? 'btn-close' : ''}`} 
            onClick={() => { setShowForm(!showForm); setEditLivre(null); }}
          >
            {showForm ? "Fermer" : "+ Ajouter un Livre"}
          </button>
        </div>

        {/* Formulaire dans une carte */}
        {showForm && (
          <div className="card form-card">
            <LivreForm
              initialData={editLivre}
              onSubmit={editLivre ? handleUpdate : handleAdd}
              onCancel={() => { setShowForm(false); setEditLivre(null); }}
            />
          </div>
        )}

        {/* Barre de recherche */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Rechercher par titre ou auteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table dans une carte blanche */}
        <div className="card table-card">
          <table>
            <thead>
              <tr>
                <th>Titre du Livre</th>
                <th>Auteur</th>
                <th>Statut / Stock</th>
                <th>Année</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="status-msg">Chargement...</td></tr>
              ) : filteredLivres.map((livre) => (
                <tr key={livre.id_Livre}>
                  <td className="font-bold">{livre.titre}</td>
                  <td>{livre.auteur}</td>
                  <td>
                    <span className={`badge ${livre.quantite > 0 ? 'badge-success' : 'badge-danger'}`}>
                      {livre.quantite > 0 ? `${livre.quantite} en stock` : "Épuisé"}
                    </span>
                  </td>
                  <td>{livre.annee}</td>
                  <td className="actions-cell">
                    <button className="btn-edit" onClick={() => { setEditLivre(livre); setShowForm(true); }}>Modifier</button>
                    <button className="btn-delete" onClick={() => handleDelete(livre.id_Livre)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
);
};

export default LivresPage;
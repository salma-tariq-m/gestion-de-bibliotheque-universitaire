import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLivres, addLivre, updateLivre, deleteLivre } from "../redux/slices/livresSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LivreForm from "../components/LivreForm";

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
    dispatch(updateLivre({ id: editLivre.id_livre, livre: livreData }));
    setEditLivre(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("🗑️ Voulez-vous vraiment supprimer ce livre ?")) {
      dispatch(deleteLivre(id));
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-slate-50 d-flex">
      {/* 1. Sidebar Fixe à gauche (240px) */}
      <Sidebar />

      {/* 2. Conteneur Principal décalé de la largeur de la sidebar pour éviter la superposition */}
      <div className="flex-grow-1 tw-ml-[240px] tw-transition-all">
        
        {/* Header qui suit le décalage */}
        <Header />

        <main className="tw-p-8">
          
          {/* Section Titre & Action */}
          <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
            <div>
              <h1 className="tw-text-3xl tw-font-extrabold tw-text-slate-800 tw-tracking-tight">
                Gestion des Livres
              </h1>
              <p className="tw-text-slate-500">Consultez et modifiez l'inventaire de la bibliothèque.</p>
            </div>
            <button
              onClick={() => { setShowForm(!showForm); setEditLivre(null); }}
              className={`tw-px-6 tw-py-3 tw-rounded-2xl tw-font-bold tw-transition-all tw-shadow-lg ${
                showForm 
                ? "tw-bg-rose-50 tw-text-rose-600 tw-border tw-border-rose-200" 
                : "tw-bg-blue-600 tw-text-white hover:tw-bg-blue-700 tw-scale-105"
              }`}
            >
              {showForm ? "✖ Fermer" : "➕ Ajouter un Livre"}
            </button>
          </div>

          {/* Affichage du Formulaire */}
          {showForm && (
            <div className="tw-mb-8 tw-animate-in tw-fade-in tw-slide-in-from-top-4 tw-duration-300">
              <LivreForm
                initialData={editLivre}
                onSubmit={editLivre ? handleUpdate : handleAdd}
                onCancel={() => { setShowForm(false); setEditLivre(null); }}
              />
            </div>
          )}

          {/* Barre de Recherche stylisée */}
          <div className="tw-mb-6 tw-relative tw-max-w-md">
            <span className="tw-absolute tw-left-4 tw-top-1/2 tw-transform tw-translate-y-1/2 tw-text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Rechercher par titre ou auteur..."
              className="form-control tw-pl-12 tw-py-3 tw-rounded-2xl tw-border-0 tw-shadow-sm focus:tw-ring-2 focus:tw-ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Tableau des données */}
          <div className="tw-bg-white tw-rounded-3xl tw-shadow-xl tw-overflow-hidden tw-border tw-border-slate-100">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="tw-bg-slate-50/50">
                  <tr className="tw-text-slate-500 tw-text-xs tw-uppercase tw-font-bold">
                    <th className="tw-px-6 tw-py-4 border-0">Informations Livre</th>
                    <th className="tw-py-4 border-0">Auteur</th>
                    <th className="tw-py-4 border-0 text-center">Stock</th>
                    <th className="tw-py-4 border-0 text-center">Année</th>
                    <th className="tw-px-6 tw-py-4 border-0 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" className="text-center tw-py-10 tw-text-slate-400">Chargement en cours...</td></tr>
                  ) : error ? (
                    <tr><td colSpan="5" className="text-center tw-py-10 tw-text-rose-500 font-bold">{error}</td></tr>
                  ) : filteredLivres.length > 0 ? (
                    filteredLivres.map((livre) => (
                      <tr key={livre.id_livre} className="tw-group">
                        <td className="tw-px-6 tw-py-4">
                          <div className="tw-font-bold tw-text-slate-800">{livre.titre}</div>
                          <div className="tw-text-[10px] tw-text-slate-400 tw-uppercase">Ref: {livre.id_livre}</div>
                        </td>
                        <td className="tw-text-slate-600">{livre.auteur}</td>
                        <td className="text-center">
                          <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-[10px] tw-font-bold ${
                            livre.quantite > 0 
                            ? "tw-bg-emerald-50 tw-text-emerald-600" 
                            : "tw-bg-rose-50 tw-text-rose-600"
                          }`}>
                            {livre.quantite > 0 ? `${livre.quantite} EN STOCK` : "ÉPUISÉ"}
                          </span>
                        </td>
                        <td className="text-center tw-text-slate-500 tw-text-sm">{livre.annee}</td>
                        <td className="tw-px-6 tw-text-end">
                          <button
                            onClick={() => { setEditLivre(livre); setShowForm(true); }}
                            className="btn btn-sm tw-bg-blue-50 tw-text-blue-600 tw-rounded-lg tw-mr-2 hover:tw-bg-blue-600 hover:tw-text-white tw-transition-all"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(livre.id_livre)}
                            className="btn btn-sm tw-bg-rose-50 tw-text-rose-600 tw-rounded-lg hover:tw-bg-rose-600 hover:tw-text-white tw-transition-all"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center tw-py-10 tw-text-slate-400">Aucun livre ne correspond à votre recherche.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LivresPage;
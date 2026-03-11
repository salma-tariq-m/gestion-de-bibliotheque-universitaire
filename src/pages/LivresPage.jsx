import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLivres, addLivre, updateLivre, deleteLivre } from "../redux/slices/livresSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import LivreForm from "../components/LivreForm";

const LivresPage = () => {
  const dispatch = useDispatch();
  const { livres, loading, error } = useSelector(state => state.livres);

  const [showForm, setShowForm] = useState(false);
  const [editLivre, setEditLivre] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => { dispatch(fetchLivres()); }, [dispatch]);

  const handleAdd = (livre) => { dispatch(addLivre(livre)); setShowForm(false); };
  const handleUpdate = (livre) => { dispatch(updateLivre({ id: editLivre.id, livre })); setEditLivre(null); setShowForm(false); };
  const handleDelete = (id) => { if(window.confirm("Voulez-vous vraiment supprimer ce livre ?")) dispatch(deleteLivre(id)); };

  // Filtrage dynamique
  const livresFiltres = livres.filter(l =>
    l.titre.toLowerCase().includes(search.toLowerCase()) ||
    l.auteur.toLowerCase().includes(search.toLowerCase()) ||
    l.categorie.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Liste des Livres</h2>

        <input
          type="text"
          placeholder="Rechercher par titre, auteur ou catégorie"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginBottom: "10px", width: "300px" }}
        /><br/>

        <button onClick={() => { setShowForm(true); setEditLivre(null); }}>
          {showForm ? "Fermer le formulaire" : "Ajouter un Livre"}
        </button>

        {showForm && <LivreForm initialData={editLivre || {}} onSubmit={editLivre ? handleUpdate : handleAdd} onCancel={() => { setShowForm(false); setEditLivre(null); }} />}

        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Catégorie</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {livresFiltres.map(livre => (
              <tr key={livre.id}>
                <td>{livre.titre}</td>
                <td>{livre.auteur}</td>
                <td>{livre.categorie}</td>
                <td>{livre.statut}</td>
                <td>
                  <button onClick={() => { setEditLivre(livre); setShowForm(true); }}>Modifier</button>{" "}
                  <button onClick={() => handleDelete(livre.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LivresPage;
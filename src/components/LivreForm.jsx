import React, { useState } from "react";

const LivreForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [titre, setTitre] = useState(initialData.titre || "");
  const [auteur, setAuteur] = useState(initialData.auteur || "");
  const [categorie, setCategorie] = useState(initialData.categorie || "");
  const [statut, setStatut] = useState(initialData.statut || "Disponible");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ titre, auteur, categorie, statut });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
      /><br/><br/>
      <input
        type="text"
        placeholder="Auteur"
        value={auteur}
        onChange={(e) => setAuteur(e.target.value)}
        required
      /><br/><br/>
      <input
        type="text"
        placeholder="Catégorie"
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
        required
      /><br/><br/>
      <select value={statut} onChange={(e) => setStatut(e.target.value)}>
        <option value="Disponible">Disponible</option>
        <option value="Emprunté">Emprunté</option>
      </select><br/><br/>
      <button type="submit">Enregistrer</button>{" "}
      {onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
    </form>
  );
};

export default LivreForm;
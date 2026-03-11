import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLivre } from "../redux/slices/livresSlice";

const LivreForm = ({ onCancel }) => {

  const dispatch = useDispatch();

  const [livre, setLivre] = useState({
    titre: "",
    auteur: "",
    categorie: "",
    quantite: "",
    statut: ""
  });

  const handleChange = (e) => {
    setLivre({
      ...livre,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLivre(livre));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

      <input
        type="text"
        name="titre"
        placeholder="Titre"
        value={livre.titre}
        onChange={handleChange}
        required
      /><br/><br/>

      <input
        type="text"
        name="auteur"
        placeholder="Auteur"
        value={livre.auteur}
        onChange={handleChange}
        required
      /><br/><br/>

      <input
        type="text"
        name="categorie"
        placeholder="Catégorie"
        value={livre.categorie}
        onChange={handleChange}
        required
      /><br/><br/>

      <input
        type="number"
        name="quantite"
        placeholder="Quantité"
        value={livre.quantite}
        onChange={handleChange}
        required
      /><br/><br/>

      <select
        name="statut"
        value={livre.statut}
        onChange={handleChange}
      >
        <option value="">Choisir statut</option>
        <option value="Disponible">Disponible</option>
        <option value="Emprunté">Emprunté</option>
      </select><br/><br/>

      <button type="submit">Enregistrer</button>{" "}

      {onCancel && (
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      )}

    </form>
  );
};

export default LivreForm;
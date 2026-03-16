import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLivre } from "../redux/slices/livresSlice";

const LivreForm = ({ onCancel }) => {
  const dispatch = useDispatch();

  // État initial avec des chaînes vides
  const [livre, setLivre] = useState({
    titre: "",
    auteur: "",
    quantite: "",
    annee: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivre((prev) => ({
      ...prev,
      [name]: value // On garde la valeur telle quelle (chaîne) pour l'input
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // On envoie les données en convertissant les nombres au moment du dispatch
    dispatch(addLivre({
      ...livre,
      annee: parseInt(livre.annee, 10),
      quantite: parseInt(livre.quantite, 10)
    }));

    // Réinitialisation du formulaire après envoi
    setLivre({ titre: "", auteur: "", quantite: "", annee: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Titre : </label>
        <input
          type="text"
          name="titre"
          placeholder="Titre du livre"
          value={livre.titre || ""}
          onChange={handleChange}
          required
        />
      </div>
      <br />

      <div>
        <label>Auteur : </label>
        <input
          type="text"
          name="auteur"
          placeholder="Nom de l'auteur"
          value={livre.auteur || ""}
          onChange={handleChange}
          required
        />
      </div>
      <br />

      <div>
        <label>Année : </label>
        <input
          type="number"
          name="annee"
          placeholder="Année de parution"
          value={livre.annee || ""}
          onChange={handleChange}
          required
        />
      </div>
      <br />

      <div>
        <label>Quantité : </label>
        <input
          type="number"
          name="quantite"
          placeholder="Quantité en stock"
          value={livre.quantite || ""}
          onChange={handleChange}
          required
        />
      </div>
      <br />

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
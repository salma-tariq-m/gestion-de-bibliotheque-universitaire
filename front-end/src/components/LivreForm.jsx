import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const LivreForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  const [livre, setLivre] = useState({
    titre: "",
    auteur: "",
    quantite: 0,
    annee: "",
    id_categorie: ""
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Pré-remplissage du formulaire
  useEffect(() => {
    setLivre({
      titre: initialData.titre || "",
      auteur: initialData.auteur || "",
      quantite: initialData.quantite || 0,
      annee: initialData.annee || "",
      id_categorie: initialData.id_categorie || ""
    });
  }, [initialData]);

  // Récupération des catégories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5136/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setLivre({
      ...livre,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir id_categorie en number pour la DB
    const dataToSend = { ...livre, id_categorie: Number(livre.id_categorie) };
    onSubmit(dataToSend);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData.id_Livre ? "Modifier le Livre" : "Ajouter un Livre"}
      </h2>

      <form onSubmit={handleSubmit} className="modern-form">

        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="titre"
            value={livre.titre}
            onChange={handleChange}
            placeholder="Titre du livre"
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            name="auteur"
            value={livre.auteur}
            onChange={handleChange}
            placeholder="Nom de l'auteur"
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Quantité</label>
            <input
              type="number"
              name="quantite"
              value={livre.quantite}
              onChange={handleChange}
              min="0"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Année</label>
            <input
              type="number"
              name="annee"
              value={livre.annee}
              onChange={handleChange}
              min="0"
              className="form-input"
              placeholder="Année de publication"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Catégorie</label>
          {loadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : (
            <select
              name="id_categorie"
              value={livre.id_categorie}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">--Choisir Catégorie--</option>
              {categories.map((cat) => (
                <option key={cat.id_categorie} value={cat.id_categorie}>
                  {cat.nomCategorie}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              Annuler
            </button>
          )}
          <button type="submit" className="btn-submit">
            {initialData.id_Livre ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default LivreForm;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/form.css"
const LivreForm = ({ initialData, onSubmit, onCancel }) => {
 const [formData, setFormData] = useState(
  initialData || { titre: '', auteur: '', quantite: 0, annee: 0, id_categorie: 0 }
);
  const [categories, setCategories] = useState([]);

  // Charger les catégories depuis le backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5136/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories :", err);
      }
    };
    fetchCategories();
  }, []);

  // Pré-remplir le formulaire si modification
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]:
      name === "id_categorie" || name === "quantite" || name === "annee"
        ? Number(value)
        : value
  });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData ? "📝 Modifier le livre" : "📚 Ajouter un nouveau livre"}
      </h2>

      <form onSubmit={handleSubmit} className="modern-form">
        {/* Titre occupe toute la largeur */}
        <div className="form-group full-width">
          <label>Titre du livre</label>
          <input
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex: Le Petit Prince"
            required
          />
        </div>

        {/* Auteur et Catégorie sur la même ligne */}
        <div className="form-row">
          <div className="form-group">
            <label>Auteur</label>
            <input
              name="auteur"
              value={formData.auteur}
              onChange={handleChange}
              placeholder="Nom de l'auteur"
              required
            />
          </div>
          <div className="form-group">
            <label>Catégorie</label>
            <select
              name="id_categorie"
              value={formData.id_categorie || ''}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir --</option>
              {categories.map(cat => (
                <option key={cat.id_Categorie} value={cat.id_Categorie}>
                  {cat.nomCategorie}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantité et Année sur la même ligne */}
        <div className="form-row">
          <div className="form-group">
            <label>Quantité en stock</label>
            <input
              name="quantite"
              type="number"
              value={formData.quantite}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Année de publication</label>
            <input
              name="annee"
              type="number"
              value={formData.annee}
              onChange={handleChange}
              placeholder="Ex: 2024"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="btn-submit">
            {initialData ? "Enregistrer les modifications" : "Ajouter à la bibliothèque"}
          </button>
        </div>
      </form>
    </div>
  );
};


export default LivreForm;
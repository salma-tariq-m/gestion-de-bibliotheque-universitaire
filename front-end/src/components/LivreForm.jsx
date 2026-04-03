import React, { useState, useEffect } from "react";
import axios from "axios";

const LivreForm = ({ initialData = {}, onSubmit, onCancel }) => {

  const [livre, setLivre] = useState({
    id_Livre: "",
    titre: "",
    auteur: "",
    quantite: 0,
    annee: "",
    id_Categorie: ""
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // ✅ Pre-remplissage (UPDATE)
  useEffect(() => {
    if (!initialData) return;
    setLivre({
      id_Livre: initialData?.id_Livre || "",
      titre: initialData?.titre || "",
      auteur: initialData?.auteur || "",
      quantite: initialData?.quantite || 0,
      annee: initialData?.annee || "",
      id_Categorie: initialData?.id_Categorie || ""
    });
  }, [initialData]);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5136/api/categories");
        setCategories(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
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

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...livre,
      id_Categorie: Number(livre.id_Categorie)
    };

    console.log("DATA SENT :", dataToSend); // debug

    onSubmit(dataToSend);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {livre.id_Livre ? "Modifier le Livre" : "Ajouter un Livre"}
      </h2>

      <form onSubmit={handleSubmit} className="modern-form">

        <input type="hidden" name="id_Livre" value={livre.id_Livre || ""} />

        <div className="form-group">
          <label>Titre</label>
          <input
            type="text"
            name="titre"
            value={livre.titre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Auteur</label>
          <input
            type="text"
            name="auteur"
            value={livre.auteur}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div>
            <label>Quantité</label>
            <input
              type="number"
              name="quantite"
              value={livre.quantite}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div>
            <label>Année</label>
            <input
              type="number"
              name="annee"
              value={livre.annee}
              onChange={handleChange}
            />
          </div>
        </div>

<div className="form-group">
  <label>Catégorie {livre.id_categorie}</label>

  {loadingCategories ? (
    <p>Loading...</p>
  ) : (
    <select
      name="id_Categorie"
      value={livre.id_Categorie || ""}
      onChange={handleChange}
      required
    >
      <option value="">--Choisir--</option>

      {categories.map((cat) => (
        <option
          key={cat.id_Categorie}
          value={cat.id_Categorie}
        >
          {cat.nomCategorie}
        </option>
      ))}
    </select>
  )}
</div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Annuler
            </button>
          )}

          <button type="submit">
            {livre.id_Livre ? "Update" : "Add"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default LivreForm;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addEtudiant } from "../redux/slices/etudiantSlice";

const EtudiantForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const dispatch = useDispatch();

  // State de l'étudiant
  const [etudiant, setEtudiant] = useState({
    CEF: initialData.CEF || "",
    nom: initialData.nom || "",
    prenom: initialData.prenom || "",
    email: initialData.email || "",
    fillier: initialData.fillier || ""  // correspond à la fillière choisie
  });

  // State des fillières
  const [fillier, setFillier] = useState([]);

  // Charger les fillières depuis le backend
  useEffect(() => {
    const fetchFilliers = async () => {
      try {
        const res = await axios.get("http://localhost:5136/api/fillier");
        setFillier(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des fillières :", err);
      }
    };
    fetchFilliers();
  }, []);

  // Gestion du changement des champs
  const handleChange = (e) => {
    setEtudiant({
      ...etudiant,
      [e.target.name]: e.target.value
    });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      // Si un callback onSubmit est passé (modification)
      onSubmit(etudiant);
    } else {
      // Sinon on ajoute via Redux
      dispatch(addEtudiant(etudiant));
    }

  };

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData.id_etudiant ? "Modifier l'Étudiant" : "Nouvel Étudiant"}
      </h2>

      <form onSubmit={handleSubmit} className="modern-form">

        {/* CEF */}
        <div className="form-group full-width">
          <label>CEF</label>
          <input
            type="text"
            name="CEF"
            placeholder="CEF"
            value={etudiant.CEF}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nom et Prénom */}
        <div className="form-row">
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              placeholder="Nom de famille"
              value={etudiant.nom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={etudiant.prenom}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Filliere */}
        <div className="form-group">
          <label>Filliere</label>
          <select
            name="fillier"
            value={etudiant.fillier || ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Choisir --</option>
            {fillier.map((cat) => (
              <option key={cat.id_Fillier} value={cat.id_Fillier}>
                {cat.nomFillier}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div className="form-group full-width">
          <label>Adresse E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="etudiant@universite.edu"
            value={etudiant.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Boutons */}
        <div className="form-actions">
          {onCancel && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Annuler
            </button>
          )}
          <button type="submit" className="btn-submit">
            {initialData.id_etudiant ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EtudiantForm;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addEtudiant, updateEtudiant } from "../redux/slices/etudiantSlice";

const EtudiantForm = ({ initialData = {}, onCancel }) => {
  const dispatch = useDispatch();

  const [etudiant, setEtudiant] = useState({
    cef: initialData.cef || "",
    nom: initialData.nom || "",
    prenom: initialData.prenom || "",
    email: initialData.email || "",
    id_Fillier: initialData.id_Fillier || ""
  });

  const [fillier, setFillier] = useState([]);

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

  const handleChange = (e) => {
    setEtudiant({
      ...etudiant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      cef: etudiant.cef,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
      id_Fillier: Number(etudiant.id_Fillier)
    };

    if (initialData.id_etudiant) {
      // UPDATE
      dispatch(updateEtudiant({
        id: initialData.id_etudiant,
        etudiant: dataToSend
      }));
    } else {
      // CREATE
      dispatch(addEtudiant(dataToSend));
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
            name="cef"
            placeholder="CEF"
            value={etudiant.cef}
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

        {/* Filière */}
        <div className="form-group">
          <label>Filière</label>
          <select
            name="id_Fillier"
            value={etudiant.id_Fillier || ""}
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
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
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
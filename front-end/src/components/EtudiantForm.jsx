import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEtudiant } from "../redux/slices/etudiantSlice";

const EtudiantForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const [etudiant, setEtudiant] = useState({
    CEF: initialData.CEF || "",
    nom: initialData.nom || "",
    prenom: initialData.prenom || "",
    email: initialData.email || "",
    fillier: initialData.fillier || ""
  });

  const handleChange = (e) => {
    setEtudiant({
      ...etudiant,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(etudiant);
    } else {
      dispatch(addEtudiant(etudiant));
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{initialData.id_etudiant ? "Modifier l'Étudiant" : "Nouvel Étudiant"}</h2>
      <form onSubmit={handleSubmit} className="modern-form">
                <div className="form-row">
          <div className="form-group full-width">
            <label>CEF</label>
            <input
              type="CEF"
              name="CEF"
              placeholder="CEF"
              value={etudiant.CEF}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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

        <div className="form-row">
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
        </div>
      
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
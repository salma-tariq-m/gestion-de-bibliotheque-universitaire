import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addEtudiant, updateEtudiant } from "../redux/slices/etudiantSlice";

const EtudiantForm = ({ initialData = {}, onCancel,onSubmit }) => {
  const dispatch = useDispatch();

  const [etudiant, setEtudiant] = useState({
    Cef: "",
    Nom: "",
    Prenom: "",
    Email: "",
    Id_Fillier: ""
  });

  const [fillier, setFillier] = useState([]);
  
useEffect(() => {
  if (initialData && fillier.length > 0) {
    setEtudiant({
      Cef: initialData.Cef || initialData.cef || "",
      Nom: initialData.Nom || initialData.nom || "",
      Prenom: initialData.Prenom || initialData.prenom || "",
      Email: initialData.Email || initialData.email || "",
      Id_Fillier: initialData.Id_Fillier
        ? String(initialData.Id_Fillier)
        : initialData.id_Fillier
        ? String(initialData.id_Fillier)
        : ""
    });
  }
}, [initialData, fillier]);
console.log(initialData)
useEffect(() => { 
  const fetchFilliers = async () => {
     try { const res = await axios.get("http://localhost:5136/api/fillier");
       setFillier(res.data); }
        catch (err) { console.error("Erreur lors du chargement des fillières :", err); } }; fetchFilliers(); }, [])

const handleChange = (e) => {
  const { name, value } = e.target;
  setEtudiant(prev => ({
    ...prev,
    [name]: value
  }));
};

 const handleSubmit = (e) => {
  e.preventDefault();
  const dataToSend = {
    ...etudiant,
    Id_Fillier: Number(etudiant.Id_Fillier)
  };

  if (onSubmit) {
    onSubmit(dataToSend);
  }
};

  return (
    <div className="form-container">
      <h2 className="form-title">
        {initialData.id_etudiant ? "Modifier l'Étudiant" : "Nouvel Étudiant"}
      </h2>

      <form onSubmit={handleSubmit} className="modern-form">

        <div className="form-group">
          <label className="form-label">CEF</label>
          <input
            type="text"
            name="Cef"
            value={etudiant.Cef}
            onChange={handleChange}
            placeholder="CEF"
            className="form-input"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nom</label>
            <input
              type="text"
              name="Nom"
              value={etudiant.Nom}
              onChange={handleChange}
              placeholder="Nom"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prénom</label>
            <input
              type="text"
              name="Prenom"
              value={etudiant.Prenom}
              onChange={handleChange}
              placeholder="Prénom"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Filière</label>
         <select
            name="Id_Fillier"
            value={etudiant.Id_Fillier || ""}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">--Choisir Filière--</option>
            {fillier.map(f => (
              <option key={f.id_Fillier} value={f.id_Fillier}>{f.nomFillier}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="Email"
            value={etudiant.Email}
            onChange={handleChange}
            placeholder="Email"
            className="form-input"
            required
          />
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
            {initialData.id_etudiant ? "Mettre à jour" : "Enregistrer"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EtudiantForm;
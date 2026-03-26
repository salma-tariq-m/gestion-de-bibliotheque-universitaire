import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addEtudiant, updateEtudiant } from "../redux/slices/etudiantSlice";

const EtudiantForm = ({ initialData = {}, onCancel }) => {
  const dispatch = useDispatch();

  const [etudiant, setEtudiant] = useState({
    Cef: initialData.Cef || "",
    Nom: initialData.Nom || "",
    Prenom: initialData.Prenom || "",
    Email: initialData.Email || "",
    Id_Fillier: initialData.Id_Fillier || ""
  });

  const [fillier, setFillier] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5136/api/fillier")
      .then(res => setFillier(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setEtudiant({...etudiant, [e.target.name]: e.target.value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataToSend = {
        ...etudiant,
         Id_Fillier: Number(etudiant.Id_Fillier)
        };
    if(initialData.id_etudiant){
      dispatch(updateEtudiant({id: initialData.id_etudiant, etudiant: dataToSend}));
    } else {
      dispatch(addEtudiant(dataToSend));
    }
  };

  return (
    <div className="etudiant-form-container">
      <h2 className="form-title">
        {initialData.id_etudiant ? "Modifier l'Étudiant" : "Nouvel Étudiant"}
      </h2>
      <form className="etudiant-form" onSubmit={handleSubmit}>

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

        <div className="form-group">
          <label className="form-label">Filière</label>
          <select
            name="Id_Fillier"
            value={etudiant.Id_Fillier}
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

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {initialData.id_etudiant ? "Modifier" : "Ajouter"}
          </button>
          {onCancel && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Annuler
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default EtudiantForm;
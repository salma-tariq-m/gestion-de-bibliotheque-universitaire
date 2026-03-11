import React, { useState } from "react";

const EtudiantForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [nom, setNom] = useState(initialData.nom || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [numero, setNumero] = useState(initialData.numero || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, email, numero });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      /><br/><br/>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br/><br/>
      <input
        type="text"
        placeholder="Numéro"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        required
      /><br/><br/>
      
      <button type="submit">Enregistrer</button>{" "}
      {onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
    </form>
  );
};

export default EtudiantForm;
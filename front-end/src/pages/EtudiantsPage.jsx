import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEtudiants,addEtudiant ,updateEtudiant,deleteEtudiant} from "../redux/slices/etudiantSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EtudiantForm from "../components/EtudiantForm";

const EtudiantsPage = () => {
  const dispatch = useDispatch();
  const { etudiants, loading, error } = useSelector(state => state.etudiants);

  const [showForm, setShowForm] = useState(false);
  const [editEtudiant, setEditEtudiant] = useState(null);
  const [search, setSearch] = useState("");
  const etudiantsFiltres = etudiants.filter(e =>
    e.nom.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => { dispatch(fetchEtudiants()); }, [dispatch]);

  const handleAdd = (etudiant) => {
    dispatch(addEtudiant(etudiant));
    setShowForm(false);
  };

  const handleUpdate = (etudiant) => {
    dispatch(updateEtudiant({ id: editEtudiant.id, etudiant }));
    setEditEtudiant(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      dispatch(deleteEtudiant(id));
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Gestion des Étudiants</h2>
        <input
            type="text"
            placeholder="Rechercher par nom ou email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "10px", width: "300px" }}
          /> <br />
        <button onClick={() => { setShowForm(true); setEditEtudiant(null); }}>
          {showForm ? "Fermer le formulaire" : "Ajouter un Étudiant"}
        </button>
        {showForm && (
          <EtudiantForm
            initialData={editEtudiant || {}}
            onSubmit={editEtudiant ? handleUpdate : handleAdd}
            onCancel={() => { setShowForm(false); setEditEtudiant(null); }}
          />
        )}

        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Numéro</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {etudiantsFiltres.map((etudiant) => (
              <tr key={etudiant.id}>
                <td>{etudiant.nom}</td>
                <td>{etudiant.email}</td>
                <td>{etudiant.numero}</td>
                <td>
                  <button onClick={() => { setEditEtudiant(etudiant); setShowForm(true); }}>Modifier</button>{" "}
                  <button onClick={() => handleDelete(etudiant.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EtudiantsPage;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEtudiants,addEtudiant ,updateEtudiant,deleteEtudiant} from "../redux/slices/etudiantSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EtudiantForm from "../components/EtudiantForm";
import "../css/etudiant.css"
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
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-container">
          
          <div className="page-header">
            <div>
              <h1>Gestion des Étudiants</h1>
              <p>Gérez les membres inscrits à la bibliothèque.</p>
            </div>
            <button 
              className={`btn-primary ${showForm ? 'btn-close' : ''}`} 
              onClick={() => { setShowForm(!showForm); setEditEtudiant(null); }}
            >
              {showForm ? "Fermer" : "+ Ajouter un Étudiant"}
            </button>
          </div>

          {showForm && (
            <div className="card form-card">
              <EtudiantForm
                initialData={editEtudiant || {}}
                onSubmit={editEtudiant ? handleUpdate : handleAdd}
                onCancel={() => { setShowForm(false); setEditEtudiant(null); }}
              />
            </div>
          )}

          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="card table-card">
            {loading ? (
              <div className="status-msg">Chargement des étudiants...</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Nom Complet</th>
                    <th>Email</th>
                    <th>Numéro / Tél</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {etudiantsFiltres.map((etudiant) => (
                    <tr key={etudiant.id}>
                      <td className="font-bold">{etudiant.nom}</td>
                      <td>{etudiant.email}</td>
                      <td>{etudiant.numero}</td>
                      <td className="actions-cell">
                        <button className="btn-edit" onClick={() => { setEditEtudiant(etudiant); setShowForm(true); }}>
                          Modifier
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(etudiant.id)}>
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default EtudiantsPage;
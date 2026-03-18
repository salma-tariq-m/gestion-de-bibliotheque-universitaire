import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts, validerEmprunt, refuserEmprunt, retournerEmprunt } from "../redux/slices/empruntsSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../css/emprunt.css"
const EmpruntsPage = () => {
  
  const dispatch = useDispatch();
  const { emprunts, loading, error } = useSelector(state => state.emprunts);

  const [search, setSearch] = useState("");
  const empruntsFiltres = emprunts.filter(e =>
    e.etudiantNom.toLowerCase().includes(search.toLowerCase()) ||
    e.livreTitre.toLowerCase().includes(search.toLowerCase())
    );


  useEffect(() => { dispatch(fetchEmprunts()); }, [dispatch]);

  const handleValider = (id) => { dispatch(validerEmprunt(id)); };
  const handleRefuser = (id) => { dispatch(refuserEmprunt(id)); };
  const handleRetourner = (id) => { dispatch(retournerEmprunt(id)); };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content-container">
          <div className="page-header">
            <div>
              <h1>Gestion des Emprunts</h1>
              <p>Validez les demandes et suivez les retours de livres.</p>
            </div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Rechercher un étudiant ou un livre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="card table-card">
            {loading ? (
              <div className="status-msg">Chargement des données...</div>
            ) : error ? (
              <div className="error-msg">⚠️ Erreur : {error}</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Étudiant</th>
                    <th>Livre</th>
                    <th>Date Emprunt</th>
                    <th>Date Retour</th>
                    <th>Statut</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {empruntsFiltres.map((emprunt) => (
                    <tr key={emprunt.id}>
                      <td className="font-bold">{emprunt.etudiantNom}</td>
                      <td>{emprunt.livreTitre}</td>
                      <td>{new Date(emprunt.dateEmprunt).toLocaleDateString()}</td>
                      <td>{emprunt.dateRetour ? new Date(emprunt.dateRetour).toLocaleDateString() : "-"}</td>
                      <td>
                        <span className={`status-badge ${emprunt.statut.toLowerCase().replace(/\s/g, '-')}`}>
                          {emprunt.statut}
                        </span>
                      </td>
                      <td className="actions-cell">
                        {emprunt.statut === "En attente" && (
                          <div className="btn-group">
                            <button className="btn-action btn-check" onClick={() => handleValider(emprunt.id)}>✓ Valider</button>
                            <button className="btn-action btn-cross" onClick={() => handleRefuser(emprunt.id)}>✕ Refuser</button>
                          </div>
                        )}
                        {emprunt.statut === "Emprunté" && (
                          <button className="btn-action btn-return" onClick={() => handleRetourner(emprunt.id)}>↩ Retourner</button>
                        )}
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

export default EmpruntsPage;
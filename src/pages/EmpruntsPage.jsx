import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmprunts, validerEmprunt, refuserEmprunt, retournerEmprunt } from "../redux/slices/empruntsSlice";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
    <div>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Gestion des Emprunts</h2>
        <input
            type="text"
            placeholder="Rechercher par étudiant ou livre"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "10px", width: "300px" }}
        />
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Livre</th>
              <th>Date Emprunt</th>
              <th>Date Retour</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {empruntsFiltres.map((emprunt) => (
              <tr key={emprunt.id}>
                <td>{emprunt.etudiantNom}</td>
                <td>{emprunt.livreTitre}</td>
                <td>{emprunt.dateEmprunt}</td>
                <td>{emprunt.dateRetour || "-"}</td>
                <td>{emprunt.statut}</td>
                <td>
                  {emprunt.statut === "En attente" && (
                    <>
                      <button onClick={() => handleValider(emprunt.id)}>Valider</button>{" "}
                      <button onClick={() => handleRefuser(emprunt.id)}>Refuser</button>
                    </>
                  )}
                  {emprunt.statut === "Emprunté" && (
                    <button onClick={() => handleRetourner(emprunt.id)}>Retourner</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpruntsPage;
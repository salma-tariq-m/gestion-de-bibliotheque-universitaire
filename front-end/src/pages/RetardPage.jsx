import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {
  AlertCircle,
  Loader2,
  Clock,
  CalendarX2,
  PartyPopper,
  RotateCcw
} from "lucide-react";
import "../css/blackList.css";

const RetardsPage = () => {
  const [retards, setRetards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRetards();
  }, []);

  const fetchRetards = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5136/api/retards");
      setRetards(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RETOURNER LIVRE
  const handleRetourner = async (id) => {
    try {
      await axios.put(`http://localhost:5136/api/emprunt/retourner/${id}`);
      fetchRetards(); // refresh
    } catch (err) {
      alert("Erreur lors du retour");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <main className="content-container">
          <div className="page-header">
            <div className="page-header-content">
              <div className="header-icon-box">
                <CalendarX2 className="w-6 h-6" />
              </div>
              <div>
                <h1>Retards</h1>
                <p>Liste des étudiants en retard</p>
              </div>
            </div>
          </div>

          <div className="card table-card">
            {error && (
              <div className="error-msg text-center my-4 py-8">
                <AlertCircle className="w-6 h-6 mb-2 mx-auto text-red-500" />
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            )}

            <table>
              <thead>
                <tr>
                  <th>Étudiant</th>
                  <th>CEF</th>
                  <th>Livre</th>
                  <th>Date Retour Prévue</th>
                  <th>Jours Retard</th>
                </tr>
              </thead>

              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <Loader2 className="loading-spinner" />
                      <p>Chargement...</p>
                    </td>
                  </tr>
                </tbody>
              ) : retards.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="empty-state">
                      <PartyPopper className="empty-icon w-12 h-12" />
                      <p className="empty-title">Aucun retard 🎉</p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {retards.map((r) => (
                    <tr key={r.id_Emprunt}>
                      <td>{r.etudiantNom}</td>
                      <td>{r.etudiantCef}</td>
                      <td>{r.livreTitre}</td>

                      <td>
                        {new Date(r.dateRetourPrevue).toLocaleDateString()}
                      </td>

                      <td>
                        <span className="alert-badge">
                          <Clock className="w-3 h-3" />
                          {r.joursRetard} jours
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RetardsPage;
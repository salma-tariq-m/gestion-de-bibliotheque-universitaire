import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { BookOpen, AlertCircle, Loader2 } from "lucide-react";
import { createEmprunt } from "../redux/slices/empruntsSlice";
import "../css/form.css";

const CreateEmprunt = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    EtudiantCEF: "",
    LivreTitre: "",
    DateEmprunt: "",
    DateRetourPrevue: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);

    if (!form.EtudiantCEF || !form.LivreTitre || !form.DateEmprunt || !form.DateRetourPrevue) {
      setMessage({ type: "error", text: "Tous les champs sont obligatoires" });
      return;
    }

    try {
      setLoading(true);

      await dispatch(createEmprunt({
        EtudiantCEF: form.EtudiantCEF.toString(),
        LivreTitre: form.LivreTitre,
        DateEmprunt: form.DateEmprunt,
        DateRetourPrevue: form.DateRetourPrevue
      })).unwrap();

      setMessage({ type: "success", text: "Emprunt créé avec succès !" });
      setForm({ EtudiantCEF: "", LivreTitre: "", DateEmprunt: "", DateRetourPrevue: "" });

      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: err || "Erreur serveur" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="card form-card shadow-lg mb-6 border border-blue-500/20"
      initial={{ opacity: 0, height: 0, scale: 0.98 }}
      animate={{ opacity: 1, height: "auto", scale: 1 }}
      exit={{ opacity: 0, height: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: 'hidden' }}
    >
      <div className="form-container">
        <h2 className="form-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen className="w-6 h-6 text-blue-500" /> Créer un emprunt
        </h2>

        {message && (
          <div className={`mb-4 p-4 rounded-xl flex items-center ${message.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}>
            <AlertCircle className="inline mr-2 w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="modern-form">
          <div className="form-row">
            <div className="form-group">
              <label>CEF Étudiant</label>
              <input
                type="number"
                name="EtudiantCEF"
                value={form.EtudiantCEF}
                onChange={handleChange}
                placeholder="Ex: 123456"
                required
              />
            </div>

            <div className="form-group">
              <label>Titre du livre</label>
              <input
                type="text"
                name="LivreTitre"
                value={form.LivreTitre}
                onChange={handleChange}
                placeholder="Ex: React Guide"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date d'emprunt</label>
              <input
                type="date"
                name="DateEmprunt"
                value={form.DateEmprunt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date retour prévue</label>
              <input
                type="date"
                name="DateRetourPrevue"
                value={form.DateRetourPrevue}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: '12px', paddingTop: '20px' }}>
            <button
              type="submit"
              className="btn-submit w-full"
              style={{ padding: '14px 24px', fontSize: '1rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="loading-spinner inline mr-2 w-5 h-5" style={{ margin: 0, marginRight: '8px', color: 'white' }} />
                  Création en cours...
                </>
              ) : (
                "Valider l'emprunt"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateEmprunt;
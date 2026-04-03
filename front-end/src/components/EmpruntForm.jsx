import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEmprunt } from "../redux/slices/empruntsSlice";
import { motion } from "framer-motion";
import { BookOpen, AlertCircle, Loader2, User, Book, FileText, X } from "lucide-react";
import "../css/form.css";

const CreateEmprunt = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    etudiantCef: "",
    livreTitre: "",
    observation: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateReturnDate = (startDate, daysToAdd) => {
    let currentDate = new Date(startDate);
    let addedDays = 0;
    while (addedDays < daysToAdd) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }
    return currentDate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.etudiantCef || !form.livreTitre) {
      setMessage({ type: "error", text: "Le CEF et le titre du livre sont obligatoires" });
      return;
    }

    try {
      setLoading(true);

      const dateEmprunt = new Date();
      const dateRetourPrevue = calculateReturnDate(dateEmprunt, 2);

      await dispatch(createEmprunt({
        EtudiantCef: form.etudiantCef,
        LivreTitre: form.livreTitre.trim(),
        DateEmprunt: dateEmprunt.toISOString(),
        DateRetourPrevue: dateRetourPrevue.toISOString(),
        Observation: form.observation
      })).unwrap();

      setMessage({ type: "success", text: "Emprunt créé avec succès !" });

      setForm({
        etudiantCef: "",
        livreTitre: "",
        observation: ""
      });

      if (onSuccess) onSuccess();

    } catch (err) {
      setMessage({
        type: "error",
        text: err || "Erreur serveur"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="card form-card shadow-lg mb-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-between items-center border-b pb-4 mb-6 border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
          <BookOpen className="text-indigo-600" /> Nouvel Emprunt
        </h2>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800"
            title="Fermer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {message && (
        <div className={`form-alert ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'} p-4 rounded-xl border flex items-center gap-3 mb-6 font-medium`}>
          <AlertCircle size={18} /> {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-grid">
          <div className="form-group">
            <label>CEF Étudiant</label>
            <div className="input-with-icon">
              <User className="input-icon-sm" size={18} />
              <input
                type="number"
                name="etudiantCef"
                value={form.etudiantCef}
                onChange={handleChange}
                placeholder="Ex: 854619"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Titre du livre</label>
            <div className="input-with-icon">
              <Book className="input-icon-sm" size={18} />
              <input
                type="text"
                name="livreTitre"
                value={form.livreTitre}
                onChange={handleChange}
                placeholder="Nom complet du livre"
              />
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label>Observation (État avant emprunt)</label>
            <div className="input-with-icon">
              <FileText className="input-icon-sm" size={18} />
              <input
                type="text"
                name="observation"
                value={form.observation}
                onChange={handleChange}
                placeholder="Ex: Bon état, couverture abîmée..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions mt-6 pt-6 border-t border-slate-100 flex justify-end gap-3">
          {onCancel && (
            <button 
              type="button" 
              className="btn-cancel px-5 py-2.5 rounded-xl border font-medium text-slate-600 hover:bg-slate-50 transition" 
              onClick={onCancel}
            >
              Annuler
            </button>
          )}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-submit px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-200 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <span>Créer l'emprunt</span>}
          </button>
        </div>

      </form>
    </motion.div>
  );
};

export default CreateEmprunt;
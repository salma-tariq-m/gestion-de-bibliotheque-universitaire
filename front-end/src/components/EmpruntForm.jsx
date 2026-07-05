import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createEmprunt } from "../redux/slices/empruntsSlice";
import { motion } from "framer-motion";
import {
  BookOpen,
  AlertCircle,
  Loader2,
  User,
  Book,
  FileText,
  X
} from "lucide-react";
import "../css/form.css";

const CreateEmprunt = ({ onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    etudiantCef: "",
    livreTitre: "",
    etatAvantEmprunt: "Bon",
    observation: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Ignore samedi et dimanche
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

    if (!form.etudiantCef.trim() || !form.livreTitre.trim()) {
      setMessage({
        type: "error",
        text: "Le CEF et le titre du livre sont obligatoires."
      });
      return;
    }

    try {
      setLoading(true);

      const dateRetourPrevue = calculateReturnDate(new Date(), 2);

      await dispatch(
        createEmprunt({
          EtudiantCEF: form.etudiantCef.trim(),
          LivreTitre: form.livreTitre.trim(),
          DateRetourPrevue: dateRetourPrevue.toISOString(),
          EtatAvantEmprunt: form.etatAvantEmprunt,
          Observation: form.observation.trim()
        })
      ).unwrap();

      setMessage({
        type: "success",
        text: "Emprunt créé avec succès."
      });

      setForm({
        etudiantCef: "",
        livreTitre: "",
        etatAvantEmprunt: "Bon",
        observation: ""
      });

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      setMessage({
        type: "error",
        text: err || "Erreur serveur."
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
          <BookOpen className="text-indigo-600" />
          Nouvel Emprunt
        </h2>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}

      </div>

      {message && (

        <div
          className={`p-4 rounded-xl border mb-6 flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          <AlertCircle size={18} />
          {message.text}
        </div>

      )}

      <form onSubmit={handleSubmit} className="modern-form">

        <div className="form-grid">

          <div className="form-group">

            <label>CEF Étudiant</label>

            <div className="input-with-icon">
              <User className="input-icon-sm" size={18} />

              <input
                type="text"
                name="etudiantCef"
                value={form.etudiantCef}
                onChange={handleChange}
                placeholder="Ex : 854619"
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
                placeholder="Nom du livre"
              />

            </div>

          </div>

        </div>

        <div className="form-grid">

          <div className="form-group">

            <label>État du livre avant emprunt</label>

            <select
              name="etatAvantEmprunt"
              value={form.etatAvantEmprunt}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Bon">Bon</option>
              <option value="Moyen">Moyen</option>
              <option value="Mauvais">Mauvais</option>
            </select>

          </div>

        </div>

        <div className="form-grid">

          <div
            className="form-group"
            style={{ gridColumn: "span 2" }}
          >

            <label>Observation</label>

            <div className="input-with-icon">

              <FileText className="input-icon-sm" size={18} />

              <input
                type="text"
                name="observation"
                value={form.observation}
                onChange={handleChange}
                placeholder="Ex : Couverture légèrement abîmée"
              />

            </div>

          </div>

        </div>

        <div className="form-actions mt-6 pt-6 border-t border-slate-100 flex justify-end gap-3">

          {onCancel && (

            <button
              type="button"
              onClick={onCancel}
              className="btn-cancel px-5 py-2.5 rounded-xl border"
            >
              Annuler
            </button>

          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-submit px-6 py-2.5 rounded-xl bg-indigo-600 text-white flex items-center gap-2"
          >

            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Créer l'emprunt"
            )}

          </button>

        </div>

      </form>

    </motion.div>
  );
};

export default CreateEmprunt;
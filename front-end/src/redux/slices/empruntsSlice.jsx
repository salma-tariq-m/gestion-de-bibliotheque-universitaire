import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/emprunt";

// 🔹 Récupérer tous les emprunts
export const fetchEmprunts = createAsyncThunk(
  "emprunts/fetchEmprunts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.map(e => ({
        id: e.id_Emprunt,
        etudiantNom: e.etudiant.nom,
        livreTitre: e.livre.titre,
        dateEmprunt: e.date_Emprunt,
        dateRetour: e.dateRetourReelle,
        statut: e.dateRetourReelle ? "Retourné" : "En attente"
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur réseau");
    }
  }
);

// 🔹 Valider un emprunt
export const validerEmprunt = createAsyncThunk(
  "emprunts/validerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur réseau");
    }
  }
);

// 🔹 Retourner un emprunt
export const retournerEmprunt = createAsyncThunk(
  "emprunts/retournerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur réseau");
    }
  }
);

const empruntsSlice = createSlice({
  name: "emprunts",
  initialState: { emprunts: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmprunts.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchEmprunts.fulfilled, (state, action) => { state.loading = false; state.emprunts = action.payload; })
      .addCase(fetchEmprunts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(validerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload);
        if (emprunt) emprunt.statut = "Emprunté";
      })
      .addCase(retournerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload);
        if (emprunt) {
          emprunt.statut = "Retourné";
          emprunt.dateRetour = new Date().toISOString();
        }
      });
  }
});

export default empruntsSlice.reducer;
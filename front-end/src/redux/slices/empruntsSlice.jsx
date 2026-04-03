import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/emprunt";

const mapEmprunt = (e) => ({
  id: e.id_Emprunt,
  etudiantNom: e.etudiantNom,
  etudiantPrenom: e.etudiantPrenom,
  etudiantCef: e.etudiantCef,
  livreTitre: e.livreTitre,
  dateEmprunt: e.dateEmprunt,
  dateRetourPrevue: e.dateRetourPrevue,
  dateRetourReelle: e.dateRetourReelle,
  statut: e.statut || e.Statut || "En attente"
});

export const fetchEmprunts = createAsyncThunk(
  "emprunts/fetchEmprunts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.map(mapEmprunt); 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur serveur"
      );
    }
  }
);
export const annulerEmprunt = createAsyncThunk(
  "emprunts/annulerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/annuler/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur annulation");
    }
  }
);
export const createEmprunt = createAsyncThunk(
  "emprunts/createEmprunt",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, data);
      return mapEmprunt(res.data); 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur serveur"
      );
    }
  }
);

export const validerEmprunt = createAsyncThunk(
  "emprunts/validerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/valider/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ||"Erreur validation");
    }
  }
);

export const retournerEmprunt = createAsyncThunk(
  "emprunts/retournerEmprunt",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/retourner/${id}`, data);
      return { id, data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ||"Erreur retour");
    }
  }
);

const empruntsSlice = createSlice({
  name: "emprunts",
  initialState: {
    emprunts: [],
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEmprunts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmprunts.fulfilled, (state, action) => {
        state.loading = false;
        state.emprunts = action.payload;
      })
      .addCase(fetchEmprunts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEmprunt.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmprunt.fulfilled, (state, action) => {
        state.loading = false;
        state.emprunts.unshift(action.payload); // add first
      })
      .addCase(createEmprunt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload);
        if (emprunt) {
          emprunt.statut = "Emprunté";
        }
      })
      .addCase(retournerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload.id);
        if (emprunt) {
          emprunt.statut = action.payload.data.etatFinal === "perdu" ? "Perdu" : "Retourné";
          emprunt.dateRetourReelle = action.payload.data.dateRetourReelle;
        }
      })
      .addCase(annulerEmprunt.fulfilled, (state, action) => {
      const emprunt = state.emprunts.find(e => e.id === action.payload);
      if (emprunt) {
        emprunt.statut = "Annulé";
      }
});

  }
});

export default empruntsSlice.reducer;
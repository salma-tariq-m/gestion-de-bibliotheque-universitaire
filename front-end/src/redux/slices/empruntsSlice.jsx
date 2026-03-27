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


// ============================
// 🔹 CREATE
// ============================
export const createEmprunt = createAsyncThunk(
  "emprunts/createEmprunt",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, data);
      return mapEmprunt(res.data); // ✅ mapping
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur serveur"
      );
    }
  }
);


// ============================
// 🔹 VALIDER (optionnel)
// ============================
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


// ============================
// 🔹 RETOURNER (optionnel)
// ============================
export const retournerEmprunt = createAsyncThunk(
  "emprunts/retournerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`${API_URL}/retourner/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message ||"Erreur retour");
    }
  }
);


// ============================
// 🧠 SLICE
// ============================
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

      // 🔄 FETCH
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


      // ➕ CREATE
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


      // ✅ VALIDER
      .addCase(validerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload);
        if (emprunt) {
          emprunt.statut = "Emprunté";
        }
      })


      // 🔁 RETOURNER
      .addCase(retournerEmprunt.fulfilled, (state, action) => {
        const emprunt = state.emprunts.find(e => e.id === action.payload);
        if (emprunt) {
          emprunt.statut = "Retourné";
          emprunt.dateRetourReelle = new Date().toISOString();
        }
      });

  }
});

export default empruntsSlice.reducer;
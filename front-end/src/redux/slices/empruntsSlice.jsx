import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/emprunt";

const mapEmprunt = (e) => ({
  id: e.id_Emprunt,
  etudiantCEF: e.etudiantCEF,
  livreTitre: e.livreTitre,
  dateEmprunt: e.dateEmprunt,
  dateRetourPrevue: e.dateRetourPrevue,
  dateRetourReelle: e.dateRetourReelle,
  etatAvantEmprunt: e.etatAvantEmprunt,
  etatAuRetour: e.etatAuRetour,
  observation: e.observation,
  statut: e.statut
});

// ====================
// GET
// ====================

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

// ====================
// CREATE
// ====================

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

// ====================
// RETOUR
// ====================

export const retournerEmprunt = createAsyncThunk(
  "emprunts/retournerEmprunt",
  async ({ id, etatAuRetour }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/retourner/${id}`,
        {
          etatAuRetour
        }
      );

      return mapEmprunt(res.data);

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur retour"
      );
    }
  }
);

// ====================
// ANNULER
// ====================

export const annulerEmprunt = createAsyncThunk(
  "emprunts/annulerEmprunt",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/annuler/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Erreur annulation"
      );
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

      // GET
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

      // CREATE
      .addCase(createEmprunt.fulfilled, (state, action) => {
        state.emprunts.unshift(action.payload);
      })

      .addCase(createEmprunt.rejected, (state, action) => {
        state.error = action.payload;
      })

      // RETOUR
      .addCase(retournerEmprunt.fulfilled, (state, action) => {

        const index = state.emprunts.findIndex(
          e => e.id === action.payload.id
        );

        if (index !== -1) {
          state.emprunts[index] = action.payload;
        }

      })

      // ANNULATION
      .addCase(annulerEmprunt.fulfilled, (state, action) => {

        const emprunt = state.emprunts.find(
          e => e.id === action.payload
        );

        if (emprunt) {
          emprunt.statut = "Annulé";
        }

      });

  }

});

export default empruntsSlice.reducer;
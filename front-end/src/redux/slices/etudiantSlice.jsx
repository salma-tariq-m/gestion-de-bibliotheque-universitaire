import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/etudiant";

// 🔹 Mapper les données pour le store
const mapEtudiant = (e) => ({
  id: e.id_etudiant,
  nom: e.nom,
  prenom: e.prenom,
  cef: e.cef,
  email: e.email,
  Id_Fillier: e.id_Fillier || e.filiere?.id_Fillier || ""
});

// 🔹 Thunks

export const fetchEtudiants = createAsyncThunk(
  "etudiants/fetchEtudiants",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.map(mapEtudiant);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur serveur");
    }
  }
);

export const addEtudiant = createAsyncThunk(
  "etudiants/addEtudiant",
  async (etudiant, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, etudiant);
      return mapEtudiant(res.data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur ajout");
    }
  }
);

export const updateEtudiant = createAsyncThunk(
  "etudiants/updateEtudiant",
  async ({ id, etudiant }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, etudiant);
      return mapEtudiant(res.data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur update");
    }
  }
);

export const deleteEtudiant = createAsyncThunk(
  "etudiants/deleteEtudiant",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Erreur suppression");
    }
  }
);

// 🔹 Slice

const etudiantsSlice = createSlice({
  name: "etudiants",
  initialState: {
    etudiants: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEtudiants.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEtudiants.fulfilled, (state, action) => { state.loading = false; state.etudiants = action.payload; })
      .addCase(fetchEtudiants.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // ADD
      .addCase(addEtudiant.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addEtudiant.fulfilled, (state, action) => { state.loading = false; state.etudiants.push(action.payload); })
      .addCase(addEtudiant.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // UPDATE
      .addCase(updateEtudiant.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateEtudiant.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.etudiants.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.etudiants[index] = action.payload;
      })
      .addCase(updateEtudiant.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DELETE
      .addCase(deleteEtudiant.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteEtudiant.fulfilled, (state, action) => {
        state.loading = false;
        state.etudiants = state.etudiants.filter(e => e.id !== action.payload);
      })
      .addCase(deleteEtudiant.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default etudiantsSlice.reducer;
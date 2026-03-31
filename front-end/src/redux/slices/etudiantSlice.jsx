import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/etudiant";

// 🔹 MAPPER
const mapEtudiant = (e) => ({
  id: e.id_etudiant,  
  nom: e.nom,
  prenom: e.prenom,
  cef: e.cef,
  email:e.email
});
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
      .addCase(fetchEtudiants.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEtudiants.fulfilled, (state, action) => { state.loading = false; state.etudiants = action.payload; })
      .addCase(fetchEtudiants.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(addEtudiant.fulfilled, (state, action) => { state.etudiants.push(action.payload); })

      .addCase(updateEtudiant.fulfilled, (state, action) => {
        const index = state.etudiants.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.etudiants[index] = action.payload;
      })

      .addCase(deleteEtudiant.fulfilled, (state, action) => {
        state.etudiants = state.etudiants.filter(e => e.id !== action.payload);
      });
  },
});

export default etudiantsSlice.reducer;
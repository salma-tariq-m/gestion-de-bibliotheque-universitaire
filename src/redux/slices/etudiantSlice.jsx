import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/etudiants";

// Récupérer tous les étudiants
export const fetchEtudiants = createAsyncThunk("etudiants/fetchEtudiants", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Ajouter un étudiant
export const addEtudiant = createAsyncThunk("etudiants/addEtudiant", async (etudiant) => {
  const res = await axios.post(API_URL, etudiant);
  return res.data;
});

// Modifier un étudiant
export const updateEtudiant = createAsyncThunk(
  "etudiants/updateEtudiant",
  async ({ id, etudiant }) => {
    const res = await axios.put(`${API_URL}/${id}`, etudiant);
    return res.data;
  }
);

// Supprimer un étudiant
export const deleteEtudiant = createAsyncThunk("etudiants/deleteEtudiant", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const etudiantsSlice = createSlice({
  name: "etudiants",
  initialState: { etudiants: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEtudiants.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEtudiants.fulfilled, (state, action) => { state.loading = false; state.etudiants = action.payload; })
      .addCase(fetchEtudiants.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
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
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/students";

// 🔹 Mapper les données pour le store
const mapEtudiant = (e) => ({
  id: e.id,
  nom: e.nom,
  prenom: e.prenom,
  cef: e.cef,
  email: e.email,
  fillier: e.filiere,
  telephone:e.telephone
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
  },
});

export default etudiantsSlice.reducer;
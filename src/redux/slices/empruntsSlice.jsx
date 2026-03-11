import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/emprunts";

// Récupérer tous les emprunts
export const fetchEmprunts = createAsyncThunk("emprunts/fetchEmprunts", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Valider un emprunt
export const validerEmprunt = createAsyncThunk("emprunts/validerEmprunt", async (id) => {
  const res = await axios.put(`${API_URL}/${id}/valider`);
  return res.data;
});

// Refuser un emprunt
export const refuserEmprunt = createAsyncThunk("emprunts/refuserEmprunt", async (id) => {
  const res = await axios.put(`${API_URL}/${id}/refuser`);
  return res.data;
});

// Marquer un emprunt comme retourné
export const retournerEmprunt = createAsyncThunk("emprunts/retournerEmprunt", async (id) => {
  const res = await axios.put(`${API_URL}/${id}/retourner`);
  return res.data;
});

const empruntsSlice = createSlice({
  name: "emprunts",
  initialState: { emprunts: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmprunts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchEmprunts.fulfilled, (state, action) => { state.loading = false; state.emprunts = action.payload; })
      .addCase(fetchEmprunts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(validerEmprunt.fulfilled, (state, action) => {
        const index = state.emprunts.findIndex(e => e.id === action.payload.id);
        if(index !== -1) state.emprunts[index] = action.payload;
      })
      .addCase(refuserEmprunt.fulfilled, (state, action) => {
        const index = state.emprunts.findIndex(e => e.id === action.payload.id);
        if(index !== -1) state.emprunts[index] = action.payload;
      })
      .addCase(retournerEmprunt.fulfilled, (state, action) => {
        const index = state.emprunts.findIndex(e => e.id === action.payload.id);
        if(index !== -1) state.emprunts[index] = action.payload;
      });
  },
});

export default empruntsSlice.reducer;
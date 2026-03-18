import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/livres";

// Récupérer tous les livres
export const fetchLivres = createAsyncThunk("livres/fetchLivres", async () => {
  
  const response = await axios.get(API_URL);
  return response.data;
});

// Ajouter un livre
export const addLivre = createAsyncThunk("livres/addLivre", async (livre) => {
  const response = await axios.post(API_URL, livre);
  return response.data;
});

// Modifier un livre

export const updateLivre = createAsyncThunk(
  "livres/updateLivre",
  async ({ id, livre }) => {
    const response = await axios.put(`${API_URL}/${id}`, livre);
    return response.data;
  }
);
// Supprimer un livre
export const deleteLivre = createAsyncThunk("livres/deleteLivre", async (id) => {
  const url = `${API_URL}/${id}`;
  console.log("Appel API DELETE sur :", url); // Vérifiez ce log dans F12
  await axios.delete(url);
  return id;
});

const livresSlice = createSlice({
  name: "livres",
  initialState: { livres: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchLivres
      .addCase(fetchLivres.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchLivres.fulfilled, (state, action) => { state.loading = false; state.livres = action.payload; })
      .addCase(fetchLivres.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // addLivre
      .addCase(addLivre.fulfilled, (state, action) => { state.livres.push(action.payload); })

      // updateLivre
      .addCase(updateLivre.fulfilled, (state, action) => {
      const index = state.livres.findIndex(l => l.id_Livre === action.payload.id_Livre);
      if (index !== -1) state.livres[index] = action.payload;})
      
      // deleteLivre
      .addCase(deleteLivre.fulfilled, (state, action) => {
        state.livres = state.livres.filter(l => l.id !== action.payload);
      });
  },
});

export default livresSlice.reducer;
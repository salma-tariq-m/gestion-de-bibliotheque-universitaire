import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5136/api/etudiants";

// GET
export const fetchEtudiants = createAsyncThunk(
  "etudiants/fetchEtudiants",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

// ADD
export const addEtudiant = createAsyncThunk(
  "etudiants/addEtudiant",
  async (etudiant) => {
    const res = await axios.post(API_URL, etudiant);
    return res.data;
  }
);

// UPDATE
export const updateEtudiant = createAsyncThunk(
  "etudiants/updateEtudiant",
  async ({ id, etudiant }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, etudiant);
      return res.data;
    } catch (err) {
      console.log(err.response?.data);
      return rejectWithValue(err.response?.data || "Erreur");
    }
  }
);

// DELETE
export const deleteEtudiant = createAsyncThunk(
  "etudiants/deleteEtudiant",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
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

      // GET
      .addCase(fetchEtudiants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEtudiants.fulfilled, (state, action) => {
        state.loading = false;
        state.etudiants = action.payload;
      })
      .addCase(fetchEtudiants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addEtudiant.fulfilled, (state, action) => {
        state.etudiants.push(action.payload);
      })

      // UPDATE
      .addCase(updateEtudiant.fulfilled, (state, action) => {
        const index = state.etudiants.findIndex(
          (e) => e.id_etudiant === action.payload.id_etudiant
        );
        if (index !== -1) {
          state.etudiants[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteEtudiant.fulfilled, (state, action) => {
        state.etudiants = state.etudiants.filter(
          (e) => e.id_etudiant !== action.payload
        );
      });
  },
});

export default etudiantsSlice.reducer;
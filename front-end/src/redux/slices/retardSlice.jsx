// retardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRetards = createAsyncThunk(
  "retards/fetchRetards",
  async () => {
    const res = await axios.get("http://localhost:5136/api/retards");
    return res.data;
  }
);

const retardSlice = createSlice({
  name: "retards",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRetards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRetards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default retardSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import livresReducer from "./slices/livresSlice";
import etudiantsReducer from "./slices/etudiantSlice";
import empruntsReducer from "./slices/empruntsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    livres: livresReducer,
    etudiants: etudiantsReducer,
    emprunts: empruntsReducer,
  },
});
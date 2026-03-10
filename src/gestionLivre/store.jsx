import { legacy_createStore } from "redux";
import reducerLivre from "./reducer";
const store = legacy_createStore(reducerLivre);
export default store;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productsReducer from "../redux/productsSlice";
import quotesReducer from "../redux/quotesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    quotes: quotesReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";
import quotesReducer from "../redux/quotesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    quotes: quotesReducer,
  },
});

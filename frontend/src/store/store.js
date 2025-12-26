import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import productsReducer from "../redux/productsSlice";
import quotesReducer from "../redux/quotesSlice";
import customersReducer from "../redux/customersSlice";
import suppliersReducer from "../redux/suppliersSlice";
import companyReducer from "../redux/companySlice";
import companyRegisterReducer from "../redux/companyRegisterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    quotes: quotesReducer,
    customers: customersReducer,
    suppliers: suppliersReducer,
    company: companyReducer,
    companyRegister: companyRegisterReducer,
  },
});

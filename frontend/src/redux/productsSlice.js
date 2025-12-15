import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const json = await apiGet("/products");
    return json.data ?? [];
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (payload) => {
    const json = await apiPost("/products", payload);
    return json.data; // { id }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    createStatus: "idle",
    createError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load products";
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error?.message || "Failed to create product";
      });
  },
});

export default productsSlice.reducer;

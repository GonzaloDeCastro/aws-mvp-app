import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const json = await apiGet("/products");
    return json.data ?? [];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: "",
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
      });
  },
});

export default productsSlice.reducer;

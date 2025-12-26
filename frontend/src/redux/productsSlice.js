import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const json = await apiGet("/products");
    return json.data ?? [];
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const json = await apiGet(`/products/${id}`);
    return json.data;
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const json = await apiGet("/categories");
    return json.data ?? [];
  }
);

export const fetchTaxes = createAsyncThunk("products/fetchTaxes", async () => {
  const json = await apiGet("/taxes");
  return json.data ?? [];
});

export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (payload) => {
    const json = await apiPost("/categories", payload);
    return json.data; // { id }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (payload) => {
    const json = await apiPost("/products", payload);
    return json.data; // { id }
  }
);

export const createProductsBatch = createAsyncThunk(
  "products/createProductsBatch",
  async (payload) => {
    const json = await apiPost("/products/batch", payload);
    return json.data; // { ids, count }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...payload }) => {
    const json = await apiPut(`/products/${id}`, payload);
    return json.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await apiDelete(`/products/${id}`);
    return id;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    currentProduct: null,
    categories: [],
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    createStatus: "idle",
    createError: "",
    updateStatus: "idle",
    updateError: "",
    categoriesStatus: "idle",
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = "";
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = "";
    },
  },
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
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      })
      .addCase(fetchTaxes.pending, (state) => {
        state.taxesStatus = "loading";
      })
      .addCase(fetchTaxes.fulfilled, (state, action) => {
        state.taxesStatus = "succeeded";
        state.taxes = action.payload;
      })
      .addCase(fetchTaxes.rejected, (state) => {
        state.taxesStatus = "failed";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        // Recargar categorías después de crear una nueva
        // Esto se manejará en el componente llamando fetchCategories
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
      })
      .addCase(createProductsBatch.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(createProductsBatch.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createProductsBatch.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError = action.error?.message || "Failed to import products";
      })
      .addCase(updateProduct.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = "";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.error?.message || "Failed to update product";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearCurrentProduct, resetCreateStatus, resetUpdateStatus } =
  productsSlice.actions;

export default productsSlice.reducer;

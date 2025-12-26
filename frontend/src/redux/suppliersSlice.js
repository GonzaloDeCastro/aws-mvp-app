import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async () => {
    const json = await apiGet("/suppliers");
    return json.data; // array
  }
);

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (payload) => {
    const json = await apiPost("/suppliers", payload);
    return json.data; // { id }
  }
);

export const fetchSupplierById = createAsyncThunk(
  "suppliers/fetchById",
  async (id) => {
    const json = await apiGet(`/suppliers/${id}`);
    return json.data;
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, ...payload }) => {
    await apiPut(`/suppliers/${id}`, payload);
    return { id, ...payload };
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id) => {
    await apiDelete(`/suppliers/${id}`);
    return id;
  }
);

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: {
    items: [],
    status: "idle",
    error: "",
    createStatus: "idle",
    createError: "",
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load suppliers";
      })
      // create
      .addCase(createSupplier.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.createStatus = "succeeded";
        // no tenemos el supplier completo, solo id. Refetch para mantener simple.
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError =
          action.error?.message || "Failed to create supplier";
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        const supplier = action.payload;
        const index = state.items.findIndex((s) => s.id === supplier.id);
        if (index >= 0) {
          state.items[index] = supplier;
        } else {
          state.items.push(supplier);
        }
      })
      .addCase(updateSupplier.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        const updated = action.payload;
        const index = state.items.findIndex((s) => s.id === updated.id);
        if (index >= 0) {
          state.items[index] = { ...state.items[index], ...updated };
        }
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError =
          action.error?.message || "Failed to update supplier";
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s.id !== action.payload);
      });
  },
});

export const { resetCreateStatus } = suppliersSlice.actions;

export default suppliersSlice.reducer;


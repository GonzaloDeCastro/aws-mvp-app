import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiDelete } from "../api";

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const json = await apiGet("/customers");
    return json.data; // array
  }
);

export const createCustomer = createAsyncThunk(
  "customers/createCustomer",
  async (payload) => {
    const json = await apiPost("/customers", payload);
    return json.data; // { id }
  }
);

export const deleteCustomer = createAsyncThunk(
  "customers/deleteCustomer",
  async (id) => {
    await apiDelete(`/customers/${id}`);
    return id;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    items: [],
    status: "idle",
    error: "",
    createStatus: "idle",
    createError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // list
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load customers";
      })
      // create
      .addCase(createCustomer.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.createStatus = "succeeded";
        // no tenemos el customer completo, solo id. Refetch para mantener simple.
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError =
          action.error?.message || "Failed to create customer";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default customersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

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

export const fetchCustomerById = createAsyncThunk(
  "customers/fetchById",
  async (id) => {
    const json = await apiGet(`/customers/${id}`);
    return json.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customers/updateCustomer",
  async ({ id, ...payload }) => {
    await apiPut(`/customers/${id}`, payload);
    return { id, ...payload };
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
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        const customer = action.payload;
        const index = state.items.findIndex((c) => c.id === customer.id);
        if (index >= 0) {
          state.items[index] = customer;
        } else {
          state.items.push(customer);
        }
      })
      .addCase(updateCustomer.pending, (state) => {
        state.createStatus = "loading";
        state.createError = "";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        const updated = action.payload;
        const index = state.items.findIndex((c) => c.id === updated.id);
        if (index >= 0) {
          state.items[index] = { ...state.items[index], ...updated };
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.createStatus = "failed";
        state.createError =
          action.error?.message || "Failed to update customer";
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
      });
  },
});

export default customersSlice.reducer;

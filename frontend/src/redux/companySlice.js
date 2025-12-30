import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPut } from "../api";

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
    const json = await apiGet("/company/me");
    return json.data;
  }
);

export const updateDollarRate = createAsyncThunk(
  "company/updateDollarRate",
  async (dollarRate) => {
    const json = await apiPut("/company/dollar-rate", { dollarRate });
    return json.data;
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (companyData) => {
    const json = await apiPut("/company/update", companyData);
    return json.data;
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    current: null,
    status: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to load company";
      })
      .addCase(updateDollarRate.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});

export default companySlice.reducer;

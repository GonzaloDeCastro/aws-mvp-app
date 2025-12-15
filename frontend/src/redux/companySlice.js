import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api";

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
    const json = await apiGet("/company/me");
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
      });
  },
});

export default companySlice.reducer;

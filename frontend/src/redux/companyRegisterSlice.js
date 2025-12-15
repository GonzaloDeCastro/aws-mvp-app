import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPost } from "../api";

export const registerCompany = createAsyncThunk(
  "companyRegister/register",
  async (data) => {
    const response = await apiPost("/company/register", data);
    return response.data;
  }
);

const companyRegisterSlice = createSlice({
  name: "companyRegister",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: "",
  },
  reducers: {
    reset(state) {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(registerCompany.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Registration failed";
      });
  },
});

export const { reset } = companyRegisterSlice.actions;
export default companyRegisterSlice.reducer;

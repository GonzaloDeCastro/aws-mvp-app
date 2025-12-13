import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../config";

const STORAGE_KEY = "auth";

const loadAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveAuth = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => null);
      throw new Error(json?.message || "Login failed");
    }

    const json = await res.json();
    return json.data;
  }
);

const persisted = loadAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: persisted?.token || "",
    user: persisted?.user || null,
    status: "idle", // idle | loading | succeeded | failed
    error: "",
  },
  reducers: {
    logout(state) {
      state.token = "";
      state.user = null;
      state.status = "idle";
      state.error = "";
      clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveAuth(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

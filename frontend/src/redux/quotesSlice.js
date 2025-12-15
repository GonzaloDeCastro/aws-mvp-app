import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api";

/**
 * Fetches a quote by id and stores it in a cache map:
 * state.byId[quoteId] = quoteData
 */
export const fetchQuoteById = createAsyncThunk(
  "quotes/fetchById",
  async (quoteId) => {
    const json = await apiGet(`/quotes/${quoteId}`);
    return { quoteId: Number(quoteId), data: json.data };
  }
);
export const createQuote = createAsyncThunk(
  "quotes/createQuote",
  async (payload) => {
    const json = await apiPost("/quotes", payload);
    return json.data; // { id }
  }
);

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    byId: {}, // { [id]: quote }
    statusById: {}, // { [id]: 'idle' | 'loading' | 'succeeded' | 'failed' }
    errorById: {}, // { [id]: string }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuoteById.pending, (state, action) => {
        const id = Number(action.meta.arg);
        state.statusById[id] = "loading";
        state.errorById[id] = "";
      })
      .addCase(fetchQuoteById.fulfilled, (state, action) => {
        const { quoteId, data } = action.payload;
        state.byId[quoteId] = data;
        state.statusById[quoteId] = "succeeded";
      })
      .addCase(fetchQuoteById.rejected, (state, action) => {
        const id = Number(action.meta.arg);
        state.statusById[id] = "failed";
        state.errorById[id] = action.error?.message || "Failed to load quote";
      });
  },
});

export default quotesSlice.reducer;

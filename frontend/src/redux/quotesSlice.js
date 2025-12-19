import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../api";

/**
 * Fetches a list of quotes for the current company.
 */
export const fetchQuotes = createAsyncThunk("quotes/fetchAll", async () => {
  const json = await apiGet("/quotes");
  return json.data; // array of quotes
});

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

export const updateQuote = createAsyncThunk(
  "quotes/updateQuote",
  async ({ quoteId, ...payload }) => {
    await apiPut(`/quotes/${quoteId}`, payload);
    return { quoteId: Number(quoteId) };
  }
);

export const deleteQuote = createAsyncThunk(
  "quotes/deleteQuote",
  async (id) => {
    await apiDelete(`/quotes/${id}`);
    return id;
  }
);

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    byId: {}, // { [id]: quote }
    statusById: {}, // { [id]: 'idle' | 'loading' | 'succeeded' | 'failed' }
    errorById: {}, // { [id]: string }
    list: [], // array of quotes (lightweight view)
    listStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    listError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List
      .addCase(fetchQuotes.pending, (state) => {
        state.listStatus = "loading";
        state.listError = "";
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.list = action.payload ?? [];
        state.listStatus = "succeeded";
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.listStatus = "failed";
        state.listError = action.error?.message || "Failed to load quotes";
      })
      // Detail
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
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        const { quoteId } = action.payload;
        // Invalidar el cache del quote para que se recargue
        delete state.byId[quoteId];
        delete state.statusById[quoteId];
        // Actualizar en la lista si existe
        const listIndex = state.list.findIndex((q) => q.id === quoteId);
        if (listIndex >= 0) {
          // El total se actualizará cuando se recargue la lista
        }
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.list = state.list.filter((q) => q.id !== deletedId);
        delete state.byId[deletedId];
        delete state.statusById[deletedId];
        delete state.errorById[deletedId];
      });
  },
});

export default quotesSlice.reducer;

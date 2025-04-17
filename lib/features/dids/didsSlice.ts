import { createSlice } from "@reduxjs/toolkit";

import { deleteDID, fetchDIDs } from "./actions";
import { DIDState } from "./types";

const initialState: DIDState = {
  paginatedData: {
    data: null,
    lastPage: null,
  },
  loading: false,
  error: null,
  deletingId: null,
  lastUpdated: "",
};

const didsSlice = createSlice({
  name: "dids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDIDs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDIDs.fulfilled, (state, action) => {
        state.paginatedData = action.payload;
        state.loading = false;
        state.lastUpdated = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
      })
      .addCase(fetchDIDs.rejected, (state, action) => {
        state.error = action.error.message || "Erro ao buscar dids";
        state.loading = false;
      })
      .addCase(deleteDID.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteDID.fulfilled, (state, action) => {
        state.deletingId = null;
      })
      .addCase(deleteDID.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

export default didsSlice.reducer;

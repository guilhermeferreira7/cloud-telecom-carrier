import { createSlice } from "@reduxjs/toolkit";

import { createDID, deleteDID, fetchDIDs, getDID, updateDID } from "./actions";
import { DIDState } from "./types";

const initialState: DIDState = {
  paginatedData: {
    data: null,
    lastPage: null,
  },
  loading: false,
  error: null,
  deletingId: null,
  creating: false,
  updating: false,
  lastUpdated: "",
};

const didsSlice = createSlice({
  name: "dids",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDIDs.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchDIDs.fulfilled, (state, action) => {
        const now = new Date();

        state.paginatedData = action.payload;
        state.loading = false;
        state.lastUpdated = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      })
      .addCase(fetchDIDs.rejected, (state, action) => {
        state.error = action.error.message || "Erro ao buscar dids";
        state.loading = false;
      })
      .addCase(deleteDID.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteDID.fulfilled, (state) => {
        state.deletingId = null;
      })
      .addCase(deleteDID.rejected, (state) => {
        state.deletingId = null;
        state.error = "Erro ao deletar did";
      })
      .addCase(createDID.pending, (state) => {
        state.creating = true;
      })
      .addCase(createDID.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createDID.rejected, (state) => {
        state.creating = false;
        state.error = "Erro ao criar did";
      })
      .addCase(updateDID.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateDID.fulfilled, (state) => {
        state.updating = false;
      })
      .addCase(updateDID.rejected, (state) => {
        state.updating = false;
        state.error = "Erro ao atualizar did";
      })
      .addCase(getDID.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getDID.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getDID.rejected, (state) => {
        state.loading = false;
        state.error = "Erro ao buscar did";
      });
  },
});

export default didsSlice.reducer;

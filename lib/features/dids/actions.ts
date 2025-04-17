import { createAsyncThunk } from "@reduxjs/toolkit";

import { deleteMockedDID, fetchMockedDIDs } from "./mocks/actions";

export const fetchDIDs = createAsyncThunk(
  "dids/fetchAll",
  async ({ page, limit }: { page: number; limit: number }) => {
    return fetchMockedDIDs(page, limit);
  }
);

export const deleteDID = createAsyncThunk("dids/delete", async (id: number) => {
  return deleteMockedDID(id);
});

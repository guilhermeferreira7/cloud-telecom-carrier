import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createMockedDID,
  deleteMockedDID,
  fetchMockedDIDs,
} from "./mocks/actions";
import { DID } from "./types";

export const fetchDIDs = createAsyncThunk(
  "dids/fetchAll",
  async ({ page, limit }: { page: number; limit: number }) => {
    return fetchMockedDIDs(page, limit);
  }
);

export const deleteDID = createAsyncThunk("dids/delete", async (id: number) => {
  return deleteMockedDID(id);
});

export const createDID = createAsyncThunk(
  "dids/create",
  async (data: Omit<DID, "id">) => {
    return createMockedDID(data);
  }
);

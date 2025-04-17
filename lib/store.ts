import { configureStore } from "@reduxjs/toolkit";

import didsReducer from "@/lib/features/dids/didsSlice";

export const store = configureStore({
  reducer: {
    dids: didsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

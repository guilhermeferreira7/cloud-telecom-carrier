"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { Provider } from "react-redux";

import { store } from "@/lib/store";

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>;
};

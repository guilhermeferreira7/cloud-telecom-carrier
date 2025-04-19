import { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";

import { StoreProvider } from "./StoreProvider";

export const metadata: Metadata = {
  title: "Cloud Telecom Carrier",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="./logo.svg" />
        </head>

        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}

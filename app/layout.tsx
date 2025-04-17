import type { PropsWithChildren } from "react";
import { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
import "./App.css";

import { Footer } from "@/lib/components/Layout/Footer";
import { Header } from "@/lib/components/Layout/Header";

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

        <body className="d-flex flex-column min-vh-100">
          <Header />

          <main>{children}</main>

          <div className="mt-auto">
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}

import type { PropsWithChildren } from "react";

import { Footer } from "@/lib/components/Layout/Footer";
import { Header } from "@/lib/components/Layout/Header";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main>{children}</main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

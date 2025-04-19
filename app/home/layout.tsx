import type { PropsWithChildren } from "react";

import AuthLayout from "@/lib/components/Layout/AuthLayout";

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}

"use client";

import type { ReactNode } from "react";
import { Provider } from "@/components/ui/provider";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

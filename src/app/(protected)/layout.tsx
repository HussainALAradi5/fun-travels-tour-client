"use client";

import type { ReactNode } from "react";
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <RouteGuard>{children}</RouteGuard>;
}

"use client";

import { Suspense } from "react";
import { ResetPassword } from "@/components/user/auth/ResetPassword";

export default function Page() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}

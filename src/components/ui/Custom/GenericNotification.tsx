"use client";

import { useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import type { NotifyProps } from "@/interface/props/ui/NotifyProps";

export function NotificationEscapeListener() {
  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") toaster.dismiss();
    };
    window.addEventListener("keydown", dismissOnEscape);
    return () => window.removeEventListener("keydown", dismissOnEscape);
  }, []);

  return null;
}

export const notify = ({ title, description, type = "info" }: NotifyProps) => {
  toaster.create({
    title: title,
    description: description,
    type: type === "alert" ? "warning" : type,
    duration: 5000,
    closable: true,
  });
};

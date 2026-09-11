import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { ComponentVariant } from "@/enums/ComponentVariant";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
  variant?: ComponentVariant;
}

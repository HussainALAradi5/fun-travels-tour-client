import type { ReactNode } from "react";
import type { ComponentVariant } from "@/enums/ComponentVariant";

export interface AlertComponentProps {
  status: "info" | "warning" | "success" | "error";
  title?: string;
  description: string;
  icon?: ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
  actions?: ReactNode;
  variant?: ComponentVariant;
}

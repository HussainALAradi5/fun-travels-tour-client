import type { ReactNode } from "react";

export interface AlertComponentProps {
  status: "info" | "warning" | "success" | "error";
  title?: string;
  description: string;
  icon?: ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
  actions?: ReactNode;
}

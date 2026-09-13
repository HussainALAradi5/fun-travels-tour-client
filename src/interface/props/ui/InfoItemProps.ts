import type { ElementType } from "react";

export interface InfoItemProps {
  icon: ElementType;
  label: string;
  value: string | number | React.ReactNode;
  iconColor?: string;
}

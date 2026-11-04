import type { ComponentType } from "react";
import type { IconProps } from "./IconProps";

export interface ExportOptionProps {
  title: string;
  desc: string;
  icon: ComponentType<IconProps>;
  scheme: string;
  onSelect: () => void;
}

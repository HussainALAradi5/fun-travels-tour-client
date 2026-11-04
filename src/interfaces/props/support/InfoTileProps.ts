import type { LucideIcon } from "lucide-react";

export interface InfoTileProps {
  label: string;
  value?: string;
  icon: LucideIcon;
  palette: "blue" | "gray" | "purple";
}

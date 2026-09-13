import type { LucideIcon } from "lucide-react";
import type { GuideStep } from "@/interface/common/GuideStep";

export interface GuidedStepsDialogProps {
  title: string;
  description?: string;
  triggerLabel?: string;
  triggerIcon?: LucideIcon;
  steps: GuideStep[];
  colorPalette?: string;
  finalMessage?: string;
  buttonVariant?: "solid" | "outline" | "ghost" | "subtle";
}

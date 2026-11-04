import type { ViewMode } from "@/types/ui/ViewMode";

export interface DatePickerHeaderProps {
  viewDate: Date;
  viewMode: ViewMode;
  onViewMode: (mode: ViewMode) => void;
  onNavigate: (direction: "prev" | "next") => void;
}

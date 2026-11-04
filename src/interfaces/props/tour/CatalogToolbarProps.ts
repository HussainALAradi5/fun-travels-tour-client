import type { CatalogViewMode } from "@/types/tour/CatalogViewMode";

export interface CatalogToolbarProps {
  count: number;
  viewMode: CatalogViewMode;
  onViewMode: (mode: CatalogViewMode) => void;
}

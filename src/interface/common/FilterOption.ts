import type { ReactNode } from "react";

export interface FilterOption {
  label: ReactNode;
  value: string;
  searchText?: string;
}

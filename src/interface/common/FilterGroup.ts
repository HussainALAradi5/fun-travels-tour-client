import type { ReactNode } from 'react';

export interface FilterGroup {
  label: string;
  value: string;
  variant?: "select" | "combobox";
  onChange?: (val: string) => void;
  minWidth?: string;
  placeholder?: string;
  options?: { label: ReactNode; value: string; searchText?: string }[];
}

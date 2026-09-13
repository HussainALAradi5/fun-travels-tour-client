import type { FilterOption } from './FilterOption';

export interface FilterGroup {
  label: string;
  value: string;
  variant?: "select" | "combobox";
  onChange?: (val: string) => void;
  minWidth?: string;
  placeholder?: string;
  options?: FilterOption[];
}

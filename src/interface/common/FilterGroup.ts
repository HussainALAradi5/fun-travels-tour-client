export interface FilterGroup {
  label: string;
  value: string;
  options: { label: string; value: string; searchText?: string }[];
  variant?: "select" | "combobox";
  onChange: (value: string) => void;
  minWidth?: string;
  placeholder?: string;
}

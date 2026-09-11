export interface SearchFilterBarProps {
  label: string;
  placeholder?: string;
  count?: number;
  onSearch: (value: string) => void;
  onReset: () => void;
}

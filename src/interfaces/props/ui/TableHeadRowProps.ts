export interface TableHeadRowProps {
  headers: string[];
  showSelect?: boolean;
  colorPalette: string;
  checked: boolean | "indeterminate";
  onToggleAll: () => void;
}

import type { ReportSpec } from "@/interfaces/common/ReportSpec";
export interface TableToolbarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  setCurrentPage: (page: number) => void;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
  enableExport?: boolean;
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;
  selectedIds: Set<string | number>;
  selectedData: Record<string, unknown>[];
  data: Record<string, unknown>[];
  exportFileName?: string;
  /** Server report behind the Export button; selected rows are still exported in the browser. */
  report?: ReportSpec;
  colorPalette: string;
  pageSize: number;
  setPageSize: (size: number) => void;
}

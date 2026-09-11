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
  colorPalette: string;
  pageSize: number;
  setPageSize: (size: number) => void;
}

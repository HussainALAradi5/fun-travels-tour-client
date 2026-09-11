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
  selectedData: any[];
  data: any[];
  exportFileName?: string;
  colorPalette: string;
  pageSize: number;
  setPageSize: (size: number) => void;
}

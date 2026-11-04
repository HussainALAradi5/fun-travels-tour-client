import type { ReportSpec } from "@/interfaces/common/ReportSpec";
import type { ReactNode } from 'react';
import type { Column } from '@/interfaces/common/Column';

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  showSelect?: boolean;
  colorPalette?: string;
  renderExpansion?: (item: T) => ReactNode;
  searchKey?: keyof T;
  searchDisabled?: boolean;
  searchPlaceholder?: string;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  enableExport?: boolean;
  exportFileName?: string;
  /** Server report behind the Export button; selected rows are still exported in the browser. */
  report?: ReportSpec;
  emptyMessage?: string;
  pageSize?: number;
}

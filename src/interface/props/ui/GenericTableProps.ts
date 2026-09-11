import type { ReactNode } from 'react';
import type { Column } from '@/interface/common/Column';

export interface GenericTableProps<T> {
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
  emptyMessage?: string;
  pageSize?: number;
}

import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  label?: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  width?: string;
  type?: string;
}

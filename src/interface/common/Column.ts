export interface Column<T> {
  key: string;
  header: string;
  type?: "email" | "mobile" | "boolean" | "date";
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

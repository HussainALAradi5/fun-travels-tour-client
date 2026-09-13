import type { SortDirection } from "@/types/common/SortDirection";

export interface SortOption<TSort extends string> {
  label: string;
  value: TSort;
}

export interface DateSortFilterValue<TSort extends string> {
  startDate?: string;
  endDate?: string;
  sortBy: TSort;
  sortDir: SortDirection;
}

export interface DateSortFilterProps<TSort extends string> {
  value: DateSortFilterValue<TSort>;
  sortOptions: readonly SortOption<TSort>[];
  onChange: (value: DateSortFilterValue<TSort>) => void;
  dateLabel?: string;
}

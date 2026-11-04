import type { FilterGroup } from "../../common/FilterGroup";
import type { InboxFilters } from "../../notification/InboxFilters";

export interface InboxFilterPanelProps {
  filters: InboxFilters;
  filterGroups: FilterGroup[];
  count: number;
  onChange: (key: keyof InboxFilters) => (value: string) => void;
  onReset: () => void;
}

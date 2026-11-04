import type { FilterGroup } from "../../common/FilterGroup";
import type { CatalogFilters } from "../../tour/CatalogFilters";

export interface CatalogTableFiltersProps {
  filters: CatalogFilters;
  filterGroups: FilterGroup[];
  onChange: (key: keyof CatalogFilters) => (value: string) => void;
  onReset: () => void;
}

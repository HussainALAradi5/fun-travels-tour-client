import type { FilterState } from "@/interface/common/FilterState";
import type { FilterResult } from "@/interface/common/FilterResult";

export const GenericFilter = {
  process: <T>(data: T[], state: FilterState<T>): FilterResult<T> => {
    const { searchTerm, searchKey, currentPage, pageSize, filters } = state;

    const filtered = data.filter((item) => {
      const matchesSearch = !searchTerm || !searchKey ||
        String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters = !filters || Object.entries(filters).every(([key, value]) => {
        if (!value || value === "ALL") return true;
        return item[key as keyof T] === value;
      });

      return matchesSearch && matchesFilters;
    });

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const safePage = Math.min(Math.max(1, currentPage), totalPages);

    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      paginatedData,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
    };
  },
};

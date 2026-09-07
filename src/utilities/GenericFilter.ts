// src/utilities/GenericFilter.ts
export interface FilterState<T> {
  searchTerm: string;
  searchKey?: keyof T;
  currentPage: number;
  pageSize: number;
  filters?: Partial<Record<keyof T, any>>; // Added for exact matching (e.g., Status)
}

export interface FilterResult<T> {
  paginatedData: T[];
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export const GenericFilter = {
  process: <T>(data: T[], state: FilterState<T>): FilterResult<T> => {
    const { searchTerm, searchKey, currentPage, pageSize, filters } = state;

    // 1. Filter the data
    const filtered = data.filter((item) => {
      // Logic for Search Term (Partial Match)
      const matchesSearch = !searchTerm || !searchKey || 
        String((item as any)[searchKey]).toLowerCase().includes(searchTerm.toLowerCase());

      // Logic for Dynamic Filters (Exact Match, e.g., Status)
      const matchesFilters = !filters || Object.entries(filters).every(([key, value]) => {
        if (!value || value === "ALL") return true;
        return (item as any)[key] === value;
      });

      return matchesSearch && matchesFilters;
    });

    // 2. Pagination Math
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
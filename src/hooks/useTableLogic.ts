import { useState, useMemo } from "react";

export function useTableLogic<T extends { id?: number | string | null }>(
  data: T[],
  onSelectionChange?: (ids: (string | number)[]) => void,
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set(),
  );
  const [expandedRowId, setExpandedRowId] = useState<string | number | null>(
    null,
  );
  const [isExportOpen, setIsExportOpen] = useState(false);

  const toggleOne = (id: string | number) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
    onSelectionChange?.(Array.from(next));
  };

  const selectedData = useMemo(
    () => data.filter((item) => item.id && selectedIds.has(item.id)),
    [data, selectedIds],
  );

  return {
    state: {
      currentPage,
      pageSize,
      searchTerm,
      selectedIds,
      expandedRowId,
      isExportOpen,
    },
    actions: {
      setCurrentPage,
      setPageSize,
      setSearchTerm,
      setSelectedIds,
      setExpandedRowId,
      setIsExportOpen,
      toggleOne,
    },
    selectedData,
  };
}

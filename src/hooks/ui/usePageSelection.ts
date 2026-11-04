type RowId = string | number;

/** Select-all checkbox state for the rows of the current page. */
export function usePageSelection(pageIds: RowId[], selected: Set<RowId>, apply: (next: Set<RowId>) => void) {
  const all = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
  const some = !all && pageIds.some((id) => selected.has(id));
  const toggleAll = () => {
    const next = new Set(selected);
    pageIds.forEach((id) => (all ? next.delete(id) : next.add(id)));
    apply(next);
  };
  return { checked: all ? true : some ? ("indeterminate" as const) : false, toggleAll };
}

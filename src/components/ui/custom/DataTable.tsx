import { useState } from "react";
import type { ReactNode } from "react";
import { Box, Stack, Table } from "@chakra-ui/react";
import { usePageSelection } from "@/hooks/ui/usePageSelection";
import { useTableLogic } from "@/hooks/useTableLogic";
import type { DataTableProps } from "@/interfaces/props/ui/DataTableProps";
import { GenericFilter } from "@/utilities/GenericFilter";
import { EmptyTableRow } from "./data-table-components/EmptyTableRow";
import { TableToolbar } from "./data-table-components/TableHeader";
import { TableHeadRow } from "./data-table-components/TableHeadRow";
import { TableLoading } from "./data-table-components/TableLoading";
import { TablePagination } from "./data-table-components/TablePagination";
import { TableRow as CustomTableRow } from "./data-table-components/TableRow";

type RowRender = Array<{ key?: string; type?: string; render?: (row: Record<string, unknown>) => ReactNode }>;

export function DataTable<T extends { id?: number | string | null }>(props: DataTableProps<T>) {
  const { data, columns, loading, showSelect, colorPalette = "blue", renderExpansion, searchDisabled = false } = props;
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { state, actions, selectedData } = useTableLogic(data, props.onSelectionChange);
  const page = GenericFilter.process(data, { ...state, searchKey: props.searchKey, searchTerm: searchDisabled ? "" : state.searchTerm });
  const pageIds = page.paginatedData.map((i) => i.id).filter((id): id is string | number => id != null);
  const selection = usePageSelection(pageIds, state.selectedIds, (next) => {
    actions.setSelectedIds(next);
    props.onSelectionChange?.(Array.from(next));
  });
  if (loading) return <TableLoading colorPalette={colorPalette} />;

  return (
    <Box width="full">
      <Stack gap={4}>
        <TableToolbar {...props} {...state} {...actions} searchDisabled={searchDisabled} selectedData={selectedData}
          isExportOpen={isExportOpen} setIsExportOpen={setIsExportOpen} colorPalette={colorPalette} data={data} />
        <Box borderRadius="2xl" borderWidth="1px" borderColor="border.subtle" overflowX="auto" overflowY="hidden" bg="bg.panel" shadow="xs">
          <Table.Root size="md" variant="line" interactive minW={{ base: "760px", md: "full" }}>
            <TableHeadRow headers={columns.map((c) => String(c.header))} showSelect={showSelect} colorPalette={colorPalette}
              checked={selection.checked} onToggleAll={selection.toggleAll} />
            <Table.Body>
              {page.paginatedData.length > 0 ? page.paginatedData.map((item, idx) => (
                <CustomTableRow key={item.id ?? idx} item={item as Record<string, unknown>} id={item.id ?? null}
                  columns={columns as RowRender} showSelect={showSelect ?? false} colorPalette={colorPalette}
                  renderExpansion={renderExpansion as unknown as (item: Record<string, unknown>) => ReactNode}
                  isSelected={item.id ? state.selectedIds.has(item.id) : false} isExpanded={item.id === state.expandedRowId}
                  toggleOne={actions.toggleOne} setExpandedRowId={actions.setExpandedRowId} />
              )) : <EmptyTableRow colSpan={columns.length + (showSelect ? 1 : 0)} />}
            </Table.Body>
          </Table.Root>
          <TablePagination {...state} {...actions} totalItems={page.totalItems} totalPages={page.totalPages}
            startIndex={page.startIndex} endIndex={page.endIndex} />
        </Box>
      </Stack>
    </Box>
  );
}

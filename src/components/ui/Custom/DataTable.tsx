import { useState } from "react";
import { Box, Stack, Table, Checkbox, VStack, Text } from "@chakra-ui/react";
import { useTableLogic } from "@/hooks/useTableLogic";
import { GenericFilter } from "@/utilities/GenericFilter";
import { TableLoading } from "./DataTableComponents/TableLoading";
import { TablePagination } from "./DataTableComponents/TablePagination";
import { TableRow as CustomTableRow } from "./DataTableComponents/TableRow";
import { Search } from "lucide-react";
import { TableToolbar } from "./DataTableComponents/TableHeader";
import type { DataTableProps } from "@/interface/props/ui/DataTableProps";


export function DataTable<T extends { id?: number | string | null }>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    loading,
    showSelect,
    colorPalette = "blue",
    renderExpansion,
    searchDisabled = false
  } = props;

  const [isExportOpen, setIsExportOpen] = useState(false);
  const { state, actions, selectedData } = useTableLogic(data, props.onSelectionChange);
  const headerBg = { base: "gray.50/80", _dark: "gray.900/80" } as const;
  const { paginatedData, totalPages, totalItems, startIndex, endIndex } = GenericFilter.process(data, {
    ...state,
    searchKey: props.searchKey,
    searchTerm: searchDisabled ? "" : state.searchTerm
  });

  if (loading) return <TableLoading colorPalette={colorPalette} />;

  const currentPageIds = paginatedData
    .map((i) => i.id)
    .filter((id): id is string | number => id != null);

  const isAllSelected = currentPageIds.length > 0 && currentPageIds.every(id => state.selectedIds.has(id));
  const isSomeSelected = currentPageIds.some(id => state.selectedIds.has(id)) && !isAllSelected;

  const handleToggleAll = () => {
    const next = new Set(state.selectedIds);
    if (isAllSelected) {
      currentPageIds.forEach(id => next.delete(id));
    } else {
      currentPageIds.forEach(id => next.add(id));
    }
    actions.setSelectedIds(next);
    props.onSelectionChange?.(Array.from(next));
  };

  return (
    <Box width="full">
      <Stack gap={4}>
<TableToolbar
          {...props}
          {...state}
          {...actions}
          searchDisabled={searchDisabled}
          selectedData={selectedData}
          isExportOpen={isExportOpen}
          setIsExportOpen={setIsExportOpen}
          colorPalette={colorPalette}
          data={data}
        />

        <Box
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="border.subtle"
          overflowX="auto"
          overflowY="hidden"
          bg="bg.panel"
          shadow="xs"
        >
          <Table.Root size="md" variant="line" interactive minW={{ base: "760px", md: "full" }}>
            <Table.Header bg={headerBg} backdropFilter="blur(10px)">
              <Table.Row borderBottomWidth="2px">
                {showSelect && (
                  <Table.ColumnHeader width="50px" textAlign="center">
                    <Checkbox.Root
                      size="sm"
                      colorPalette={colorPalette}
                      checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
                      onCheckedChange={handleToggleAll}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control borderRadius="md" />
                    </Checkbox.Root>
                  </Table.ColumnHeader>
                )}
                {columns.map((col, i) => (
                  <Table.ColumnHeader
                    key={i}
                    py={5}
                    fontWeight="bold"
                    fontSize="xs"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="widest"
                  >
                    {col.header}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <CustomTableRow
                    key={item.id ?? idx}
                    item={item as Record<string, unknown>}
                    id={item.id ?? null}
                    columns={columns as Array<{ key?: string; type?: string; render?: (row: Record<string, unknown>) => React.ReactNode }>}
                    showSelect={showSelect ?? false}
                    colorPalette={colorPalette}
                    renderExpansion={renderExpansion as unknown as (item: Record<string, unknown>) => React.ReactNode}
                    isSelected={item.id ? state.selectedIds.has(item.id) : false}
                    isExpanded={item.id === state.expandedRowId}
                    toggleOne={actions.toggleOne}
                    setExpandedRowId={actions.setExpandedRowId}
                  />
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={columns.length + (showSelect ? 1 : 0)}
                    textAlign="center"
                    py={20}
                  >
                    <VStack gap={2} opacity={0.6}>
                      <Search size={40} />
                      <Box fontWeight="bold">No results found</Box>
                      <Text fontSize="xs">Try a different search term or filter.</Text>
                    </VStack>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>

          <TablePagination
            {...state}
            {...actions}
            totalItems={totalItems}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </Box>
      </Stack>
    </Box>
  );
}

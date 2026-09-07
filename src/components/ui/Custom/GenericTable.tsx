import React, { useState } from "react";
import { Box, Stack, Table, Checkbox, VStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../color-mode";
import { useTableLogic } from "@/hooks/useTableLogic";
import { GenericFilter } from "@/utilities/GenericFilter";
import { TableLoading } from "./GenericTableComponents/TableLoading";
import { TablePagination } from "./GenericTableComponents/TablePagination";
import { TableRow as CustomTableRow } from "./GenericTableComponents/TableRow";
import { Search } from "lucide-react";
import { TableToolbar } from "./GenericTableComponents/TableHeader";
import type { FieldType } from "@/utilities/FormTypes";

export interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
  type?: FieldType;
}

export interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  searchPlaceholder?: string;
  searchKey?: keyof T;
  searchDisabled?: boolean; // Prop to disable search
  showSelect?: boolean;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  exportFileName?: string;
  enableExport?: boolean;
  renderExpansion?: (item: T) => React.ReactNode;
  colorPalette?: string;
}

export function GenericTable<T extends { id?: number | string | null }>(props: GenericTableProps<T>) {
  const { 
    data, 
    columns, 
    loading, 
    showSelect, 
    colorPalette = "blue", 
    renderExpansion,
    searchDisabled = false // Default to false
  } = props;

  const [isExportOpen, setIsExportOpen] = useState(false);
  const { state, actions, selectedData } = useTableLogic(data, props.onSelectionChange);
  const headerBg = useColorModeValue("gray.50/80", "gray.900/80");

  // Logic: If search is disabled, we pass an empty string to the filter process
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
        {/* Pass searchDisabled to the Toolbar */}
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
          overflow="hidden" 
          bg="bg.panel"
          shadow="xs"
        >
          <Table.Root size="md" variant="line" interactive>
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
                    item={item} 
                    id={item.id}
                    columns={columns}
                    showSelect={showSelect}
                    colorPalette={colorPalette}
                    renderExpansion={renderExpansion}
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
            headerBg={headerBg} 
          />
        </Box>
      </Stack>
    </Box>
  );
}
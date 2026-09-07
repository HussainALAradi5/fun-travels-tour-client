import {
  HStack,
  Box,
  Input,
  Button,
  createListCollection,
  Portal,
  Icon,
  Select,
} from "@chakra-ui/react";
import { Search, Download, ListFilter } from "lucide-react";
import { GenericExportDialog } from "../Dialogs/GenericExportDialog";

const pageSizeOptions = createListCollection({
  items: [
    { label: "5 Rows", value: "5" },
    { label: "10 Rows", value: "10" },
    { label: "20 Rows", value: "20" },
    { label: "50 Rows", value: "50" },
  ],
});

interface TableToolbarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  setCurrentPage: (page: number) => void;
  searchPlaceholder?: string;
  searchDisabled?: boolean;
  enableExport?: boolean;
  isExportOpen: boolean;
  setIsExportOpen: (open: boolean) => void;
  selectedIds: Set<string | number>;
  selectedData: any[];
  data: any[];
  exportFileName?: string;
  colorPalette: string;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export const TableToolbar = ({
  searchTerm,
  setSearchTerm,
  setCurrentPage,
  searchPlaceholder,
  searchDisabled = false,
  enableExport,
  isExportOpen,
  setIsExportOpen,
  selectedIds,
  selectedData,
  data,
  exportFileName,
  colorPalette,
  pageSize,
  setPageSize,
}: TableToolbarProps) => {
  return (
    <HStack justifyContent="space-between" pb={4} width="full">
      {/* 1. Conditional Search Input */}
      {!searchDisabled ? (
        <Box position="relative" maxW="400px" width="full">
          <Box
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
            color="fg.muted"
          >
            <Search size={16} />
          </Box>
          <Input
            size="md"
            placeholder={searchPlaceholder || "Quick search..."}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            pl={10}
            bg="bg.panel"
            borderRadius="xl"
            borderWidth="1px"
            _focus={{
              borderColor: `${colorPalette}.500`,
              ring: 1,
              ringColor: `${colorPalette}.500`,
            }}
          />
        </Box>
      ) : (
        /* If search is disabled, this pushes the action buttons to the right */
        <Box flex={1} />
      )}

      {/* 2. Action Buttons (Export & Page Size) */}
      <HStack gap={3}>
        {enableExport && (
          <>
            <Button
              variant="surface"
              size="md"
              colorPalette={colorPalette}
              onClick={() => setIsExportOpen(true)}
              borderRadius="xl"
              gap={2}
              shadow="sm"
            >
              <Download size={16} />
              {selectedIds.size > 0 ? `Export (${selectedIds.size})` : "Export"}
            </Button>
            <GenericExportDialog
              open={isExportOpen}
              onClose={() => setIsExportOpen(false)}
              data={selectedIds.size > 0 ? selectedData : data}
              fileName={exportFileName || "table-data"}
            />
          </>
        )}

        {/* Fix applied here: Using Select.Root pattern */}
        <Select.Root
          size="md"
          width="140px"
          collection={pageSizeOptions}
          value={[pageSize.toString()]}
          onValueChange={(details) => {
            setPageSize(Number(details.value[0]));
            setCurrentPage(1);
          }}
          positioning={{ placement: "bottom-end", gutter: 4 }}
        >
          <Select.Trigger borderRadius="xl" bg="bg.panel">
            <HStack gap={2}>
              <Icon size="sm" color="fg.muted">
                <ListFilter />
              </Icon>
              <Select.ValueText placeholder="Size" />
            </HStack>
          </Select.Trigger>

          <Portal>
            <Select.Positioner zIndex={2000}>
              <Select.Content
                borderRadius="xl"
                boxShadow="xl"
                bg="bg.panel"
                borderWidth="1px"
              >
                {pageSizeOptions.items.map((opt) => (
                  <Select.Item
                    item={opt}
                    key={opt.value}
                    cursor="pointer"
                    _hover={{ bg: "bg.muted" }}
                    borderRadius="lg"
                    m={1}
                  >
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </HStack>
    </HStack>
  );
};

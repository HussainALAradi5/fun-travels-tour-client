import { HStack, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export const TablePagination = ({
  totalItems, startIndex, endIndex, currentPage, totalPages, setCurrentPage, headerBg
}: {
  totalItems: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
  headerBg: string;
}) => (
  <HStack justifyContent="space-between" p={4} bg={headerBg} borderTop="1px solid" borderColor="border.subtle">
    <Text fontSize="xs" color="fg.muted" fontWeight="medium">
      Showing {totalItems === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
    </Text>
    <HStack gap={1}>
      <IconButton variant="ghost" size="xs" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
        <ChevronsLeft size={14} />
      </IconButton>
      <IconButton variant="ghost" size="xs" disabled={currentPage === 1} onClick={() => setCurrentPage((p: number) => p - 1)}>
        <ChevronLeft size={14} />
      </IconButton>
      <HStack gap={1} px={2}>
        <Text fontSize="xs" fontWeight="bold">{currentPage}</Text>
        <Text fontSize="xs" color="fg.muted">of</Text>
        <Text fontSize="xs" fontWeight="bold">{totalPages || 1}</Text>
      </HStack>
      <IconButton variant="ghost" size="xs" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage((p: number) => p + 1)}>
        <ChevronRight size={14} />
      </IconButton>
      <IconButton variant="ghost" size="xs" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(totalPages)}>
        <ChevronsRight size={14} />
      </IconButton>
    </HStack>
  </HStack>
);
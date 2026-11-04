import { Box, Table, Text, VStack } from "@chakra-ui/react";
import { Search } from "lucide-react";
import type { EmptyTableRowProps } from "@/interfaces/props/ui/EmptyTableRowProps";

export const EmptyTableRow = ({ colSpan }: EmptyTableRowProps) => (
  <Table.Row>
    <Table.Cell colSpan={colSpan} textAlign="center" py={20}>
      <VStack gap={2} opacity={0.6}>
        <Search size={40} />
        <Box fontWeight="bold">No results found</Box>
        <Text fontSize="xs">Try a different search term or filter.</Text>
      </VStack>
    </Table.Cell>
  </Table.Row>
);

import { HStack, Stack, VStack, Heading, Text, Button, Box } from "@chakra-ui/react";
import { FileUp, Plus } from "lucide-react";
import { UnifiedFilterBar } from "../../ui/Custom/UnifiedFilterBar";
import { ContentCard } from "../../ui/Custom/ContentCard";
import { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { TransportationHeaderProps } from "@/interface/props/tour/TransportationHeaderProps";

export const TransportationHeader = ({
  count,
  searchValue,
  onSearch,
  typeFilterValue,
  onTypeFilterChange,
  statusFilterValue,
  onStatusFilterChange,
  onAdd,
  onImport,
  onReset,
}: TransportationHeaderProps) => {

  const statusOptions = [
    { label: "All Status", value: "ALL" },
    ...Object.values(TransportationStatus).map((s) => ({ label: s, value: s })),
  ];

  const typeOptions = [
    { label: "All", value: "ALL" },
    ...Object.values(TransportationType).map((t) => ({ label: t, value: t })),
  ];

  return (
    <ContentCard
      header={
        <Stack direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "center" }} justify="space-between" width="full" gap={3}>
          <VStack align="start" gap={0}>
            <Heading size="md" letterSpacing="tight" fontWeight="black">Fleet Inventory</Heading>
            <Text color="fg.muted" fontSize="xs">Advanced Resource Search & Management</Text>
          </VStack>
          <HStack flexWrap="wrap">
          <Button flex={{ base: 1, sm: "initial" }} variant="outline" size="sm" onClick={onImport} borderRadius="full">
            <FileUp size={16} /> Import Excel
          </Button>
          <Button
            colorPalette="blue"
            size="sm"
            onClick={onAdd}
            variant="solid"
            borderRadius="full"
            px={5}
            flex={{ base: 1, sm: "initial" }}
            _hover={{ transform: "scale(1.02)" }}
          >
            <Plus size={16} /> Register Unit
          </Button>
          </HStack>
        </Stack>
      }
    >
      <Box p={4}>
        <UnifiedFilterBar
          searchLabel="SearchBar"
          searchPlaceholder="Search"
          searchValue={searchValue}
          onSearchTrigger={onSearch}
          count={count}
          onReset={onReset}
          filters={[
            { label: "Vehicle Class", value: typeFilterValue, options: typeOptions, onChange: onTypeFilterChange, minWidth: "200px" },
            { label: "Unit Status", value: statusFilterValue, options: statusOptions, onChange: onStatusFilterChange, minWidth: "200px" }
          ]}
        />
      </Box>
    </ContentCard>
  );
};

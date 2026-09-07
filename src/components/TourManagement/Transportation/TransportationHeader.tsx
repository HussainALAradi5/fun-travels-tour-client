// src/components/TourManagement/Transportation/TransportationHeader.tsx
import { HStack, VStack, Heading, Text, Button, Box } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { UnifiedFilterBar } from "../../ui/Custom/UnifiedFilterBar";
import { GenericCard } from "../../ui/Custom/GenericCard";
import { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";

interface TransportationHeaderProps {
  count: number;
  searchValue: string;
  onSearch: (val: string) => void;
  typeFilterValue: string;
  onTypeFilterChange: (val: string) => void;
  statusFilterValue: string;
  onStatusFilterChange: (val: string) => void;
  onAdd: () => void;
  onReset: () => void;
}

export const TransportationHeader = ({
  count,
  searchValue,
  onSearch,
  typeFilterValue,
  onTypeFilterChange,
  statusFilterValue,
  onStatusFilterChange,
  onAdd,
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
    <GenericCard
      header={
        <HStack justify="space-between" width="full">
          <VStack align="start" gap={0}>
            <Heading size="md" letterSpacing="tight" fontWeight="black">Fleet Inventory</Heading>
            <Text color="fg.muted" fontSize="xs">Advanced Resource Search & Management</Text>
          </VStack>
          <Button 
            colorPalette="blue" 
            size="sm" 
            onClick={onAdd} 
            variant="solid" 
            borderRadius="full" 
            px={5}
            _hover={{ transform: "scale(1.02)" }}
          >
            <Plus size={16} /> Register Unit
          </Button>
        </HStack>
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
    </GenericCard>
  );
};
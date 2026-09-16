import { HStack, VStack, Heading, Text, Badge, Box } from "@chakra-ui/react";
import { LayoutGrid } from "lucide-react";
import { ChairType } from "@/enums/tourmanagement/ChairType";
import { SeatStatus } from "@/enums/tourmanagement/SeatStatus";
import { ContentCard } from "@/components/ui/Custom/ContentCard";
import { UnifiedFilterBar } from "@/components/ui/Custom/UnifiedFilterBar";
import { ChairTypeColor } from "@/enums/tourmanagement/ChairType";
import type { SeatManagerHeaderProps } from "@/interface/props/tour/SeatManagerHeaderProps";
import { typedEntries } from "@/utilities/ObjectUtils";

export const SeatManagerHeader = ({
  count,
  searchValue,
  onSearch,
  typeFilterValue,
  onTypeFilterChange,
  statusFilterValue,
  onStatusFilterChange,
  onReset,
  totals,
  totalSeats
}: SeatManagerHeaderProps) => {

  const typeOptions = [
    { label: "All", value: "ALL" },
    ...Object.values(ChairType).map((t) => ({ label: t.replace("_", " "), value: t })),
  ];

  const statusOptions = [
    { label: "All Statuses", value: "ALL" },
    ...Object.values(SeatStatus).map((s) => ({ label: s, value: s })),
  ];

  return (
    <ContentCard
      header={
        <HStack justify="space-between" width="full" flexWrap="wrap" gap={4}>
          <VStack align="start" gap={0}>
            <Heading size="md" letterSpacing="tight" fontWeight="black" display="flex" alignItems="center" gap={2}>
              <LayoutGrid size={20} /> Seat Configuration
            </Heading>
            <Text color="fg.muted" fontSize="xs">Manage layout, classification, and status</Text>
          </VStack>

          <HStack flexWrap="wrap" gap={2}>
            <Badge variant="solid" colorPalette="blue" px={3} py={1} borderRadius="full">
              TOTAL: {totalSeats}
            </Badge>
            {typedEntries(totals).map(([type, amount]) => (
              <Badge
                key={type}
                variant="surface"
                colorPalette={ChairTypeColor[type]}
                px={3} py={1} borderRadius="full"
              >
                {type.replace("_", " ")}: {amount}
              </Badge>
            ))}
          </HStack>
        </HStack>
      }
    >
      <Box p={4}>
        <UnifiedFilterBar
          searchLabel="Seat Search"
          searchPlaceholder="Search by Seat Code..."
          searchValue={searchValue}
          onSearchTrigger={onSearch}
          count={count}
          onReset={onReset}
          filters={[
            {
              label: "Classification",
              value: typeFilterValue,
              options: typeOptions,
              onChange: onTypeFilterChange,
              minWidth: "180px"
            },
            {
              label: "Operational Status",
              value: statusFilterValue,
              options: statusOptions,
              onChange: onStatusFilterChange,
              minWidth: "180px"
            }
          ]}
        />
      </Box>
    </ContentCard>
  );
};

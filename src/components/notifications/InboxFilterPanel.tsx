import { Box, HStack, Input, Separator, Text, VStack } from "@chakra-ui/react";
import { UnifiedFilterBar } from "@/components/ui/custom/UnifiedFilterBar";
import type { InboxFilterPanelProps } from "@/interfaces/props/notification/InboxFilterPanelProps";

const DATE_FIELDS = [["startDate", "From Date"], ["endDate", "To Date"]] as const;

export const InboxFilterPanel = ({ filters, filterGroups, count, onChange, onReset }: InboxFilterPanelProps) => (
  <Box bg="bg.panel" p={5} borderRadius="2xl" shadow="sm" borderWidth="1px" borderColor="border.subtle">
    <UnifiedFilterBar searchLabel="Search Inbox" searchPlaceholder="Search titles or messages..." searchValue={filters.search}
      onSearchTrigger={onChange("search")} filters={filterGroups} count={count} onReset={onReset} />
    <Separator my={5} />
    <HStack gap={6} flexWrap="wrap">
      {DATE_FIELDS.map(([key, label]) => (
        <VStack key={key} align="start" gap={2}>
          <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">{label}</Text>
          <Input type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" borderColor="border.muted" aria-label={label}
            value={filters[key]} onChange={(e) => onChange(key)(e.target.value)} _hover={{ borderColor: "blue.400" }} />
        </VStack>
      ))}
    </HStack>
  </Box>
);

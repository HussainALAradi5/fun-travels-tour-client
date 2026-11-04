import { HStack, Input, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { UnifiedFilterBar } from "@/components/ui/custom/UnifiedFilterBar";
import type { CatalogTableFiltersProps } from "@/interfaces/props/tour/CatalogTableFiltersProps";

export const CatalogTableFilters = ({ filters, filterGroups, onChange, onReset }: CatalogTableFiltersProps) => (
  <Stack gap={4} bg="bg.panel" p={5} borderRadius="2xl" shadow="sm" borderWidth="1px" mb={8}>
    <UnifiedFilterBar searchLabel="Expedition Search" searchPlaceholder="Filter by tour title..." searchValue={filters.searchTerm}
      onSearchTrigger={onChange("searchTerm")} filters={filterGroups} onReset={onReset} />
    <Separator />
    <HStack gap={4} flexWrap="wrap">
      {([["startDate", "Depart After"], ["endDate", "Return Before"]] as const).map(([key, label]) => (
        <VStack key={key} align="start" gap={1.5}>
          <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">{label}</Text>
          <Input type="date" size="sm" borderRadius="xl" h="10" bg="bg.surface" aria-label={label}
            value={filters[key]} onChange={(e) => onChange(key)(e.target.value)} />
        </VStack>
      ))}
    </HStack>
  </Stack>
);

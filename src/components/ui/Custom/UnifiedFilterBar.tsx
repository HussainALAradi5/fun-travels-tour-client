import { useState, useEffect, useMemo } from "react";
import {
  Button, HStack, Icon, Input, Text, VStack, Badge, Box, Separator
} from "@chakra-ui/react";
import { Search, RotateCcw } from "lucide-react";
import { FilterCombobox } from "./UnifiedFilterBar/FilterCombobox";
import type { FilterGroup } from "@/interface/common/FilterGroup";
import type { UnifiedFilterBarProps } from "@/interface/props/ui/UnifiedFilterBarProps";

export const UnifiedFilterBar = ({
  searchLabel,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchTrigger,
  filterLabel,
  filterValue,
  options,
  onFilterChange,
  filters,
  count = 0,
  onReset
}: UnifiedFilterBarProps) => {
  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);
  const activeFilters = useMemo<FilterGroup[]>(() => {
    if (filters && filters.length > 0) return filters;

    if (filterLabel && options && onFilterChange) {
      return [{
        label: filterLabel,
        value: filterValue || "",
        variant: "select",
        options: options,
        onChange: onFilterChange,
        placeholder: "Select..."
      }];
    }
    return [];
  }, [filters, filterLabel, filterValue, options, onFilterChange]);

  return (
    <HStack gap={4} width="full" align="flex-end" flexWrap="wrap">
<VStack align="start" gap={1.5} flex="1" minW="280px">
        <HStack width="full" justify="space-between" px={1}>
          <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
            {searchLabel}
          </Text>
          {count > 0 && (
            <Badge variant="subtle" colorPalette="blue" size="sm" borderRadius="md">
              {count} Results
            </Badge>
          )}
        </HStack>

        <Box width="full" position="relative">
          <Input
            variant="subtle"
            colorPalette="blue"
            placeholder={searchPlaceholder}
            fontSize="sm"
            pl="10"
            pr="75px"
            h="10"
            borderRadius="xl"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearchTrigger(localSearch)}
          />

          <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" pointerEvents="none" color="fg.muted">
            <Icon size="sm"><Search size={14} /></Icon>
          </Box>

          <HStack position="absolute" right="1.5" top="50%" transform="translateY(-50%)" gap={2}>
            <Separator orientation="vertical" h="14px" />
            <Button
              size="xs" variant="ghost" colorPalette="blue" fontWeight="bold" h="7" px={3}
              onClick={() => onSearchTrigger(localSearch)}
            >
              Search
            </Button>
          </HStack>
        </Box>
      </VStack>
{activeFilters.map((f, idx) => (
        <FilterCombobox key={`${idx}-${f.value}`} f={f} />
      ))}
<Button
        size="sm" variant="subtle" h="10" w="10" borderRadius="xl"
        onClick={() => { setLocalSearch(""); onReset(); }}
        _hover={{ bg: "red.100", color: "red.600" }}
        title="Reset all filters"
      >
        <RotateCcw size={14} />
      </Button>
    </HStack>
  );
};

export default UnifiedFilterBar;

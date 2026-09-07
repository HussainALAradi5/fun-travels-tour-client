import { 
  HStack, 
  Icon, 
  createListCollection,
  Select,
  VStack,
  Portal,
  Button
} from "@chakra-ui/react";
import { Filter as FilterIcon, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface ModernFilterBarProps {
  filterLabel: string;
  filterPlaceholder?: string;
  filterValue: string;
  onFilterChange: (val: string) => void;
  options: FilterOption[];
  useSearchButton?: boolean; // New Optional Logic
}

export const ModernFilterBar = ({ 
  filterLabel,
  filterPlaceholder = "Select Status",
  filterValue, 
  onFilterChange, 
  options,
  useSearchButton = false
}: ModernFilterBarProps) => {
  
  const [localValue, setLocalValue] = useState(filterValue);

  // Sync with external resets
  useEffect(() => {
    setLocalValue(filterValue);
  }, [filterValue]);

  const collection = createListCollection({
    items: options,
  });

  const handleApply = () => {
    onFilterChange(localValue);
  };

  return (
    <VStack align="start" gap={1.5} width="full">
      <Select.Label 
        fontSize="2xs" 
        fontWeight="bold" 
        color="fg.muted" 
        ml={1} 
        textTransform="uppercase" 
        letterSpacing="wider"
      >
        {filterLabel}
      </Select.Label>
      
      <HStack gap={2} width="full">
        <Select.Root 
          collection={collection} 
          value={[localValue]}
          onValueChange={(e) => {
            const val = e.value[0];
            setLocalValue(val);
            if (!useSearchButton) onFilterChange(val);
          }}
          size="sm"
          positioning={{ placement: "bottom-start", gutter: 4 }}
        >
          <Select.Trigger borderRadius="xl" bg="bg.panel" h="10" width="full" borderWidth="1px">
            <HStack gap={2} px={1}>
              <Icon size="xs" color="blue.500">
                <FilterIcon />
              </Icon>
              <Select.ValueText placeholder={filterPlaceholder} />
            </HStack>
          </Select.Trigger>

          <Portal>
            <Select.Positioner zIndex="popover">
              <Select.Content 
                borderRadius="xl" 
                boxShadow="lg" 
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
                minW="200px"
              >
                {collection.items.map((opt) => (
                  <Select.Item 
                    item={opt} 
                    key={opt.value} 
                    cursor="pointer" 
                    borderRadius="lg" 
                    m={1}
                    _hover={{ bg: "bg.muted" }}
                  >
                    {opt.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        {useSearchButton && (
          <Button 
            size="sm" 
            h="10" 
            variant="solid" 
            colorPalette="blue" 
            borderRadius="xl"
            onClick={handleApply}
          >
            <Search size={14} />
          </Button>
        )}
      </HStack>
    </VStack>
  );
};
// src/components/ui/Custom/UnifiedFilterBar/FilterCombobox.tsx
import { useState, useMemo } from "react";
import { 
  HStack, Icon, Text, VStack, Box, 
  createListCollection, Combobox, Select 
} from "@chakra-ui/react";
import { Filter as FilterIcon } from "lucide-react";

export interface FilterGroup {
  label: React.ReactNode;
  value: string;
  searchText?: string;
  variant?: "select" | "combobox"; // Toggle between UI types
  options: { 
    label: React.ReactNode; 
    value: string; 
    searchText?: string 
  }[];
  onChange: (val: string) => void;
  placeholder?: string;
  minWidth?: string;
}

export const FilterCombobox = ({ f }: { f: FilterGroup }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isCombobox = f.variant === "combobox";

  // Helper to get string for search/accessibility
  const getStringValue = (item: any) => 
    item.searchText || (typeof item.label === "string" ? item.label : "") || item.value;

  const filteredItems = useMemo(() => {
    if (!searchTerm || !isCombobox) return f.options;
    return f.options.filter((opt) =>
      getStringValue(opt).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [f.options, searchTerm, isCombobox]);

  const collection = useMemo(() => createListCollection({
    items: filteredItems,
    itemToString: (item) => getStringValue(item),
    itemToValue: (item) => item.value,
  }), [filteredItems]);

  const commonProps = {
    collection,
    value: f.value ? [f.value] : [],
    onValueChange: (details: any) => {
      f.onChange(details.value[0] || "");
      setSearchTerm("");
    },
    size: "sm" as const,
    positioning: { strategy: "fixed" as const, hideWhenDetached: true, sameWidth: true }
  };

  return (
    <VStack align="start" gap={1.5} minW={f.minWidth || "180px"}>
      <Text fontSize="2xs" fontWeight="bold" color="fg.muted" ml={1} textTransform="uppercase">
        {f.label}
      </Text>

      {isCombobox ? (
        /* --- SEARCHABLE COMBOBOX VARIANT --- */
        <Combobox.Root {...commonProps} onInputValueChange={(e) => setSearchTerm(e.inputValue)}>
          <Combobox.Control borderRadius="xl" bg="bg.panel" h="10" borderWidth="1px" borderColor="border.subtle">
            <HStack gap={2} px={3} w="full">
              <Icon size="xs" color="blue.fg"><FilterIcon size={14} /></Icon>
              <Combobox.Input 
                placeholder={f.placeholder || "Search..."} 
                bg="transparent" 
                fontSize="sm"
                _focus={{ outline: "none" }} 
              />
            </HStack>
            <Combobox.Trigger />
          </Combobox.Control>
          <Combobox.Positioner zIndex={2100}>
            <Combobox.Content borderRadius="xl" boxShadow="xl" bg="bg.panel" p={1} borderWidth="1px">
              {collection.items.length === 0 && (
                <Box px={4} py={2}><Text fontSize="xs" color="fg.muted">No results found</Text></Box>
              )}
              {collection.items.map((opt) => (
                <Combobox.Item item={opt} key={opt.value} cursor="pointer" borderRadius="lg" _hover={{ bg: "bg.muted" }}>
                  <Combobox.ItemText fontSize="xs">{opt.label}</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </Combobox.Content>
          </Combobox.Positioner>
        </Combobox.Root>
      ) : (
        /* --- STANDARD SELECT VARIANT (DEFAULT) --- */
        <Select.Root {...commonProps}>
          <Select.Trigger borderRadius="xl" bg="bg.panel" h="10" borderWidth="1px" borderColor="border.subtle">
            <HStack gap={2} px={3}>
              <Icon size="xs" color="blue.fg"><FilterIcon size={14} /></Icon>
              <Select.ValueText placeholder={f.placeholder || "Select..."} fontSize="sm" />
            </HStack>
          </Select.Trigger>
          <Select.Positioner zIndex={2100}>
            <Select.Content borderRadius="xl" boxShadow="xl" bg="bg.panel" p={1} borderWidth="1px">
              {collection.items.map((opt) => (
                <Select.Item item={opt} key={opt.value} cursor="pointer" borderRadius="lg" _hover={{ bg: "bg.muted" }}>
                  <Text fontSize="xs">{opt.label}</Text>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      )}
    </VStack>
  );
};
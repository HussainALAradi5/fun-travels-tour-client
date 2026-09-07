import { useMemo, useState } from "react";
// Added Text to the imports below
import { Combobox, createListCollection, Box, Text } from "@chakra-ui/react";
import { GenericFilter } from "@/utilities/GenericFilter";
import { SelectedTags } from "../SelectedTags";

export function FormCombobox({ field, value, onChange, multiple }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  const rawOptions = useMemo(() => field.options || [], [field.options]);

  /**
   * Object Handling for "No DTO"
   * Extracts a unique string ID to track selection internally.
   */
  const getInternalValue = (val: any) => {
    if (!val) return "";
    return typeof val === "object" ? String(val.id || JSON.stringify(val)) : String(val);
  };

  const selectedValues = useMemo(() => {
    if (!value) return [];
    const vals = Array.isArray(value) ? value : [value];
    return vals.map(getInternalValue);
  }, [value]);

  const filteredItems = useMemo(() => {
    const result = GenericFilter.process(rawOptions, {
      searchTerm: searchTerm,
      searchKey: "label",
      currentPage: 1,
      pageSize: 100,
    });
    return result.paginatedData;
  }, [rawOptions, searchTerm]);

  const collection = useMemo(() => {
    return createListCollection({
      items: filteredItems.map((item: any) => ({
        label: String(item.label),
        value: getInternalValue(item.value),
        original: item.value, // Store full object here
      })),
    });
  }, [filteredItems]);

  const handleValueChange = (details: any) => {
    const nextIds = details.value; 
    
    const selectedObjects = nextIds.map((id: string) => {
      const found = collection.items.find((item: any) => item.value === id);
      return found ? (found as any).original : id;
    });

    if (multiple) {
      onChange(field.name, selectedObjects);
    } else {
      onChange(field.name, selectedObjects[0]);
    }
  };

  const handleRemoveTag = (valToRemove: string) => {
    if (Array.isArray(value)) {
      const updatedValues = value.filter((v: any) => getInternalValue(v) !== valToRemove);
      onChange(field.name, updatedValues);
    }
  };

  return (
    <Box w="100%">
      {multiple && (
        <SelectedTags 
          values={selectedValues} 
          options={rawOptions} 
          onRemove={handleRemoveTag} 
        />
      )}

      <Combobox.Root
        collection={collection}
        size="sm"
        multiple={multiple}
        value={selectedValues}
        onValueChange={handleValueChange}
        onInputValueChange={(e) => setSearchTerm(e.inputValue)}
      >
        <Combobox.Control>
          <Combobox.Input
            placeholder={field.placeholder || `Search ${field.label}...`}
            autoComplete="off"
            _focus={{ borderColor: "blue.500" }}
          />
          <Combobox.Trigger />
        </Combobox.Control>

        <Combobox.Positioner zIndex="popover">
          <Combobox.Content bg="bg.panel" boxShadow="md" borderRadius="md">
            {collection.items.length === 0 && (
              <Box px={4} py={2}>
                {/* Now properly imported from @chakra-ui/react */}
                <Text fontSize="xs" color="fg.muted">No results found</Text>
              </Box>
            )}
            
            {collection.items.map((item) => (
              <Combobox.Item 
                key={item.value} 
                item={item}
                px={2}
                py={1.5}
                cursor="pointer"
                _hover={{ bg: "blue.50", color: "blue.700" }}
              >
                <Combobox.ItemText fontSize="xs">{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </Box>
  );
}
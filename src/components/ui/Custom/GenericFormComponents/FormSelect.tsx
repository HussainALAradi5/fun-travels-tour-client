import { useMemo } from "react";
import { 
  createListCollection, 
  Box, 
  Text 
} from "@chakra-ui/react";
import {
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
  SelectPositioner,
} from "@chakra-ui/react";

export function FormSelect({ field, value, onChange }: any) {
  const rawOptions = useMemo(() => field.options || [], [field.options]);

  const getInternalValue = (val: any) => {
    if (val === null || val === undefined) return "";
    return typeof val === "object"
      ? String(val.id || JSON.stringify(val))
      : String(val);
  };

  const selectedValue = useMemo(() => {
    if (value === null || value === undefined || value === "") return [];
    return [getInternalValue(value)];
  }, [value]);

  const collection = useMemo(() => {
    return createListCollection({
      items: rawOptions.map((item: any) => ({
        label: String(item.label),
        value: getInternalValue(item.value),
        original: item.value,
      })),
    });
  }, [rawOptions]);

  const handleValueChange = (details: any) => {
    const id = details.value[0];
    const found = collection.items.find((item: any) => item.value === id);
    onChange(field.name, found ? (found as any).original : id);
  };

  return (
    <Box w="100%">
      <SelectRoot
        collection={collection}
        size="sm"
        value={selectedValue}
        onValueChange={handleValueChange}
        disabled={field.disabled}
        /* When inside a Dialog, we use strategy: "fixed" 
           but we do NOT use a Portal.
        */
        positioning={{ 
          sameWidth: true, 
          gutter: 4, 
          strategy: "fixed" 
        }}
      >
        <SelectTrigger
          height="36px"
          bg="bg.subtle"
          borderWidth="1px"
          px={3}
          borderRadius="md"
          _focus={{ borderColor: "blue.500", bg: "bg.panel" }}
          _hover={{ borderColor: "blue.500/50" }}
          cursor="pointer"
        >
          <SelectValueText
            placeholder={field.placeholder || `Select ${field.label}...`}
          />
        </SelectTrigger>

        {/* Removed <Portal> to avoid focus-trap conflicts with Dialog */}
        <SelectPositioner> 
          <SelectContent
            bg="bg.panel"
            boxShadow="xl"
            borderRadius="md"
            borderWidth="1px"
            borderColor="border.subtle"
            minW="200px"
          >
            {collection.items.map((item: any) => (
              <SelectItem
                key={item.value}
                item={item}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: "blue.50", color: "blue.700" }}
                _selected={{ bg: "blue.600", color: "white" }}
              >
                <Text fontSize="xs" fontWeight="medium">
                  {item.label}
                </Text>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </SelectRoot>
    </Box>
  );
}
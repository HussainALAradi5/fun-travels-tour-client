import { useMemo } from "react";
import {
  createListCollection,
  Box,
  HStack,
  Icon,
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
import type { FormSelectProps } from "@/interface/props/ui/FormSelectProps";

export function FormSelect({ field, value, onChange }: FormSelectProps) {
  const rawOptions = useMemo(() => field.options || [], [field.options]);

  const getInternalValue = (val: string | number | boolean | null | undefined): string => {
    if (val === null || val === undefined) return "";
    return typeof val === "object"
      ? String((val as unknown as Record<string, unknown>).id || JSON.stringify(val))
      : String(val);
  };

  const selectedValue = useMemo(() => {
    if (value === null || value === undefined || value === "") return [];
    return [getInternalValue(value)];
  }, [value]);

  const selectedOption = rawOptions.find(
    (option) => getInternalValue(option.value) === selectedValue[0],
  );

  const collection = useMemo(() => {
    return createListCollection({
      items: rawOptions.map((item) => ({
        label: String(item.label),
        value: getInternalValue(item.value),
        original: item.value,
        icon: item.icon,
      })),
    });
  }, [rawOptions]);

  const handleValueChange = (details: { value: string[] }) => {
    const id = details.value[0];
    const found = collection.items.find((item) => item.value === id);
    onChange(field.name, found ? (found as { original: string | number | boolean }).original : id);
  };

  return (
    <Box w="100%">
      <SelectRoot
        collection={collection}
        size="sm"
        value={selectedValue}
        onValueChange={handleValueChange}
        disabled={field.disabled}
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
          {selectedOption?.icon && <Icon as={selectedOption.icon} boxSize="4" flexShrink={0} />}
          <SelectValueText
            placeholder={field.placeholder || `Select ${field.label}...`}
          />
        </SelectTrigger>
<SelectPositioner>
          <SelectContent
            bg="bg.panel"
            boxShadow="xl"
            borderRadius="md"
            borderWidth="1px"
            borderColor="border.subtle"
            minW="200px"
          >
            {collection.items.map((item) => (
              <SelectItem
                key={item.value}
                item={item}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: "blue.50", color: "blue.700" }}
                _selected={{ bg: "blue.600", color: "white" }}
              >
                <HStack gap={2}>
                  {item.icon && <Icon as={item.icon} boxSize="4" flexShrink={0} />}
                  <Text fontSize="xs" fontWeight="medium">{item.label}</Text>
                </HStack>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </SelectRoot>
    </Box>
  );
}

import { Button, HStack, Icon, Input, Text, VStack, Badge, Box } from "@chakra-ui/react";
import { Search, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { GenericSearchFilterProps } from "@/interface/props/ui/GenericFilterBarProps";

export const GenericSearchFilter = ({
  label,
  placeholder = "Search...",
  count = 0,
  onSearch,
  onReset
}: GenericSearchFilterProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleClear = () => {
    setInputValue("");
    onReset();
  };

  return (
    <VStack align="start" gap={1.5} flex={1}>
      <HStack width="full" justify="space-between" px={1}>
        <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
          {label}
        </Text>
        {count > 0 && (
          <Badge variant="subtle" colorPalette="blue" size="sm" borderRadius="md">
            {count} Results
          </Badge>
        )}
      </HStack>

      <HStack gap={2} width="full">
<HStack
          flex={1}
          bg="bg.panel"
          borderWidth="1px"
          borderColor="border.subtle"
          borderRadius="xl"
          px={3}
          h="10"
          transition="all 0.2s"
          _focusWithin={{
            borderColor: "blue.500",
            outline: "1px solid",
            outlineColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)"
          }}
        >
          <Icon color="fg.muted" size="sm">
            <Search size={14} />
          </Icon>
          <Input
            variant="flushed"
            placeholder={placeholder}
            fontSize="sm"
            flex={1}
            h="full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch(inputValue)}
          />
<Box borderLeftWidth="1px" borderColor="border.subtle" h="20px" mx={1} />
          <Button
            size="xs"
            variant="ghost"
            colorPalette="blue"
            fontWeight="bold"
            h="7"
            onClick={() => onSearch(inputValue)}
          >
            Search
          </Button>
        </HStack>
<Button
          size="sm"
          variant="outline"
          h="10"
          w="10"
          borderRadius="xl"
          onClick={handleClear}
          _hover={{
            bg: "red.50",
            color: "red.600",
            borderColor: "red.200"
          }}
          transition="all 0.2s"
        >
          <RotateCcw size={14} />
        </Button>
      </HStack>
    </VStack>
  );
};

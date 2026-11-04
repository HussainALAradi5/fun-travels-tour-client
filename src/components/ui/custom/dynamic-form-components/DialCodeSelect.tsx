import { Box, Group, HStack, Image, Input, Portal, Select, Text } from "@chakra-ui/react";
import { Search } from "lucide-react";
import type { DialCodeSelectProps } from "@/interfaces/props/ui/DialCodeSelectProps";

export const DialCodeSelect = ({ collection, selected, searchQuery, disabled, onSearch, onSelect }: DialCodeSelectProps) => (
  <Select.Root collection={collection} value={selected ? [String(selected.id)] : []} size="sm" disabled={disabled}
    onValueChange={(details) => onSelect(details.value[0])}
    positioning={{ placement: "bottom-start", strategy: "fixed", flip: false, gutter: 8 }}>
    <Select.HiddenSelect />
    <Select.Trigger bg="transparent" border="none" px={1} h="full" cursor="pointer" _focus={{ outline: "none" }}>
      <HStack gap={1} justify="center">
        {selected?.flagPngUrl && <Image src={selected.flagPngUrl} w="16px" h="12px" borderRadius="1px" alt="" />}
        <Text fontSize="sm" fontWeight="bold" color="fg.muted">{selected?.dialCode || "..."}</Text>
      </HStack>
    </Select.Trigger>
    <Portal>
      <Select.Positioner zIndex={9999}>
        <Select.Content borderRadius="xl" boxShadow="2xl" bg="bg.panel" p={2} minW="220px" maxH="350px">
          <Group attached mb={2}>
            <Box pl={2} display="flex" alignItems="center" color="fg.muted"><Search size={14} /></Box>
            <Input placeholder="Search country..." size="xs" variant="flushed" value={searchQuery}
              onChange={(e) => onSearch(e.target.value)} _focus={{ boxShadow: "none" }} />
          </Group>
          <Box overflowY="auto" maxH="280px">
            {collection.items.length > 0 ? collection.items.map((opt) => (
              <Select.Item item={opt} key={opt.id} cursor="pointer" borderRadius="lg" p={2} _hover={{ bg: "blue.50", _dark: { bg: "white/10" } }}>
                <HStack gap={2}>
                  <Image src={opt.flagPngUrl} w="20px" borderRadius="2px" alt="" />
                  <Text fontWeight="bold" fontSize="sm">{opt.dialCode}</Text>
                  <Text color="fg.muted" fontSize="xs" truncate>{opt.famousName}</Text>
                </HStack>
              </Select.Item>
            )) : <Text textAlign="center" py={4} fontSize="xs" color="fg.muted">No results found</Text>}
          </Box>
        </Select.Content>
      </Select.Positioner>
    </Portal>
  </Select.Root>
);

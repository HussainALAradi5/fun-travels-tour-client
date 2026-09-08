import { useMemo } from "react";
import { 
  Flex, VStack, Heading, Text, HStack, Button, Icon, Portal,
  createListCollection, SelectRoot, SelectTrigger, SelectValueText, 
  SelectContent, SelectItem, SelectPositioner 
} from "@chakra-ui/react";
import { Plus, Filter } from "lucide-react";
import { GenericStatus } from "@/enums/GenericStatus";
import type { TourHeaderProps } from "@/interface";

export const TourInventoryHeader = ({ statusFilter, onFilterChange, onCreateClick }: TourHeaderProps) => {
  const statusCollection = useMemo(() => 
    createListCollection({
      items: [
        { label: "All Statuses", value: "ALL" },
        { label: "Active", value: GenericStatus.ACTIVE },
        { label: "Pending", value: GenericStatus.PENDING },
        { label: "Approved", value: GenericStatus.APPROVED },
        { label: "Confirmed", value: GenericStatus.CONFIRMED },
        { label: "Completed", value: GenericStatus.COMPLETED },
        { label: "Inactive", value: GenericStatus.INACTIVE },
        { label: "Cancelled", value: GenericStatus.CANCELLED },
      ],
    }), []
  );

  return (
    <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
      <VStack align="start" gap={0}>
        <Heading size="md" fontWeight="bold" letterSpacing="tight">Catalog Oversight</Heading>
        <Text fontSize="sm" color="fg.muted">Manage expedition logistics and regional coverage.</Text>
      </VStack>

      <HStack gap={4}>
        <SelectRoot
          collection={statusCollection}
          value={statusFilter}
          onValueChange={(details) => onFilterChange(details.value)}
          size="sm"
          width="200px"
        >
          <SelectTrigger borderRadius="full">
            <HStack gap={2}>
              <Icon as={Filter} size="xs" color="fg.muted" />
              <SelectValueText placeholder="Select Status" />
            </HStack>
          </SelectTrigger>
          <Portal>
            <SelectPositioner zIndex={2000}>
              <SelectContent borderRadius="xl" bg="bg.panel">
                {statusCollection.items.map((item) => (
                  <SelectItem item={item} key={item.value} borderRadius="lg" m={1} cursor="pointer">
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPositioner>
          </Portal>
        </SelectRoot>

        <Button 
          colorPalette="blue" size="md" variant="solid" borderRadius="full" px={6}
          onClick={onCreateClick} _hover={{ transform: "translateY(-1px)" }}
        >
          <Plus size={18} style={{ marginRight: "8px" }} /> Create Tour
        </Button>
      </HStack>
    </Flex>
  );
};

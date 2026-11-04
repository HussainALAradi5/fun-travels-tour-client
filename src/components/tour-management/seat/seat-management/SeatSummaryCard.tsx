import { Box, Button, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Armchair, LayoutGrid } from "lucide-react";
import { ChairTypeColor } from "@/enums/tour-management/ChairType";
import type { SeatSummaryCardProps } from "@/interfaces/props/tour/SeatSummaryCardProps";
import { typedEntries } from "@/utilities/ObjectUtils";

export const SeatSummaryCard = ({ totalSeats, totals, onManage }: SeatSummaryCardProps) => (
  <Box w="full" bg="bg.panel" p={6} borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="sm">
    <HStack justify="space-between" flexWrap="wrap" gap={4}>
      <HStack gap={4}>
        <Box p={3} bg="blue.500/10" color="blue.500" borderRadius="xl"><LayoutGrid size={24} /></Box>
        <VStack align="start" gap={0}>
          <Text fontWeight="black" fontSize="lg">Fleet Seating Configured</Text>
          <Text fontSize="sm" color="fg.muted">{totalSeats} total seats available in this unit.</Text>
        </VStack>
      </HStack>
      <Button colorPalette="blue" size="lg" borderRadius="full" onClick={onManage} _hover={{ transform: "translateY(-2px)" }} transition="all 0.2s">
        <Armchair size={18} /> Manage Layout & Config
      </Button>
    </HStack>
    <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mt={6}>
      {typedEntries(totals).map(([type, count]) => (
        <Box key={type} p={3} borderRadius="2xl" bg="bg.muted" border="1px solid" borderColor="border.subtle">
          <Text fontSize="2xs" fontWeight="black" color="fg.muted" letterSpacing="widest" mb={1} textTransform="uppercase">{type.replace("_", " ")}</Text>
          <Text fontSize="xl" fontWeight="black" color={`${ChairTypeColor[type]}.500`}>{count}</Text>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

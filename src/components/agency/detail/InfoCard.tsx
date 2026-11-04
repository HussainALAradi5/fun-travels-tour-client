import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { InfoCardProps } from "@/interfaces/props/agency/InfoCardProps";

export function InfoCard({ icon: Icon, label, value, subValue }: InfoCardProps) {
  return (
    <HStack p={5} bg="bg.panel" borderRadius="xl" border="1px solid" borderColor="border.subtle" gap={4}>
      <Box p={2.5} bg="blue.50" _dark={{ bg: "blue.950" }} color="blue.600" borderRadius="xl"><Icon size={20} /></Box>
      <VStack align="start" gap={0}>
        <Text fontSize="2xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">{label}</Text>
        <Text fontWeight="bold" fontSize="md">{value}</Text>
        <Text fontSize="xs" color="fg.subtle">{subValue}</Text>
      </VStack>
    </HStack>
  );
}

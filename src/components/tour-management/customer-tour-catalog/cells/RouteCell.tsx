import { Box, HStack, Icon, Image, Text } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import type { RouteCellProps } from "@/interfaces/props/tour/RouteCellProps";

export const RouteCell = ({ tour }: RouteCellProps) => {
  const countries = tour.destinationCountries || [];
  if (countries.length === 0) {
    return (
      <HStack gap={1}>
        <Icon as={MapPin} size="md" color="fg.muted" />
        <Text fontSize="xs" color="fg.muted" fontStyle="italic">Direct</Text>
      </HStack>
    );
  }
  return (
    <HStack gap={1.5} maxW="200px" flexWrap="wrap">
      {countries.map((c, idx) => (
        <Box key={c.id ?? idx} title={c.officialName || c.famousName}>
          {c.flagPngUrl
            ? <Image src={c.flagPngUrl} alt={c.famousName ?? ""} w="16px" h="12px" borderRadius="xs" border="1px solid" borderColor="border.subtle" />
            : <Icon as={MapPin} size="md" color="fg.subtle" />}
        </Box>
      ))}
    </HStack>
  );
};

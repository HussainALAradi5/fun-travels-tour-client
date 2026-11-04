import { HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import type { PlaceCellProps } from "@/interfaces/props/tour/PlaceCellProps";

/** Country flag, name, and city for the origin and destination columns. */
export const PlaceCell = ({ country, cityName, icon, color }: PlaceCellProps) => (
  <VStack align="start" gap={0}>
    <HStack gap={1.5} color={color}>
      {country?.flagPngUrl && <Image src={country.flagPngUrl} alt="" w="16px" h="12px" borderRadius="md" />}
      <Text fontSize="md" fontWeight="bold">{country?.officialName || country?.famousName}</Text>
    </HStack>
    <HStack gap={1} pl={1}>
      <Icon as={icon} size="md" color="fg.muted" />
      <Text fontSize="xs" color="fg.muted">{cityName}</Text>
    </HStack>
  </VStack>
);

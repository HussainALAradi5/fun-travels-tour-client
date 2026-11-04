import { HStack, Image, Text } from "@chakra-ui/react";
import type { CountryOptionLabelProps } from "@/interfaces/props/tour/CountryOptionLabelProps";

export const CountryOptionLabel = ({ country }: CountryOptionLabelProps) => {
  const name = country.officialName || country.famousName;
  return (
    <HStack gap={2}>
      {country.flagPngUrl && <Image src={country.flagPngUrl} alt={name} w="20px" h="14px" borderRadius="xs" objectFit="cover" />}
      <Text fontSize="xs">{name}</Text>
    </HStack>
  );
};

import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import type { InfoTileProps } from "@/interfaces/props/support/InfoTileProps";

export const InfoTile = ({ label, value, icon, palette }: InfoTileProps) => (
  <Box p={5} borderRadius="2xl" bg={`${palette}.50`} _dark={{ bg: "whiteAlpha.50" }} borderWidth="1px" borderColor="border.subtle">
    <Text fontSize="2xs" fontWeight="black" color={`${palette}.600`} textTransform="uppercase" mb={2}>{label}</Text>
    <HStack><Icon as={icon} boxSize={4} color={`${palette}.500`} /><Text fontSize="sm" fontWeight="semibold">{value}</Text></HStack>
  </Box>
);

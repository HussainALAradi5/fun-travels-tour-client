import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { InfoItemProps } from "@/interface/props/ui/InfoItemProps";

export const InfoItem = ({
  icon: Icon,
  label,
  value,
  iconColor = "blue.500",
}: InfoItemProps) => {
  return (
    <VStack align="start" gap={1}>
      <HStack gap={2}>
        <Icon size={16} color={iconColor} />
        <Text
          fontWeight="bold"
          fontSize="xs"
          textTransform="uppercase"
          letterSpacing="wider"
          color="fg.muted"
        >
          {label}
        </Text>
      </HStack>
<Box fontSize="md" fontWeight="medium" pl={6}>
        {value}
      </Box>
    </VStack>
  );
};

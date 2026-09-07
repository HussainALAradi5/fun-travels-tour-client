import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { ElementType } from "react";

interface InfoItemProps {
  icon: ElementType;
  label: string;
  value: string | number | React.ReactNode;
  iconColor?: string;
}

export const InfoItem = ({
  icon: Icon,
  label,
  value,
  iconColor = "blue.500",
}: InfoItemProps) => {
  return (
    // Use VStack to ensure the label and value are perfectly aligned vertically
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
      {/* Indent the value slightly to align with the text rather than the icon */}
      <Box fontSize="md" fontWeight="medium" pl={6}>
        {value}
      </Box>
    </VStack>
  );
};
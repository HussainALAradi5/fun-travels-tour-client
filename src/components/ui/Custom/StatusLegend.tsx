import { HStack, Circle, Text, Stack } from "@chakra-ui/react";
import type { StatusLegendProps } from "@/interface/props/ui/StatusLegendProps";

export const StatusLegend = ({ colorMap, title }: StatusLegendProps) => (
  <Stack gap={3}>
    {title && (
      <Text fontSize="2xs" fontWeight="black" textTransform="uppercase" letterSpacing="widest" color="fg.muted">
        {title}
      </Text>
    )}
    <HStack gap={6} flexWrap="wrap" p={4} bg="bg.muted" borderRadius="2xl" border="1px solid" borderColor="border.subtle">
      {Object.entries(colorMap).map(([key, value]) => {
        const colorName = typeof value === 'string' ? value : (value.light?.split('.')[0] || 'gray');

        return (
          <HStack key={key} gap={2}>
            <Circle
              size="3"
              bg={`${colorName}.500`}
              _dark={{ bg: `${colorName}.400` }}
              shadow={`0 0 10px var(--chakra-colors-${colorName}-500)`}
            />
            <Text fontSize="xs" fontWeight="bold" textTransform="capitalize">
              {key.toLowerCase().replace('_', ' ')}
            </Text>
          </HStack>
        );
      })}
    </HStack>
  </Stack>
);

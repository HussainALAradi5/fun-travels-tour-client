import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import type { MetricCardProps } from "@/interface/props/ui/MetricCardProps";
import { ComponentVariant } from "@/enums/ComponentVariant";

export const MetricCard = ({ label, value, helperText, icon, colorPalette = "blue", variant = ComponentVariant.OUTLINE }: MetricCardProps) => (
  <Box borderWidth={variant === "outline" ? "1px" : "0"} borderRadius="2xl" bg={variant === "solid" ? `${colorPalette}.600` : variant === "subtle" ? `${colorPalette}.50` : "bg.panel"} color={variant === "solid" ? "white" : undefined} p={5} shadow={variant === "elevated" ? "xl" : "sm"}>
    <HStack justify="space-between" align="start">
      <VStack align="start" gap={1}>
        <Text color="fg.muted" fontSize="sm" fontWeight="medium">{label}</Text>
        <Heading size="2xl">{value}</Heading>
        {helperText && <Text color={`${colorPalette}.600`} fontSize="xs">{helperText}</Text>}
      </VStack>
      {icon && <Box p={3} borderRadius="xl" bg={`${colorPalette}.50`} color={`${colorPalette}.600`}><Icon as={icon} boxSize={5} /></Box>}
    </HStack>
  </Box>
);

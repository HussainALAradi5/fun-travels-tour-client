import { Box, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { Inbox } from "lucide-react";
import type { EmptyStateProps } from "@/interface/props/ui/EmptyStateProps";
import { ComponentVariant } from "@/enums/ComponentVariant";

export const EmptyState = ({ title, description, icon = Inbox, action, variant = ComponentVariant.SUBTLE }: EmptyStateProps) => (
  <VStack gap={4} py={10} px={6} textAlign="center" borderWidth={variant === "outline" ? "1px" : "0"} borderStyle="dashed" borderRadius="2xl" bg={variant === "solid" ? "blue.600" : variant === "subtle" ? "bg.muted" : "bg.panel"} color={variant === "solid" ? "white" : undefined} shadow={variant === "elevated" ? "lg" : undefined}>
    <Box bg="blue.50" color="blue.600" borderRadius="full" p={4}>
      <Icon as={icon} boxSize={7} />
    </Box>
    <VStack gap={1}>
      <Heading size="md">{title}</Heading>
      {description && <Text color="fg.muted" maxW="md">{description}</Text>}
    </VStack>
    {action}
  </VStack>
);

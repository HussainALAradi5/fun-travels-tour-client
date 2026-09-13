import { Box, VStack, HStack } from "@chakra-ui/react";
import type { ContentCardProps } from "@/interface/props/ui/ContentCardProps";
import { ComponentVariant } from "@/enums/ComponentVariant";

export const ContentCard = ({
  header,
  footer,
  children,
  w,
  border,
  borderColor,
  bg,
  p,
  onClick,
  variant = ComponentVariant.OUTLINE,
}: ContentCardProps) => {
  return (
    <Box
      borderWidth={variant === "outline" ? "1px" : "0"}
      borderRadius="2xl"
      overflow="hidden"
      bg={bg ?? (variant === "solid" ? "blue.600" : variant === "subtle" ? "bg.muted" : "bg.panel")}
      color={variant === "solid" ? "white" : undefined}
      shadow={variant === "elevated" ? "xl" : "sm"}
      transition="all 0.2s"
      w={w}
      border={border}
      borderColor={borderColor}
      p={p}
      onClick={onClick}
    >
      <Box p={6}>
        {header && (
          <HStack justify="space-between" mb={6} width="full">
            {header}
          </HStack>
        )}
        <VStack align="stretch" gap={4}>
          {children}
        </VStack>
        {footer && (
          <Box mt={6} pt={4} borderTopWidth="1px">
            {footer}
          </Box>
        )}
      </Box>
    </Box>
  );
};

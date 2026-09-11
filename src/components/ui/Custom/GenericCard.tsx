import { Box, VStack, HStack } from "@chakra-ui/react";
import type { GenericCardProps } from "@/interface/props/ui/GenericCardProps";

export const GenericCard = ({
  header,
  footer,
  children,
  w,
  border,
  borderColor,
  bg,
  p,
  onClick,
}: GenericCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={bg ?? "bg.panel"}
      shadow="sm"
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

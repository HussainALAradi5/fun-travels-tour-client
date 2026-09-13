import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

import type { AuthShellProps } from "@/interface/props/ui/AuthShellProps";

export const AuthShell = ({
  children,
  title,
  subtitle,
  maxWidth = "md",
}: AuthShellProps) => (
  <Box bg={useColorModeValue("gray.50", "gray.950")} minH="100vh" py={20}>
    <Container maxW={maxWidth}>
      <VStack
        gap={8}
        align="stretch"
        p={8}
        bg={useColorModeValue("white", "gray.900")}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <VStack align="center" gap={2}>
          <Heading size="2xl">{title}</Heading>
          <Text color="fg.muted">{subtitle}</Text>
        </VStack>
        {children}
      </VStack>
    </Container>
  </Box>
);

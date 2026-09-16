import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";

import type { AuthShellProps } from "@/interface/props/ui/AuthShellProps";

export const AuthShell = ({
  children,
  title,
  subtitle,
  maxWidth = "md",
}: AuthShellProps) => (
  <Box bg={{ base: "gray.50", _dark: "gray.950" }} minH="100vh" py={20}>
    <Container maxW={maxWidth}>
      <VStack
        gap={8}
        align="stretch"
        p={8}
        bg={{ base: "white", _dark: "gray.900" }}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor={{ base: "gray.200", _dark: "gray.700" }}
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

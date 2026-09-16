import { Box, Container, Stack, Text, Link, Flex } from "@chakra-ui/react";

interface FooterProps {
  currentYear: number;
}

export const Footer = ({ currentYear }: FooterProps) => {
  return (
    <Box
      as="footer"
      bg={{ base: "gray.50", _dark: "gray.950" }}
      borderTop="1px"
      borderColor={{ base: "gray.200", _dark: "gray.800" }}
      py={10}
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={8}
          textAlign={{ base: "center", md: "left" }}
        >
          <Stack direction="column" gap={1}>
            <Text fontSize="xl" fontWeight="bold" color="blue.500">
              FunTravel
            </Text>
            <Text fontSize="sm" color="gray.500">
              Making your journey unforgettable since 2026.
            </Text>
          </Stack>

          <Stack
            direction="row"
            gap={{ base: 4, md: 8 }}
            flexWrap="wrap"
            justify="center"
          >
            <Link href="#" fontSize="sm" _hover={{ color: "blue.500" }}>
              Destinations
            </Link>
            <Link href="#" fontSize="sm" _hover={{ color: "blue.500" }}>
              Agencies
            </Link>
            <Link href="#" fontSize="sm" _hover={{ color: "blue.500" }}>
              Privacy
            </Link>
            <Link href="#" fontSize="sm" _hover={{ color: "blue.500" }}>
              Contact
            </Link>
          </Stack>

          <Text fontSize="sm" color="gray.400">
            &copy; {currentYear} FunTravel Tour.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

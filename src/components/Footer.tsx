import { Box, Container, Stack, Text, Link, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.950");
  const borderColor = useColorModeValue("gray.200", "gray.800");

  return (
    <Box
      as="footer"
      bg={bgColor}
      borderTop="1px"
      borderColor={borderColor}
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
            &copy; {new Date().getFullYear()} FunTravel Tour.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

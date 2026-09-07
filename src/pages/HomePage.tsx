import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

export const HomePage = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.950")}
      color={useColorModeValue("gray.800", "white")}
    >
      <Container maxW="container.xl" py={{ base: 12, md: 24 }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={12}
          align="center"
        >
          <VStack
            align={{ base: "center", md: "start" }}
            textAlign={{ base: "center", md: "left" }}
            gap={6}
            flex={1}
          >
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              lineHeight="1.1"
              fontWeight="extrabold"
            >
              Explore the World <br />
              <Text as="span" color="blue.500">
                Without Limits
              </Text>
            </Heading>
            <Text fontSize="lg" color="gray.500" maxW="500px">
              Connect with top-tier travel agencies, find local branches in your
              city, and plan your dream vacation with our global network of
              travel experts.
            </Text>
            <Stack
              direction={{ base: "column", sm: "row" }}
              gap={4}
              width={{ base: "full", sm: "auto" }}
            >
                         </Stack>
          </VStack>

          <Box flex={1} width="full" position="relative">
            <Image
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
              alt="Beautiful travel destination"
              borderRadius="3xl"
              boxShadow="2xl"
              objectFit="cover"
              height={{ base: "300px", md: "500px" }}
              width="full"
            />
          </Box>
        </Stack>
      </Container>

      <Box bg={useColorModeValue("gray.50", "gray.900")} py={16}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
            <FeatureCard
              title="Verified Agencies"
              desc="We partner with over 500+ licensed travel agencies globally."
            />
            <FeatureCard
              title="Global Support"
              desc="Access support in over 40 countries and 200+ major cities."
            />
            <FeatureCard
              title="Best Price"
              desc="Compare rates between branches to get the best deal for your trip."
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ title, desc }: { title: string; desc: string }) => (
  <VStack
    align="start"
    p={8}
    bg={useColorModeValue("white", "gray.800")}
    borderRadius="xl"
    boxShadow="sm"
    gap={3}
    border="1px solid"
    borderColor={useColorModeValue("gray.100", "gray.700")}
  >
    <Heading size="md" color="blue.500">
      {title}
    </Heading>
    <Text color="gray.500">{desc}</Text>
  </VStack>
);

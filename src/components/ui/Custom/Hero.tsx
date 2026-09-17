import { Box, Container, Heading, Text, Button, VStack, Image } from "@chakra-ui/react";
import type { HeroProps } from "@/interface/props/ui/HeroProps";

export const Hero = ({
  title,
  subtitle,
  imageUrl,
  onActionClick,
  showAction = true,
  buttonText = "Get Started"
}: HeroProps) => {
  const backgroundSource = imageUrl || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000";

  return (
    <Box
      position="relative"
      borderRadius={{ base: "2xl", md: "3xl" }}
      mx={{ base: 3, md: 4 }}
      mt={{ base: 3, md: 4 }}
      mb={{ base: 6, md: 12 }}
      overflow="hidden"
      minH={{ base: "360px", sm: "420px", md: "500px" }}
      display="flex"
      alignItems="center"
      boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    >
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0}>
        <Image src={backgroundSource} alt="Hero" objectFit="cover" w="full" h="full" />
        <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="blackAlpha.400" />
        <Box
          position="absolute"
          top={0} left={0} right={0} bottom={0}
          bgGradient="linear(to-r, blackAlpha.800 0%, blackAlpha.200 50%, transparent 100%)"
        />
      </Box>

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 6, sm: 8, md: 12 }}>
        <VStack gap={{ base: 4, md: 6 }} align="flex-start" maxW="3xl">
          <Heading
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            fontWeight="900"
            color="white"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            lineHeight="1.1"
            letterSpacing="-0.04em"
            textShadow="0 4px 12px rgba(0,0,0,0.5)"
          >
            {title}
          </Heading>

          <Text
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color="whiteAlpha.900"
            fontWeight="500"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            maxW="xl"
            lineHeight="relaxed"
            textShadow="0 2px 8px rgba(0,0,0,0.4)"
          >
            {subtitle}
          </Text>
{showAction && (
            <Button
              size="xl"
              bg="blue.600"
              color="white"
              rounded="full"
              px={10}
              fontSize="md"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="wider"
              boxShadow="0 10px 25px -5px rgba(37, 99, 235, 0.6)"
              _hover={{
                bg: "blue.500",
                transform: "translateY(-2px)",
                boxShadow: "0 20px 30px -10px rgba(37, 99, 235, 0.7)"
              }}
              onClick={onActionClick}
            >
              {buttonText}
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

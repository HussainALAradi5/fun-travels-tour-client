import { Box, Container } from "@chakra-ui/react";
import { Hero } from "@/components/ui/Custom/Hero";
import type { PageWrapperProps } from "@/interface/props/ui/PageWrapperProps";

export const PageWrapper = ({
  title,
  subtitle = "",
  children,
  imageUrl,
  showAction = false,
  onActionClick,
  buttonText
}: PageWrapperProps) => {
  return (
    <Box pb={20} bg="bg.canvas" minH="100vh">
      <Hero
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl}
        showAction={showAction}
        onActionClick={onActionClick}
        buttonText={buttonText}
      />

      <Container
        maxW="7xl"
        px={{ base: 3, md: 4 }}
        mt={{ base: "-36px", md: "-80px" }}
        position="relative"
        zIndex={10}
      >
        <Box
          bg="bg.panel"
          p={{ base: 3, sm: 4, md: 6 }}
          borderRadius={{ base: "2xl", md: "3xl" }}
          shadow="2xl"
          borderWidth="1px"
          borderColor="border.subtle"
          backdropFilter="blur(10px)"
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

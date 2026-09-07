// src/components/ui/Layout/PageWrapper.tsx
import { Box, Container } from "@chakra-ui/react";
import { Hero } from "@/components/ui/Custom/Hero";

interface PageWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  imageUrl?: string;
  showAction?: boolean; // Pass-through prop
  onActionClick?: () => void;
  buttonText?: string;
}

export const PageWrapper = ({ 
  title, 
  subtitle = "", 
  children, 
  imageUrl, 
  showAction = false, // Defaulted to false as per your usual dashboard needs
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
        mt="-80px" 
        position="relative" 
        zIndex={10}
      >
        <Box 
          bg="bg.panel" 
          p={6} 
          borderRadius="3xl" 
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
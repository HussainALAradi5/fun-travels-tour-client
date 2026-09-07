// src/pages/TourMangement/TourEditPage.tsx
import { Container, Box } from "@chakra-ui/react";
import { floatIn } from "@/utilities/Animations";
import { EditTour } from "@/components/TourManagement/Tour/TourEdit";

export const TourEditPage = () => {
  return (
    <Box 
      bg="bg.canvas" 
      minH="100vh" 
      py={10} 
      animation={`${floatIn} 0.5s ease-out`}
    >
      <Container maxW="5xl">
        {/* This is the functional component we built that handles status logic */}
        <EditTour />
      </Container>
    </Box>
  );
};

export default TourEditPage;
import { Container, Box } from "@chakra-ui/react";
import { floatIn } from "@/utilities/Animations";
import { TourCreate } from "@/components/TourManagement/Tour/TourCreate";

export const TourCreatePage = () => {
  return (
    <Box
      bg="bg.canvas"
      minH="100vh"
      py={10}
      animation={`${floatIn} 0.5s ease-out`}
    >
      <Container maxW="5xl">
<TourCreate />
      </Container>
    </Box>
  );
};

export default TourCreatePage;

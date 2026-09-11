import { Container, Box } from "@chakra-ui/react";
import { floatIn } from "@/utilities/Animations";
import { TransportationCreate } from "@/components/TourManagement/Transportation/TransportationCreate";

export const TransportationCreatePage = () => {
  return (
    <Box
      bg="bg.canvas"
      minH="100vh"
      py={10}
      animation={`${floatIn} 0.5s ease-out`}
    >
      <Container maxW="5xl">
        <TransportationCreate />
      </Container>
    </Box>
  );
};

export default TransportationCreatePage;

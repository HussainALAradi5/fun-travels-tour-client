// src/pages/TourMangement/TransportationDetailsPage.tsx
import { TransportationDetails } from "@/components/TourManagement/Transportation/TransporationDetails";
import { Box } from "@chakra-ui/react";

export const TransportationDetailsPage = () => {
  return (
    <Box minH="100vh" bg="bg.canvas">
       <TransportationDetails />
    </Box>
  );
};

export default TransportationDetailsPage;
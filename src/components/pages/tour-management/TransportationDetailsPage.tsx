import { TransportationDetails } from "@/components/tour-management/transportation/TransportationDetails";
import { Box } from "@chakra-ui/react";

export const TransportationDetailsPage = () => {
  return (
    <Box minH="100vh" bg="bg.canvas">
       <TransportationDetails />
    </Box>
  );
};

export default TransportationDetailsPage;

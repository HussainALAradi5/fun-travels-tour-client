import { PaymentDetails } from "@/components/payments/PaymentDetails";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export const PaymentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box minH="100vh" bg="bg.canvas">
       <PaymentDetails paymentId={Number(id)} />
    </Box>
  );
};

export default PaymentDetailsPage;
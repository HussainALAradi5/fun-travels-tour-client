import { PaymentDetails } from "@/components/payments/PaymentDetails";
import { Box } from "@chakra-ui/react";
import { useParams } from "@/lib/navigation";

export const PaymentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box minH="100vh" bg="bg.canvas">
       <PaymentDetails paymentId={Number(id)} />
    </Box>
  );
};

export default PaymentDetailsPage;

import { PaymentDetails } from "@/components/payments/PaymentDetails";
import { Box } from "@chakra-ui/react";
import { useParams } from "@/lib/navigation";

export const PaymentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const paymentId = Number(id);

  return (
    <Box minH="100vh" bg="bg.canvas">
       {Number.isInteger(paymentId) && paymentId > 0 ? (
         <PaymentDetails paymentId={paymentId} />
       ) : null}
    </Box>
  );
};

export default PaymentDetailsPage;

import { PaymentTable } from "@/components/payments/PaymentTable";
import { Box } from "@chakra-ui/react";

export const PaymentTablePage = () => {
  return (
    <Box minH="100vh" bg="bg.canvas">
       <PaymentTable />
    </Box>
  );
};

export default PaymentTablePage;
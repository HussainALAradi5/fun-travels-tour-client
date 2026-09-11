import { TransactionDetails } from "@/components/transactions/TransactionDetails";
import { Box } from "@chakra-ui/react";
import { useParams } from "@/lib/navigation";

export const TransactionDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box minH="100vh" bg="bg.canvas">
       <TransactionDetails transactionId={Number(id)} />
    </Box>
  );
};

export default TransactionDetailsPage;

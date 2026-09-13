import { TransactionTable } from "@/components/transactions/TransactionTable";
import { Box } from "@chakra-ui/react";

export const TransactionTablePage = () => {
  return (
    <Box minH="100vh" bg="bg.canvas">
       <TransactionTable />
    </Box>
  );
};

export default TransactionTablePage;
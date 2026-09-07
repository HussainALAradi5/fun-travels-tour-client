import { VStack, HStack, Text, Box, Separator, Badge, Card, Heading, Icon, Button, Center, Spinner } from "@chakra-ui/react";
import { ArrowLeft, CheckCircle2, Download, Info } from "lucide-react";
import { useTransaction } from "@/hooks/useTransaction";
import { useNavigate } from "react-router-dom";

export const TransactionDetails = ({ transactionId }: { transactionId: number }) => {
  const { transaction: tx, isLoading } = useTransaction(transactionId);
  const navigate = useNavigate();

  if (isLoading) return <Center h="400px"><Spinner /></Center>;
  if (!tx) return <Center h="400px"><Text>Transaction not found.</Text></Center>;

  const isPos = tx.amount > 0;

  return (
    <Box p={6}>
      <Button variant="ghost" mb={6} onClick={() => navigate(-1)} gap={2}>
        <ArrowLeft size={16} /> Back to Ledger
      </Button>

      <Card.Root maxW="lg" mx="auto" variant="elevated" borderRadius="3xl" overflow="hidden">
        <Box bg={isPos ? "green.600" : "blue.600"} p={10} color="white" textAlign="center">
          <VStack gap={2}>
            <Text fontSize="xs" fontWeight="bold" opacity={0.8} letterSpacing="widest">AMOUNT</Text>
            <Heading size="4xl" fontWeight="black">
              {isPos ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
            </Heading>
            <Badge variant="solid" bg="white/20" color="white" borderRadius="full" mt={2}>
              {tx.type}
            </Badge>
          </VStack>
        </Box>

        <Card.Body p={8}>
          <VStack align="stretch" gap={5}>
             <HStack justify="space-between">
                <Text color="fg.muted" fontSize="sm">Ref Number</Text>
                <Text fontWeight="bold">#{tx.id}</Text>
             </HStack>
             <HStack justify="space-between">
                <Text color="fg.muted" fontSize="sm">Date</Text>
                <Text fontWeight="bold">
                  {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : "N/A"}
                </Text>
             </HStack>
             <Separator />
             <VStack align="start" gap={2}>
                <HStack color="fg.muted">
                   <Icon as={Info} size="xs" />
                   <Text fontSize="xs" fontWeight="bold">DESCRIPTION</Text>
                </HStack>
                <Box p={4} bg="bg.subtle" borderRadius="xl" w="full" borderLeft="4px solid" borderColor="blue.500">
                   <Text fontSize="sm">{tx.description || "No description provided."}</Text>
                </Box>
             </VStack>
             <Button colorPalette="blue" borderRadius="xl" gap={2} mt={4}>
                <Download size={16} /> Download Receipt
             </Button>
             <HStack justify="center" pt={2} opacity={0.6}>
                <CheckCircle2 size={12} color="green" />
                <Text fontSize="10px" fontWeight="bold">VERIFIED TRANSACTION</Text>
             </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};
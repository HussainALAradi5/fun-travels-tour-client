import { VStack, HStack, Text, Box, Separator, Badge, Card, Heading, Icon, Button, Center, Spinner } from "@chakra-ui/react";
import { ArrowLeft, CheckCircle2, Download, CreditCard, CalendarClock, Ticket } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { useNavigate } from "react-router-dom";

export const PaymentDetails = ({ paymentId }: { paymentId: number }) => {
  const { payment: p, isLoading } = usePayment(paymentId);
  const navigate = useNavigate();

  if (isLoading) return <Center h="400px"><Spinner size="xl" /></Center>;
  if (!p) return <Center h="400px"><Text>Payment not found.</Text></Center>;

  const isSuccess = p.status === "COMPLETED";

  return (
    <Box p={6}>
      <Button variant="ghost" mb={6} onClick={() => navigate(-1)} gap={2}>
        <ArrowLeft size={16} /> Back to Payments
      </Button>

      <Card.Root maxW="lg" mx="auto" variant="elevated" borderRadius="3xl" overflow="hidden">
<Box bg={isSuccess ? "green.600" : p.status === "FAILED" ? "red.600" : "yellow.600"} p={10} color="white" textAlign="center">
          <VStack gap={2}>
            <Text fontSize="xs" fontWeight="bold" opacity={0.8} letterSpacing="widest">PAYMENT AMOUNT</Text>
            <Heading size="4xl" fontWeight="black">${Number(p.amount).toFixed(2)}</Heading>
            <Badge mt={2} colorPalette="white" variant="solid" bg="white/20" size="lg" borderRadius="full" px={4}>
               {p.status}
            </Badge>
          </VStack>
        </Box>
<Card.Body p={8} bg="bg.panel">
          <VStack align="stretch" gap={5}>
            <HStack justify="space-between">
              <Text color="fg.muted" fontSize="sm">Stripe Ref ID</Text>
              <Text fontWeight="bold">{p.transactionId || "N/A"}</Text>
            </HStack>

            <HStack justify="space-between">
              <Text color="fg.muted" fontSize="sm">Payment Method</Text>
              <HStack>
                <Icon as={CreditCard} size="xs" />
                <Text fontWeight="bold">{p.method.replace("_", " ")}</Text>
              </HStack>
            </HStack>

            <HStack justify="space-between">
              <Text color="fg.muted" fontSize="sm">Timestamp</Text>
              <HStack>
                <Icon as={CalendarClock} size="xs" />
                <Text fontWeight="bold">
                  {p.paymentDate ? new Date(p.paymentDate).toLocaleString() : "N/A"}
                </Text>
              </HStack>
            </HStack>

            {p.reservation && (
              <>
                <Separator my={2} />
                <HStack justify="space-between" bg="blue.50" _dark={{ bg: "blue.900" }} p={4} borderRadius="xl">
                  <VStack align="start" gap={0}>
                    <Text color="blue.600" _dark={{ color: "blue.300" }} fontSize="xs" fontWeight="bold">LINKED TOUR RESERVATION</Text>
                    <Text fontWeight="bold">#{p.reservation.reservationNumber}</Text>
                  </VStack>
                  <Icon as={Ticket} color="blue.500" />
                </HStack>
              </>
            )}

            <Button colorPalette="blue" borderRadius="xl" gap={2} mt={4} variant="outline">
               <Download size={16} /> Download Gateway Receipt
            </Button>

            <HStack justify="center" pt={2} opacity={0.6}>
               <Icon as={CheckCircle2} color="green.500" />
               <Text fontSize="10px" fontWeight="bold">SECURE ENCRYPTED PAYMENT</Text>
            </HStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

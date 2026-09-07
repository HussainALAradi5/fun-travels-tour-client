import { useMemo } from "react";
import { Badge, IconButton, Icon, HStack, Text, VStack } from "@chakra-ui/react";
import { Eye, Calendar, CreditCard, Landmark, CheckCircle, XCircle, Clock } from "lucide-react";
import { GenericTable, type Column } from "@/components/ui/Custom/GenericTable";
import { usePayment } from "@/hooks/usePayment";
import type { Payment } from "@/interface/PaymentInterface";
import { PaymentStatusColors, PaymentMethodColors } from "@/constants/roles/Colors";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export const PaymentTable = () => {
  const { payments, isLoading } = usePayment();
  const navigate = useNavigate();

  // Helper to add nice icons next to the status text
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED": return CheckCircle;
      case "FAILED": return XCircle;
      case "PENDING": return Clock;
      default: return CheckCircle;
    }
  };

  const columns = useMemo<Column<Payment>[]>(() => [
    {
      header: "Stripe Ref ID",
      key: "transactionId",
      render: (p) => (
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="sm">{p.transactionId || "N/A"}</Text>
          <Text color="fg.muted" fontSize="xs">Local ID: #{p.id}</Text>
        </VStack>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (p) => (
        <Text fontWeight="bold" fontSize="md">${Number(p.amount).toFixed(2)}</Text>
      ),
    },
    {
      header: "Method",
      key: "method",
      render: (p) => (
        <HStack color="fg.muted" fontSize="sm">
          <Icon 
            as={p.method === "CREDIT_CARD" ? CreditCard : Landmark} 
            size="xs" 
            color={PaymentMethodColors[p.method] || "gray"} 
          />
          <Text fontWeight="medium">{p.method?.replace("_", " ") || "UNKNOWN"}</Text>
        </HStack>
      ),AC
    },
    {
      header: "Status",
      key: "status",
      render: (p) => (
        <Badge 
          colorPalette={PaymentStatusColors[p.status] || "gray"} 
          variant="subtle" 
          px={3} 
          py={1} 
          borderRadius="full"
        >
          <Icon as={getStatusIcon(p.status)} mr={1} size="xs" />
          {p.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      key: "paymentDate",
      render: (p) => (
        <HStack fontSize="sm" color="fg.muted">
          <Icon as={Calendar} size="xs" color="blue.500" />
          <Text>{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "N/A"}</Text>
        </HStack>
      ),
    },
    {
      header: "View",
      key: "actions",
      render: (p) => (
        <IconButton 
          size="sm" 
          variant="ghost" 
          colorPalette="blue" 
          borderRadius="full"
          onClick={() => navigate(`/payments/${p.id}`)}
        >
          <Eye size={18} />
        </IconButton>
      ),
    },
  ], [navigate]);

  return (
    <PageWrapper 
      title="Payment Gateway History" 
      subtitle="View all external Stripe and PayPal processing attempts."
    >
      <GenericTable 
        columns={columns} 
        data={payments || []} 
        loading={isLoading} 
        searchPlaceholder="Search by Ref ID..." 
      />
    </PageWrapper>
  );
};

export default PaymentTable;
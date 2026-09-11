import { useMemo } from "react";
import { Badge, IconButton, Icon, HStack, Text, VStack } from "@chakra-ui/react";
import { Eye, ReceiptText, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { GenericTable, type Column } from "@/components/ui/Custom/GenericTable";
import { useTransaction } from "@/hooks/useTransaction";
import type { Transaction } from "@/interface/payment/Transaction";
import { TransactionTypeColors } from "@/constants/roles/Colors";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/ui/Custom/PageWrapper";

export const TransactionTable = () => {
  const { transactions, isLoading } = useTransaction();
  const navigate = useNavigate();

  const columns = useMemo<Column<Transaction>[]>(() => [
    {
      header: "Ref & Memo",
      key: "id",
      render: (t) => (
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" fontSize="sm">#{t.id}</Text>
          <HStack color="fg.muted" fontSize="xs" gap={1}>
            <Icon as={ReceiptText} size="xs" />
            <Text truncate maxW="150px">{t.description || "No description"}</Text>
          </HStack>
        </VStack>
      ),
    },
    {
      header: "Amount",
      key: "amount",
      render: (t) => {
        const isPos = t.amount > 0;
        return (
          <HStack color={isPos ? "green.600" : "red.600"} fontWeight="bold">
            <Icon as={isPos ? ArrowUpRight : ArrowDownRight} size="xs" />
            <Text fontSize="md">${Math.abs(t.amount).toFixed(2)}</Text>
          </HStack>
        );
      },
    },
    {
      header: "Category",
      key: "type",
      render: (t) => (
        <Badge colorPalette={TransactionTypeColors[t.type] || "gray"} variant="subtle" px={3} borderRadius="full">
          {t.type}
        </Badge>
      ),
    },
    {
      header: "Date",
      key: "timestamp",
      render: (t) => (
        <HStack fontSize="sm" color="fg.muted">
          <Icon as={Calendar} size="xs" color="blue.500" />
          <Text>{t.timestamp ? new Date(t.timestamp).toLocaleDateString() : "N/A"}</Text>
        </HStack>
      ),
    },
    {
      header: "View",
      key: "actions",
      render: (t) => (
        <IconButton 
          size="sm" variant="ghost" colorPalette="blue" borderRadius="full"
          onClick={() => navigate(`/transactions/${t.id}`)}
        >
          <Icon as={Eye} />
        </IconButton>
      ),
    },
  ], [navigate]);

  return (
    <PageWrapper title="Financial Ledger" subtitle="Overview of all transactions">
      <GenericTable data={transactions} columns={columns} loading={isLoading} colorPalette="blue" enableExport />
    </PageWrapper>
  );
};




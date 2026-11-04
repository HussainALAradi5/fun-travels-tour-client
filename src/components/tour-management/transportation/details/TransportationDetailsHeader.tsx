import { Breadcrumb, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import type { TransportationDetailsSectionProps } from "@/interfaces/props/tour/TransportationDetailsSectionProps";
import { useNavigate } from "@/lib/navigation";

const INVENTORY_PATH = "/admin/transports";

export const TransportationDetailsHeader = ({ id, transport, themeColor }: TransportationDetailsSectionProps) => {
  const navigate = useNavigate();
  return (
    <VStack align="start" gap={6} mb={8}>
      <Breadcrumb.Root color="fg.muted" fontSize="sm">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link onClick={() => navigate("/")} display="flex" alignItems="center" gap={1}><Home size={14} /> Admin</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator><ChevronRight size={12} /></Breadcrumb.Separator>
          <Breadcrumb.Item><Breadcrumb.Link onClick={() => navigate(INVENTORY_PATH)}>Inventory</Breadcrumb.Link></Breadcrumb.Item>
          <Breadcrumb.Separator><ChevronRight size={12} /></Breadcrumb.Separator>
          <Breadcrumb.Item><Text fontWeight="bold" color={`${themeColor}.500`}>{transport?.code || `Unit #${id}`}</Text></Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <HStack justify="space-between" w="full">
        <VStack align="start" gap={1}>
          <Heading size="xl" fontWeight="black" letterSpacing="tight">Control Center</Heading>
          <Text color="fg.muted">Operational oversight for {transport?.providerName} - {transport?.transportationNumber}</Text>
        </VStack>
        <Button variant="subtle" size="sm" onClick={() => navigate(INVENTORY_PATH)} colorPalette="gray" borderRadius="full">
          <ChevronLeft size={16} /> Back
        </Button>
      </HStack>
    </VStack>
  );
};

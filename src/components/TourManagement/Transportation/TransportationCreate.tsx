import { useMemo, useState } from "react";
import { Box, Heading, Text, VStack, Button, HStack, Icon, Separator, Badge } from "@chakra-ui/react";
import { useNavigate } from "@/lib/navigation";
import { Star, Accessibility, Baby, ChevronLeft, Rocket, Info } from "lucide-react";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { FieldConfig } from "@/interface/common/FieldConfig";

import type { TransportationFormValues } from "@/types/tour/TransportationFormValues";
import { useAgencies } from "@/hooks/agency/useAgencies";

export const TransportationCreate = () => {
  const navigate = useNavigate();
  const { handleCreateTransportation, isMutating } = useTourManagement();
  const { agencies, loading: agenciesLoading } = useAgencies();
  const [selectedAgencyId, setSelectedAgencyId] = useState<number>();
  const selectedAgency = agencies.find((agency) => agency.id === selectedAgencyId);
  const fields = useMemo<FieldConfig<TransportationFormValues>[]>(() => [
    {
      name: "agencyId",
      label: "Owning Agency",
      type: "select",
      options: agencies.flatMap((agency) => agency.id ? [{ label: agency.agencyName, value: agency.id }] : []),
      isRequired: true,
      gridSpan: 1,
    },
    {
      name: "branchId",
      label: "Operating Branch",
      type: "select",
      options: (selectedAgency?.branches ?? []).flatMap((branch) =>
        branch.id ? [{ label: branch.branchName, value: branch.id }] : []),
      gridSpan: 1,
      disabled: !selectedAgencyId,
    },
    { name: "code", label: "Internal Serial", type: "text", isRequired: true, gridSpan: 1, placeholder: "e.g. BUS-2026-001" },
    { name: "transportationNumber", label: "Plate / Registration", type: "text", isRequired: true, gridSpan: 1, placeholder: "Plate Number" },
    { name: "providerName", label: "Operating Provider", type: "text", isRequired: true, gridSpan: 1, placeholder: "Agency Name" },
    {
      name: "type",
      label: "Vehicle Class",
      type: "select",
      options: Object.values(TransportationType).map(v => ({ label: v, value: v })),
      isRequired: true,
      gridSpan: 1
    },
    { name: "totalCapacity", label: "Maximum Capacity", type: "number", isRequired: true, gridSpan: 1 },
    { name: "seatConfig.PREMIUM_RECLINER" as keyof TransportationFormValues, label: "Premium Seats", type: "number", icon: Star, gridSpan: 1 },
    { name: "seatConfig.WHEELCHAIR_ACCESSIBLE" as keyof TransportationFormValues, label: "Accessible Spaces", type: "number", icon: Accessibility, gridSpan: 1 },
    { name: "seatConfig.KIDS_CHAIR" as keyof TransportationFormValues, label: "Child Safety Seats", type: "number", icon: Baby, gridSpan: 1 },
  ], [agencies, selectedAgency?.branches, selectedAgencyId]);

  const handleSubmit = async (values: TransportationFormValues) => {
    console.group("🚀 Initializing Logistics Unit");
    await handleCreateTransportation(values);
    console.groupEnd();
    navigate("/admin/transports");
  };

  return (
    <VStack align="stretch" gap={8} w="full">
<HStack justify="space-between" w="full">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/transports")}
          borderRadius="full"
        >
          <ChevronLeft size={16} /> Back to Inventory
        </Button>
        <Badge variant="subtle" colorPalette="blue" size="lg" borderRadius="full">
          Step 1: Resource Initialization
        </Badge>
      </HStack>
<VStack align="start" gap={2}>
        <HStack gap={3}>
          <Box p={2} bg="blue.500" color="white" borderRadius="xl" shadow="0 0 20px rgba(0,0,255,0.3)">
            <Rocket size={24} />
          </Box>
          <Heading size="2xl" fontWeight="black" letterSpacing="tight">
            Register Fleet Asset
          </Heading>
        </HStack>
        <Text color="fg.muted" fontSize="md" maxW="2xl">
          Define the technical specifications and seating layout for your new unit.
          Seats will be auto-generated based on the capacity provided.
        </Text>
      </VStack>

      <Separator borderColor="border.subtle" />
<Box
        w="full"
        bg="bg.panel"
        p={{ base: 6, md: 10 }}
        borderRadius="3xl"
        border="1px solid"
        borderColor="border.subtle"
        shadow="xl"
        position="relative"
        overflow="hidden"
      >
<Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="300px"
          h="300px"
          bg="blue.500/5"
          borderRadius="full"
          filter="blur(60px)"
        />

        <DynamicForm<TransportationFormValues>
          disableToast={true}
          fields={fields}
          initialValues={{
            code: "",
            transportationNumber: "",
            providerName: "",
            type: "" as TransportationFormValues["type"],
            totalCapacity: 0,
            agencyId: 0,
          }}
          onSubmit={handleSubmit}
          onFieldChange={(name, value) => {
            if (name === "agencyId") setSelectedAgencyId(typeof value === "number" ? value : Number(value));
          }}
          onCancel={() => navigate("/admin/transports")}
          isLoading={isMutating || agenciesLoading}
          submitLabel="Initialize Unit & Generate Seats"
          columns={2}
        />
<HStack mt={8} p={4} bg="bg.muted" borderRadius="2xl" gap={4} border="1px dashed" borderColor="border.emphasized">
           <Icon as={Info} color="blue.500" />
           <Text fontSize="xs" color="fg.muted">
             By clicking "Initialize", the system will calculate available space and generate individual seat records
             linked to this unit's unique code. This action cannot be reversed without deleting the unit.
           </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

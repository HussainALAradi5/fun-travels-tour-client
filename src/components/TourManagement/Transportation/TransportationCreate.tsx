import { useCallback, useMemo, useState } from "react";
import { Box, Heading, Text, VStack, Button, HStack, Icon, Separator, Badge } from "@chakra-ui/react";
import { useNavigate } from "@/lib/navigation";
import { Star, Accessibility, Baby, ChevronLeft, Rocket, Info } from "lucide-react";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import type { FieldConfig } from "@/interface/common/FieldConfig";

import type { TransportationFormValues } from "@/types/tour/TransportationFormValues";
import { transportationTypeOptions } from "@/constants/tour/transportationTypeOptions";
import { agencyService } from "@/Api/Agency/Agency";
import { branchService } from "@/Api/Agency/AgencyBranch";

export const TransportationCreate = () => {
  const navigate = useNavigate();
  const { handleCreateTransportation, isMutating } = useTourManagement();
  const [selectedAgencyId, setSelectedAgencyId] = useState<number>();

  const searchAgencies = useCallback(async (query: string, pageNumber: number) => {
    const page = await agencyService.searchAgencies(query, pageNumber);
    return {
      ...page,
      content: page.content.flatMap((agency) =>
        agency.id ? [{ label: agency.agencyName, value: agency.id }] : [],
      ),
    };
  }, []);

  const searchBranches = useCallback(async (query: string, pageNumber: number) => {
    if (!selectedAgencyId) return { content: [], page: 0, size: 20, totalElements: 0, totalPages: 0 };
    const page = await branchService.searchBranches(selectedAgencyId, query, pageNumber);
    return {
      ...page,
      content: page.content.flatMap((branch) =>
        branch.id ? [{ label: branch.branchName, value: branch.id }] : [],
      ),
    };
  }, [selectedAgencyId]);

  const fields = useMemo<FieldConfig<TransportationFormValues>[]>(() => [
    {
      name: "agencyId",
      label: "Owning Agency",
      type: "search-select",
      searchOptions: searchAgencies,
      placeholder: "Search agencies...",
      isRequired: true,
      gridSpan: 1,
      clearFieldsOnChange: ["branchId"],
    },
    {
      name: "branchId",
      label: "Operating Branch",
      type: "search-select",
      searchOptions: searchBranches,
      gridSpan: 1,
      disabled: !selectedAgencyId,
      placeholder: selectedAgencyId ? "Search branches..." : "Select an agency first",
    },
    { name: "code", label: "Internal Serial", type: "text", isRequired: true, gridSpan: 1, placeholder: "e.g. BUS-2026-001" },
    { name: "transportationNumber", label: "Plate / Registration", type: "text", isRequired: true, gridSpan: 1, placeholder: "Plate Number" },
    { name: "providerName", label: "Operating Provider", type: "text", isRequired: true, gridSpan: 1, placeholder: "Agency Name" },
    {
      name: "type",
      label: "Vehicle Class",
      type: "select",
      options: transportationTypeOptions,
      isRequired: true,
      gridSpan: 1
    },
    { name: "totalCapacity", label: "Maximum Capacity", type: "number", isRequired: true, gridSpan: 1 },
    { name: "seatConfig.PREMIUM_RECLINER" as keyof TransportationFormValues, label: "Premium Seats", type: "number", icon: Star, gridSpan: 1 },
    { name: "seatConfig.WHEELCHAIR_ACCESSIBLE" as keyof TransportationFormValues, label: "Accessible Spaces", type: "number", icon: Accessibility, gridSpan: 1 },
    { name: "seatConfig.KIDS_CHAIR" as keyof TransportationFormValues, label: "Child Safety Seats", type: "number", icon: Baby, gridSpan: 1 },
  ], [searchAgencies, searchBranches, selectedAgencyId]);

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
            seatConfig: {
              PREMIUM_RECLINER: 0,
              WHEELCHAIR_ACCESSIBLE: 0,
              KIDS_CHAIR: 0,
            },
          }}
          onSubmit={handleSubmit}
          onFieldChange={(name, value) => {
            if (name === "agencyId") setSelectedAgencyId(typeof value === "number" ? value : Number(value));
          }}
          onCancel={() => navigate("/admin/transports")}
          isLoading={isMutating}
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

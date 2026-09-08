// src/components/TourManagement/Transportation/TransportationCreate.tsx
import { Box, Heading, Text, VStack, Button, HStack, Icon, Separator, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Star, Accessibility, Baby, ChevronLeft, Rocket, Info } from "lucide-react";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { 
  DEFAULT_TRANSPORTATION, 
  type Transportation 
} from "@/interface";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";

export const TransportationCreate = () => {
  const navigate = useNavigate();
  const { handleCreateTransportation, isMutating } = useTourManagement();

  // Modern UX: Flat fields with semantic grouping
  const fields = [
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
    // Seat Config Logic (Transient fields)
    { name: "seatConfig.PREMIUM_RECLINER", label: "Premium Seats", type: "number", icon: Star, gridSpan: 1 },
    { name: "seatConfig.WHEELCHAIR_ACCESSIBLE", label: "Accessible Spaces", type: "number", icon: Accessibility, gridSpan: 1 },
    { name: "seatConfig.KIDS_CHAIR", label: "Child Safety Seats", type: "number", icon: Baby, gridSpan: 1 },
  ];

  const handleSubmit = async (values: Transportation) => {
    console.group("🚀 Initializing Logistics Unit");
    await handleCreateTransportation(values);
    console.groupEnd();
    navigate("/admin/transports");
  };

  return (
    <VStack align="stretch" gap={8} w="full">
      {/* Top Navigation Bar */}
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
      
      {/* Header Section */}
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

      {/* Main Form Panel */}
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
        {/* Subtle Background Accent */}
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

        <GenericForm<Transportation>
          disableToast={true}
          fields={fields as any}
          initialValues={DEFAULT_TRANSPORTATION as Transportation}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/transports")}
          isLoading={isMutating}
          submitLabel="Initialize Unit & Generate Seats"
          columns={2}
        />

        {/* Info Footer */}
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

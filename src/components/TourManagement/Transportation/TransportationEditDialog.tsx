import { Box, Tabs, VStack, Text } from "@chakra-ui/react";
import { Settings2, Armchair, Star, Accessibility, Baby } from "lucide-react";
import { GenericDialog } from "@/components/ui/Custom/Dialogs/GenericDialog";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import { SeatManager } from "../Seat/SeatManagement/SeatManager";
import { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { Transportation } from "@/interface/tourmanagement/TransportationInterface";

interface Props {
  open: boolean;
  onClose: () => void;
  transport: Transportation | null;
  onUpdate: (values: Transportation) => Promise<void>;
  loading: boolean;
}

export const TransportationEditDialog = ({
  open,
  onClose,
  transport,
  onUpdate,
  loading,
}: Props) => {
  if (!transport) return null;

  const editFields = [
    {
      name: "code",
      label: "Serial Code",
      type: "text",
      isRequired: true,
      gridSpan: 1,
      disabled: true,
    },
    {
      name: "transportationNumber",
      label: "Plate Registration",
      type: "text",
      isRequired: true,
      gridSpan: 1,
      disabled: true,
    },
    {
      name: "providerName",
      label: "Provider Name",
      type: "text",
      isRequired: true,
      gridSpan: 1,
      disabled: true,
    },
    {
      name: "type",
      label: "Class",
      type: "select",
      options: Object.values(TransportationType).map((v) => ({
        label: v,
        value: v,
      })),
      isRequired: true,
      gridSpan: 1,
      disabled: true,
    },
    {
      name: "totalCapacity",
      label: "Maximum Capacity",
      type: "number",
      isRequired: true,
      gridSpan: 2,
      disabled: true,
    },
    // Seating Configuration fields to sync with backend seat generation
    {
      name: "seatConfig.PREMIUM_RECLINER",
      label: "Premium Seats",
      type: "number",
      icon: Star,
      gridSpan: 1,
    },
    {
      name: "seatConfig.WHEELCHAIR_ACCESSIBLE",
      label: "Accessible Spaces",
      type: "number",
      icon: Accessibility,
      gridSpan: 1,
    },
    {
      name: "seatConfig.KIDS_CHAIR",
      label: "Child Safety Seats",
      type: "number",
      icon: Baby,
      gridSpan: 1,
    },
  ];

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title={`Edit Unit: ${transport.code}`}
      icon={Settings2}
      size="xl"
    >
      <Tabs.Root defaultValue="specs" variant="enclosed" colorPalette="blue">
        <Tabs.List bg="bg.muted" p={1} borderRadius="lg">
          <Tabs.Trigger value="specs" gap={2} fontSize="sm">
            <Settings2 size={16} /> Specs
          </Tabs.Trigger>
          <Tabs.Trigger value="layout" gap={2} fontSize="sm">
            <Armchair size={16} /> Seating
          </Tabs.Trigger>
        </Tabs.List>

        <Box py={4}>
          <Tabs.Content value="specs">
            <VStack align="stretch" gap={4}>
              <Text fontSize="xs" color="fg.muted" fontWeight="bold">
                UPDATE REGISTRY & CAPACITY INFO
              </Text>

              <GenericForm<Transportation>
                disableToast={true}
                fields={editFields as any}
                initialValues={transport}
                onSubmit={onUpdate}
                onCancel={onClose}
                isLoading={loading}
                submitLabel="Update Unit & Sync Seats"
                columns={2}
              />
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="layout">
            <Box minH="400px">
              {transport.id && <SeatManager transportId={transport.id} />}
            </Box>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </GenericDialog>
  );
};

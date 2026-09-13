import { Box, Tabs, VStack, Text } from "@chakra-ui/react";
import { Settings2, Armchair, Star, Accessibility, Baby } from "lucide-react";
import { AppDialog } from "@/components/ui/Custom/Dialogs/AppDialog";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";
import { SeatManager } from "../Seat/SeatManagement/SeatManager";
import type { FieldConfig } from "@/interface/common/FieldConfig";
import type { Transportation } from "@/interface/tour/Transportation";
import type { TransportationEditDialogProps } from "@/interface/props/tour/TransportationEditDialogProps";
import { transportationTypeOptions } from "@/constants/tour/transportationTypeOptions";

export const TransportationEditDialog = ({
  open,
  onClose,
  transport,
  onUpdate,
  loading,
}: TransportationEditDialogProps) => {
  if (!transport) return null;

  const seatConfig = {
    PREMIUM_RECLINER: 0,
    WHEELCHAIR_ACCESSIBLE: 0,
    KIDS_CHAIR: 0,
  };
  transport.seats?.forEach((seat) => {
    if (seat.chairType in seatConfig) {
      const type = seat.chairType as keyof typeof seatConfig;
      seatConfig[type] += 1;
    }
  });

  const editFields: FieldConfig<Transportation>[] = [
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
      options: transportationTypeOptions,
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
    {
      name: "seatConfig.PREMIUM_RECLINER" as keyof Transportation,
      label: "Premium Seats",
      type: "number",
      icon: Star,
      gridSpan: 1,
    },
    {
      name: "seatConfig.WHEELCHAIR_ACCESSIBLE" as keyof Transportation,
      label: "Accessible Spaces",
      type: "number",
      icon: Accessibility,
      gridSpan: 1,
    },
    {
      name: "seatConfig.KIDS_CHAIR" as keyof Transportation,
      label: "Child Safety Seats",
      type: "number",
      icon: Baby,
      gridSpan: 1,
    },
  ];

  return (
    <AppDialog
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
                UPDATE REGISTRY AND BULK SEAT LAYOUT
              </Text>
              <Text fontSize="xs" color="fg.muted">
                Enter the total number required for each specialized seat type. All remaining seats become standard seats.
              </Text>

              <DynamicForm<Transportation>
                disableToast={true}
                fields={editFields}
                initialValues={{ ...transport, seatConfig }}
                onSubmit={async (values) => { await onUpdate(values as unknown as Transportation); }}
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
    </AppDialog>
  );
};

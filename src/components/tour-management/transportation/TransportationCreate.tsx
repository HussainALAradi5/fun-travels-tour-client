import { Box, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { DynamicForm } from "@/components/ui/custom/DynamicForm";
import { TRANSPORTATION_INITIAL_VALUES } from "@/constants/tour/transportationCreate";
import { useTransportationCreate } from "@/hooks/tour-management/useTransportationCreate";
import type { TransportationFormValues } from "@/types/tour/TransportationFormValues";
import { TransportationCreateHeader } from "./TransportationCreateHeader";

export const TransportationCreate = () => {
  const form = useTransportationCreate();
  return (
    <VStack align="stretch" gap={8} w="full">
      <TransportationCreateHeader onBack={form.back} />
      <Separator borderColor="border.subtle" />
      <Box w="full" bg="bg.panel" p={{ base: 6, md: 10 }} borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="xl" position="relative" overflow="hidden">
        <Box position="absolute" top="-10%" right="-5%" w="300px" h="300px" bg="blue.500/5" borderRadius="full" filter="blur(60px)" />
        <DynamicForm<TransportationFormValues> disableToast fields={form.fields} initialValues={TRANSPORTATION_INITIAL_VALUES}
          onSubmit={form.submit} onFieldChange={form.onFieldChange} onCancel={form.back} isLoading={form.isMutating}
          submitLabel="Initialize Unit & Generate Seats" columns={2} />
        <HStack mt={8} p={4} bg="bg.muted" borderRadius="2xl" gap={4} border="1px dashed" borderColor="border.emphasized">
          <Icon as={Info} color="blue.500" />
          <Text fontSize="xs" color="fg.muted">
            Initializing generates one seat record per place. Capacity is permanent; chair types can be re-labelled while no tour uses the vehicle.
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

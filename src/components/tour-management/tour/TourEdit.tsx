import { Alert, Box, Center, Spinner, VStack } from "@chakra-ui/react";
import { DynamicForm } from "@/components/ui/custom/DynamicForm";
import { useTourEditor } from "@/hooks/tour-management/useTourEditor";
import { useParams } from "@/lib/navigation";
import type { TourFormValues } from "@/types/tour/TourFormValues";
import { TourEditHeader } from "./TourEditHeader";

export const EditTour = () => {
  const { id } = useParams<{ id: string }>();
  const editor = useTourEditor(id);
  if (editor.isLoading) return <Center h="50vh"><Spinner size="xl" color="blue.500" /></Center>;
  return (
    <VStack align="start" gap={6} w="full" p={4}>
      <TourEditHeader tourNumber={editor.initialValues?.tourNumber} onBack={editor.returnToDetail} />
      {editor.error && (
        <Alert.Root status="error" variant="subtle" borderRadius="2xl" py={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title fontWeight="bold">Update Locked</Alert.Title>
            <Alert.Description>{editor.error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      {!editor.error && editor.initialValues && (
        <Box w="full" bg="bg.panel" p={{ base: 4, md: 8 }} borderRadius="3xl" borderWidth="1px" borderColor="border.subtle" shadow="sm">
          <DynamicForm<TourFormValues> fields={editor.fields} initialValues={editor.initialValues} onSubmit={editor.save}
            onCancel={editor.returnToDetail} onFieldChange={editor.onFieldChange} submitLabel="Commit Changes" />
        </Box>
      )}
    </VStack>
  );
};

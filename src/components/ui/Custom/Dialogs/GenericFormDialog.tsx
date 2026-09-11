import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { GenericDialog } from "./GenericDialog";
import { GenericForm } from "@/components/ui/Custom/GenericForm";
import type { GenericFormDialogProps } from "@/interface/props/ui/GenericFormDialogProps";

export function GenericFormDialog<T extends Record<string, unknown>>({
  open,
  onClose,
  onSubmit,
  loading,
  title,
  description,
  icon,
  fields,
  initialValues,
  onFieldChange,
  submitLabel = "Submit",
  infoMessage,
  extraContent,
  size = "md",
  columns = 2,
}: GenericFormDialogProps<T>) {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      icon={icon}
      size={size}
    >
      <VStack gap={4} align="stretch">
        {/* Info Box Section */}
        {infoMessage && (
          <HStack
            bg="blue.50"
            _dark={{ bg: "blue.950/30" }}
            p={3}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="blue.100"
            align="start"
          >
            <Box mt={0.5}>
              <Info size={16} color="var(--chakra-colors-blue-500)" />
            </Box>
            
            {typeof infoMessage === "string" ? (
              <Text
                fontSize="xs"
                fontWeight="medium"
                color="blue.700"
                _dark={{ color: "blue.200" }}
              >
                {infoMessage}
              </Text>
            ) : (
              <Box width="full">{infoMessage}</Box>
            )}
          </HStack>
        )}

        {/* Extra UI Content (e.g., SeatMap, Metrics) */}
        {extraContent && (
          <Box width="full">
            {extraContent}
          </Box>
        )}

        {/* The Main Form */}
        <GenericForm<T>
          fields={fields}
          initialValues={initialValues}
          onFieldChange={onFieldChange}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={loading}
          submitLabel={submitLabel}
          columns={columns}
        />
      </VStack>
    </GenericDialog>
  );
}

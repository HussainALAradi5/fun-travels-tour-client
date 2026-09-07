import React from "react"; // Added React import for ReactNode
import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import { Info } from "lucide-react";
import { GenericDialog } from "./GenericDialog";
import type { LucideIcon } from "lucide-react";
import type { FieldConfig } from "@/utilities/FormTypes";
import { GenericForm } from "@/components/ui/Custom/GenericForm";

interface GenericFormDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void>;
  loading: boolean;
  title: string;
  description?: string;
  icon: LucideIcon;
  fields: FieldConfig<T>[];
  initialValues: T;
  onFieldChange?: (name: keyof T, value: any) => void;
  submitLabel?: string;
  // CHANGED: string to ReactNode to allow JSX
  infoMessage?: string; 
  // NEW: Dedicated prop for extra UI components like SeatMaps
  extraContent?: React.ReactNode; 
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  columns?: number;
}

export function GenericFormDialog<T extends Record<string, any>>({
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
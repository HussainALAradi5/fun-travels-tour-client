import React, { useState, useMemo, useCallback } from "react";
import { Box, Button, SimpleGrid, Alert, HStack } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { glowPulse } from "@/utilities/Animations";
import { FormFieldWrapper } from "./GenericFormComponents/FormField";
import type { GenericFormProps } from "@/interface/props/ui/GenericFormProps";

export function GenericForm<T extends Record<string, unknown>>({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = "Submit",
  columns = 2,
  onFieldChange,
  disableToast = false,
}: GenericFormProps<T>) {
  const [formData, setFormData] = useState<T>(initialValues as T);
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isProcessing = isLoading || internalSubmitting;

  const handleInputChange = useCallback(
    (name: keyof T, value: string | number | string[] | boolean | null) => {
      if (errorMessage) setErrorMessage(null);
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (onFieldChange) onFieldChange(name, value);
    },
    [errorMessage, onFieldChange],
  );

  const isFormValid = useMemo(() => {
    return fields.every((field) => {
      if (!field.isRequired) return true;
      const val = formData[field.name];
      return (
        val !== null &&
        val !== undefined &&
        val !== "" &&
        (typeof val === "object" ? Object.keys(val as object).length > 0 : true)
      );
    });
  }, [formData, fields]);

const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isProcessing || !isFormValid) return;

  setInternalSubmitting(true);
  setErrorMessage(null);

  try {
    const response = await onSubmit(formData);

    // Only show toast if NOT disabled
    if (!disableToast) {
      toaster.create({
        title: "Success",
        description: typeof response === "string" 
          ? response 
          : `${submitLabel} completed successfully.`,
        type: "success",
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    setErrorMessage(msg);

    // Only show error toast if NOT disabled
    if (!disableToast) {
      toaster.create({
        title: "Submission Failed",
        description: msg,
        type: "error",
      });
    }
  } finally {
    setInternalSubmitting(false);
  }
};

  const renderedFields = useMemo(
    () =>
      fields.map((field) => (
        <FormFieldWrapper
          key={String(field.name)}
          field={field as FieldConfig<Record<string, unknown>>}
          formData={formData as Record<string, unknown>}
          onChange={handleInputChange}
        />
      )),
    [fields, formData, handleInputChange],
  );

  return (
    <Box w="100%">
      <form onSubmit={handleFormSubmit} noValidate>
        {errorMessage && (
          <Alert.Root
            status="error"
            mb={6}
            size="sm"
            variant="subtle"
            borderRadius="xl"
          >
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title fontSize="xs" fontWeight="bold">
                Error
              </Alert.Title>
              <Alert.Description fontSize="xs">
                {errorMessage}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        <SimpleGrid columns={{ base: 1, md: columns }} gapX={10} gapY={6}>
          {renderedFields}
        </SimpleGrid>

        <HStack mt={10} justify={onCancel ? "flex-end" : "center"} gap={4}>
          {onCancel && (
            <Button
              type="button"
              variant="solid"
              colorPalette="red"
              onClick={onCancel}
              size="md"
              px={8}
              fontWeight="bold"
              disabled={isProcessing}
              transition="all 0.2s cubic-bezier(.4,0,.2,1)"
              boxShadow="0 4px 14px 0 rgba(229, 62, 62, 0.25)"
              _active={{ transform: "scale(0.97)" }}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            loading={isProcessing}
            loadingText="Processing..."
            variant="solid"
            colorPalette="blue"
            disabled={!isFormValid || isProcessing}
            size="md"
            px={10}
            fontWeight="bold"
            animation={
              isFormValid && !isProcessing ? `${glowPulse} 2s infinite` : "none"
            }
            transition="all 0.2s cubic-bezier(.4,0,.2,1)"
            boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.25)"
            _active={{ transform: "scale(0.97)" }}
          >
            {submitLabel}
          </Button>
        </HStack>
      </form>
    </Box>
  );
}

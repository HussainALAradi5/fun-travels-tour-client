import { Alert, Box, SimpleGrid } from "@chakra-ui/react";
import { useDynamicForm } from "@/hooks/ui/useDynamicForm";
import type { FieldConfig } from "@/interfaces/common/FieldConfig";
import type { DynamicFormProps } from "@/interfaces/props/ui/DynamicFormProps";
import { getValueAtPath } from "@/utilities/ObjectPathUtils";
import { FormActions } from "./dynamic-form-components/FormActions";
import { FormFieldWrapper } from "./dynamic-form-components/FormField";

export function DynamicForm<T extends Record<string, unknown>>(props: DynamicFormProps<T>) {
  const { fields, onCancel, submitLabel = "Submit", columns = 2 } = props;
  const form = useDynamicForm(props);
  return (
    <Box w="100%">
      <form onSubmit={form.submit} noValidate>
        {form.errorMessage && (
          <Alert.Root status="error" mb={6} size="sm" variant="subtle" borderRadius="xl">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title fontSize="xs" fontWeight="bold">Error</Alert.Title>
              <Alert.Description fontSize="xs">{form.errorMessage}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}
        <SimpleGrid columns={{ base: 1, md: columns }} gapX={10} gapY={6}>
          {fields.map((field) => (
            <FormFieldWrapper key={String(field.name)} field={field as FieldConfig<Record<string, unknown>>}
              value={getValueAtPath(form.formData, String(field.name))} onChange={form.change} />
          ))}
        </SimpleGrid>
        <FormActions submitLabel={submitLabel} isValid={form.isValid} isProcessing={form.isProcessing} onCancel={onCancel} />
      </form>
    </Box>
  );
}

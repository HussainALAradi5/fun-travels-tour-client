import { Box, Field, Text, Badge, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { Check } from "lucide-react";
import {
  TextInput,
  TextAreaInput,
  BooleanInput,
  DateInput,
} from "./FormInputs";
import { FormCombobox } from "./FormCombobox";
import { FormSelect } from "./FormSelect";
import { FormFile } from "./FormFile";
import { EmailField, MobileField } from "./ContactFields";
import type { FormFieldWrapperProps } from "@/interface/props/ui/FormFieldProps";

export function FormFieldWrapper({ field, formData, onChange }: FormFieldWrapperProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const rawValue = formData[field.name as string];

  const hasValue =
    rawValue !== null && typeof rawValue === "object"
      ? Object.keys(rawValue as object).length > 0
      : rawValue !== undefined && rawValue !== "" && rawValue !== false;

  const isInvalid = field.isRequired && !hasValue && isTouched;

  const gridSpan = field.gridSpan 
    ? `span ${field.gridSpan}` 
    : "span 2"; 

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const renderInput = () => {
    const commonProps = {
      field: field as FieldConfig<Record<string, unknown>>,
      value: rawValue,
      onChange: (name: string, val: string | number | string[] | boolean | null) => {
        setIsTouched(true);
        onChange(name, val);
      },
      onBlur: handleBlur,
      onFocus: () => setIsFocused(true),
    };

    switch (field.type) {
      case "file": 
        return <FormFile field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
      case "select": 
        return <FormSelect field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
      case "search-select":
      case "multi-select":
        return <FormCombobox field={field} value={rawValue as string | string[] | null} onChange={commonProps.onChange} multiple={field.type === "multi-select"} />;
      case "boolean":
      case "checkbox": 
        return <BooleanInput field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
      case "date": 
        return <DateInput field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
      case "textarea": 
        return <TextAreaInput field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
      
      // ADDED: Integration for Email and Mobile components
      case "email":
        return (
          <EmailField 
            value={commonProps.value as string} 
            onChange={(val: string) => commonProps.onChange(field.name as string, val)}
            placeholder={field.placeholder}
            disabled={field.disabled}
          />
        );
      case "mobile":
        return (
          <MobileField 
            value={commonProps.value as string} 
            onChange={(val: string) => commonProps.onChange(field.name as string, val)}
            placeholder={field.placeholder}
            disabled={field.disabled}
          />
        );

      default: 
        return <TextInput field={field} value={rawValue as string | number | boolean | null | undefined} onChange={commonProps.onChange} onBlur={commonProps.onBlur} onFocus={commonProps.onFocus} />;
    }
  };

  return (
    <Box gridColumn={{ base: "span 2", md: gridSpan }} w="100%">
      <Field.Root invalid={isInvalid} w="100%">
        <HStack mb={2} justify="space-between" align="center">
          <HStack gap={2}>
            <Text
              fontSize="xs"
              color={isFocused ? "blue.500" : "gray.600"}
              textTransform="uppercase"
              letterSpacing="widest"
              transition="color 0.2s ease"
            >
              {field.label}
            </Text>
            
            {field.isRequired && !hasValue && (
              <Badge 
                colorPalette="red" 
                variant="subtle" 
                size="sm" 
                fontSize="9px"
                borderRadius="full"
                px={2}
              >
                * REQUIRED
              </Badge>
            )}
          </HStack>
          
          {hasValue && !isInvalid && (
            <Box color="green.500" transition="all 0.2s">
              <Check size={16} strokeWidth={3} />
            </Box>
          )}
        </HStack>

        <Box 
          position="relative" 
          w="100%" 
          onFocus={() => setIsFocused(true)} 
          onBlur={handleBlur}
        >
          {renderInput()}
        </Box>
      </Field.Root>
    </Box>
  );
}

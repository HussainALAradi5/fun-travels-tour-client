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
import { EmailField, MobileField } from "./ContactFields"; // Import the new components

export function FormFieldWrapper({ field, formData, onChange }: any) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const rawValue = formData[field.name];

  const hasValue =
    rawValue !== null && typeof rawValue === "object"
      ? Object.keys(rawValue).length > 0
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
      field,
      value: rawValue,
      onChange: (name: string, val: any) => {
        setIsTouched(true);
        onChange(name, val);
      },
      onBlur: handleBlur,
      onFocus: () => setIsFocused(true),
    };

    switch (field.type) {
      case "file": 
        return <FormFile {...commonProps} />;
      case "select": 
        return <FormSelect {...commonProps} />;
      case "search-select":
      case "multi-select":
        return <FormCombobox {...commonProps} multiple={field.type === "multi-select"} />;
      case "boolean":
      case "checkbox": 
        return <BooleanInput {...commonProps} />;
      case "date": 
        return <DateInput {...commonProps} />;
      case "textarea": 
        return <TextAreaInput {...commonProps} />;
      
      // ADDED: Integration for Email and Mobile components
      case "email":
        return (
          <EmailField 
            value={commonProps.value} 
            onChange={(val: any) => commonProps.onChange(field.name, val)}
            placeholder={field.placeholder}
            disabled={field.disabled}
          />
        );
      case "mobile":
        return (
          <MobileField 
            value={commonProps.value} 
            onChange={(val: any) => commonProps.onChange(field.name, val)}
            placeholder={field.placeholder}
            disabled={field.disabled}
          />
        );

      default: 
        return <TextInput {...commonProps} />;
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
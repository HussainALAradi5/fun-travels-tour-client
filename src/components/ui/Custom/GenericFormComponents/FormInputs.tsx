import { Input, Textarea, HStack, Box, Switch, Text } from "@chakra-ui/react";
import { DatePicker } from "../DatePicker";
import type { FormInputProps } from "@/interface/props/ui/FormInputProps";

export const TextInput = ({ field, value, onChange }: FormInputProps) => (
  <Input
    size="sm"
    variant="subtle"
    disabled={field.disabled}
    type={field.type}
    placeholder={field.placeholder}
    value={(value as string) ?? ""}
    onChange={(e) => onChange(field.name as string, e.target.value)}
    _focus={{ borderColor: "blue.500", bg: "bg.panel" }}
  />
);

export const TextAreaInput = ({ field, value, onChange }: FormInputProps) => (
  <Textarea
    size="sm"
    variant="subtle"
    disabled={field.disabled}
    placeholder={field.placeholder}
    value={(value as string) ?? ""}
    onChange={(e) => onChange(field.name as string, e.target.value)}
    _focus={{ borderColor: "blue.500", bg: "bg.panel" }}
  />
);

export const BooleanInput = ({ field, value, onChange }: FormInputProps) => (
  <HStack 
    height="36px" 
    width="full" 
    px={3} 
    borderWidth="1px" 
    borderRadius="md" 
    bg="bg.subtle"
    justify="space-between"
    transition="all 0.2s"
    _hover={{ borderColor: "blue.500/50" }}
  >
    <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase">
      {field.placeholder || field.label}
    </Text>
    
    <Switch.Root 
      colorPalette="blue" 
      size="sm"
      disabled={field.disabled}
      checked={!!value}
      onCheckedChange={(e) => onChange(field.name as string, !!e.checked)}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label fontSize="2xs" fontWeight="black" ml={2}>
        {value ? "ON" : "OFF"}
      </Switch.Label>
    </Switch.Root>
  </HStack>
);

export const DateInput = ({ field, value, onChange }: FormInputProps) => (
  <Box width="100%">
    <DatePicker
      label={field.label}
      value={value as string}
      onChange={(dateString: string) => {
        // Formats the ISO string from DatePicker (e.g., 2024-05-20T...) to YYYY-MM-DD
        const formattedDate = dateString.split("T")[0];
        onChange(field.name as string, formattedDate);
      }}
    />
  </Box>
);

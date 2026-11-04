import { Box, Group, Icon, Input } from "@chakra-ui/react";
import { Mail } from "lucide-react";
import { BARE_INPUT_STYLES, COMPOSITE_INPUT_STYLES } from "@/constants/ui/inputStyles";
import type { CustomFieldProps } from "@/interfaces/props/ui/ContactFieldsProps";

export const EmailField = ({ value, onChange, placeholder, disabled }: CustomFieldProps) => (
  <Group attached width="full" {...COMPOSITE_INPUT_STYLES}>
    <Box pl={3} pr={2} display="flex" alignItems="center" color="fg.muted"><Icon as={Mail} boxSize={4} /></Box>
    <Input type="email" {...BARE_INPUT_STYLES} value={value || ""} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "example@domain.com"} disabled={disabled} />
  </Group>
);

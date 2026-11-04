import { Box, Group, Icon, Input, Spinner } from "@chakra-ui/react";
import { Smartphone } from "lucide-react";
import { BARE_INPUT_STYLES, COMPOSITE_INPUT_STYLES, MAX_MOBILE_DIGITS } from "@/constants/ui/inputStyles";
import { useDialCodes } from "@/hooks/ui/useDialCodes";
import type { CustomFieldProps } from "@/interfaces/props/ui/ContactFieldsProps";
import { DialCodeSelect } from "./DialCodeSelect";

export const MobileField = ({ value, onChange, placeholder, disabled }: CustomFieldProps) => {
  const dial = useDialCodes(value, onChange);
  return (
    <Group attached width="full" {...COMPOSITE_INPUT_STYLES}>
      <Box pl={3} pr={1} display="flex" alignItems="center" color="fg.muted"><Icon as={Smartphone} boxSize={4} /></Box>
      <Box width="100px" borderRightWidth="1px" borderColor="border.subtle" mr={2} display="flex" alignItems="center" justifyContent="center">
        {dial.isLoading || dial.countries.length === 0 ? <Spinner size="sm" color="blue.500" /> : (
          <DialCodeSelect collection={dial.collection} selected={dial.selected} searchQuery={dial.searchQuery}
            disabled={disabled} onSearch={dial.setSearchQuery} onSelect={dial.changeCountry} />
        )}
      </Box>
      <Input type="tel" {...BARE_INPUT_STYLES} value={dial.localNumber} onChange={(e) => dial.changeNumber(e.target.value)}
        placeholder={placeholder || "3333 4444"} disabled={disabled || dial.isLoading}
        maxLength={dial.selected?.mobileNumberLength || MAX_MOBILE_DIGITS} />
    </Group>
  );
};

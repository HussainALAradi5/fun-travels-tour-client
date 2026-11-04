import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { DatePickerHeaderProps } from "@/interfaces/props/ui/DatePickerHeaderProps";

const activeBg = (active: boolean) => ({
  bg: active ? "blue.50" : "transparent",
  _dark: { bg: active ? "blue.900/30" : "transparent" },
});

export const DatePickerHeader = ({ viewDate, viewMode, onViewMode, onNavigate }: DatePickerHeaderProps) => (
  <HStack width="full" justifyContent="space-between">
    <HStack gap={1}>
      <Button variant="ghost" size="sm" px={2} borderRadius="md" {...activeBg(viewMode === "months")}
        onClick={() => onViewMode(viewMode === "months" ? "days" : "months")}>
        <Text fontWeight="bold" fontSize="md">{format(viewDate, "MMMM")}</Text>
        <Box as="span" ml={1} opacity={0.5}><ChevronDown size={14} /></Box>
      </Button>
      <Button variant="ghost" size="sm" px={2} borderRadius="md" {...activeBg(viewMode === "years")}
        onClick={() => onViewMode(viewMode === "years" ? "days" : "years")}>
        <Text fontWeight="medium" color="fg.muted">{format(viewDate, "yyyy")}</Text>
      </Button>
    </HStack>
    <HStack gap={1}>
      <IconButton aria-label="Previous" variant="ghost" size="xs" onClick={() => onNavigate("prev")}><ChevronLeft size={18} /></IconButton>
      <IconButton aria-label="Next" variant="ghost" size="xs" onClick={() => onNavigate("next")}><ChevronRight size={18} /></IconButton>
    </HStack>
  </HStack>
);

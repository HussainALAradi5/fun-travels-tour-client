import { Box, Button, Center, HStack, IconButton, PopoverTrigger, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X as ClearIcon } from "lucide-react";
import type { DatePickerTriggerProps } from "@/interfaces/props/ui/DatePickerTriggerProps";

export const DatePickerTrigger = ({ label, from, to, hasValue, onClear }: DatePickerTriggerProps) => (
  <Box position="relative" width="full">
    <PopoverTrigger asChild>
      <Button variant="outline" width="full" height="14" justifyContent="flex-start" bg="bg.panel" borderRadius="xl" px={4} pr={hasValue ? 14 : 4} borderWidth="1px" _hover={{ borderColor: "blue.500" }}>
        <HStack gap={3} width="full">
          <Center p={2} bg="blue.50" color="blue.600" borderRadius="lg" _dark={{ bg: "blue.900/30", color: "blue.300" }}>
            <CalendarIcon size={20} />
          </Center>
          <VStack align="start" gap={0} flex="1">
            <Text fontSize="10px" fontWeight="bold" color="fg.muted" textTransform="uppercase">{label}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {from ? (to ? `${format(from, "MMM d")} - ${format(to, "MMM d")}` : format(from, "PPP")) : "Select Date"}
            </Text>
          </VStack>
        </HStack>
      </Button>
    </PopoverTrigger>
    {hasValue && (
      <IconButton type="button" aria-label={`Clear ${label}`} size="sm" variant="ghost" position="absolute"
        right="2" top="50%" transform="translateY(-50%)" zIndex="1" onClick={onClear}>
        <ClearIcon size={14} />
      </IconButton>
    )}
  </Box>
);

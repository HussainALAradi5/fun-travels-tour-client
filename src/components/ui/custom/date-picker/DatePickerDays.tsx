import { Center, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { WEEKDAY_LABELS } from "@/constants/ui/datePicker";
import type { DatePickerDaysProps } from "@/interfaces/props/ui/DatePickerDaysProps";
import { dateSelectPulse, rangeHighlightIn } from "@/utilities/Animations";
import { dayCellState } from "@/utilities/datePickerDay";

export const DatePickerDays = ({ days, viewDate, from, to, hoveredDay, isRangePicker, minDate, onHover, onSelect }: DatePickerDaysProps) => (
  <VStack gap={4}>
    {isRangePicker && (
      <Text width="full" fontSize="xs" color="fg.muted" textAlign="center">
        {!from || to ? "Choose a start date" : "Hover to preview, then choose an end date"}
      </Text>
    )}
    <SimpleGrid columns={7} width="full" textAlign="center">
      {WEEKDAY_LABELS.map((d) => <Text key={d} fontSize="xs" fontWeight="bold" color="blue.500" opacity={0.8}>{d}</Text>)}
    </SimpleGrid>
    <SimpleGrid columns={7} width="full" gap={1} onMouseLeave={() => onHover(undefined)}>
      {days.map((day) => {
        const s = dayCellState({ day, viewDate, from, to, hoveredDay, isRangePicker, minDate });
        return (
          <Center key={day.toISOString()} role="button" aria-label={format(day, "PPP")} aria-selected={s.selected}
            tabIndex={s.disabled ? -1 : 0} cursor={s.disabled ? "not-allowed" : "pointer"}
            onClick={() => onSelect(day)} onMouseEnter={() => !s.disabled && onHover(day)}
            onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(day); } }}
            height="38px" fontSize="sm" opacity={s.disabled ? 0.3 : 1} borderRadius="lg"
            fontWeight={s.selected || s.previewEnd ? "bold" : "medium"}
            bg={s.selected ? "blue.600" : s.previewEnd ? "blue.100" : s.highlighted ? "blue.50" : "transparent"}
            _dark={{ bg: s.selected ? "blue.500" : s.previewEnd ? "blue.800" : s.highlighted ? "blue.900/30" : "transparent" }}
            color={s.selected ? "white" : s.inCurrentMonth ? "fg" : "fg.subtle"}
            outline={s.previewEnd ? "2px solid" : undefined} outlineColor={s.previewEnd ? "blue.400" : undefined}
            animation={s.selected ? `${dateSelectPulse} 240ms ease-out` : s.highlighted ? `${rangeHighlightIn} 180ms ease-out` : undefined}
            transition="background-color 140ms ease, color 140ms ease, transform 140ms ease"
            _hover={!s.disabled ? { bg: s.selected ? "blue.700" : "bg.muted", _dark: { bg: s.selected ? "blue.400" : "whiteAlpha.100" } } : {}}>
            {format(day, "d")}
          </Center>
        );
      })}
    </SimpleGrid>
  </VStack>
);

import { Box, PopoverBody, PopoverContent, PopoverPositioner, PopoverRoot, Portal, VStack } from "@chakra-ui/react";
import { setMonth, setYear } from "date-fns";
import { MONTH_LABELS } from "@/constants/ui/datePicker";
import { useDatePicker } from "@/hooks/ui/useDatePicker";
import type { DatePickerProps } from "@/interfaces/props/ui/DatePickerProps";
import { calendarPopIn } from "@/utilities/Animations";
import { DatePickerChoiceGrid } from "./date-picker/DatePickerChoiceGrid";
import { DatePickerDays } from "./date-picker/DatePickerDays";
import { DatePickerHeader } from "./date-picker/DatePickerHeader";
import { DatePickerTrigger } from "./date-picker/DatePickerTrigger";

export const DatePicker = (props: DatePickerProps) => {
  const picker = useDatePicker(props);
  const { viewDate } = picker;
  return (
    <PopoverRoot open={picker.open} onOpenChange={(e) => picker.onOpenChange(e.open)} portalled
      positioning={{ strategy: "fixed", placement: "bottom-start", gutter: 12 }}>
      <DatePickerTrigger label={props.label} from={picker.from} to={picker.to} hasValue={picker.hasValue} onClear={picker.clear} />
      <Portal>
        <PopoverPositioner zIndex="3000">
          <PopoverContent animation={`${calendarPopIn} 180ms ease-out`} transformOrigin="top left" bg="bg.panel" color="fg"
            boxShadow="2xl" width="340px" borderRadius="2xl" border="1px solid" borderColor="border.muted">
            <PopoverBody p={6}>
              <VStack gap={4}>
                <DatePickerHeader viewDate={viewDate} viewMode={picker.viewMode} onViewMode={picker.setViewMode} onNavigate={picker.navigate} />
                <Box width="full" minHeight="240px">
                  {picker.viewMode === "months" && (
                    <DatePickerChoiceGrid labels={MONTH_LABELS} selectedIndex={viewDate.getMonth()}
                      onSelect={(i) => picker.showDays(setMonth(viewDate, i))} />
                  )}
                  {picker.viewMode === "years" && (
                    <DatePickerChoiceGrid labels={picker.years} selectedIndex={picker.years.indexOf(viewDate.getFullYear())}
                      onSelect={(i) => picker.showDays(setYear(viewDate, picker.years[i]))} />
                  )}
                  {picker.viewMode === "days" && (
                    <DatePickerDays days={picker.days} viewDate={viewDate} from={picker.from} to={picker.to}
                      hoveredDay={picker.hoveredDay} isRangePicker={picker.isRangePicker} minDate={props.minDate}
                      onHover={picker.setHoveredDay} onSelect={picker.selectDay} />
                  )}
                </Box>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </PopoverRoot>
  );
};

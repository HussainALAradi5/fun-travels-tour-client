import type { DateRange } from "@/interface/common/DateRange";

export interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (date: string) => void;
  valueEnd?: string;
  onChangeEnd?: (date: string) => void;
  range?: DateRange;
  onRangeChange?: (range: DateRange) => void;
  minDate?: Date;
}

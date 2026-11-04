export interface DatePickerDaysProps {
  days: Date[];
  viewDate: Date;
  from?: Date;
  to?: Date;
  hoveredDay?: Date;
  isRangePicker: boolean;
  minDate?: Date;
  onHover: (day?: Date) => void;
  onSelect: (day: Date) => void;
}

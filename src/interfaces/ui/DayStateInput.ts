export interface DayStateInput {
  day: Date;
  viewDate: Date;
  from?: Date;
  to?: Date;
  hoveredDay?: Date;
  isRangePicker: boolean;
  minDate?: Date;
}

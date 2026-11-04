export interface DatePickerTriggerProps {
  label?: string;
  from?: Date;
  to?: Date;
  hasValue: boolean;
  onClear: () => void;
}

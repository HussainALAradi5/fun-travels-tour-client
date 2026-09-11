export interface DatePickerProps {
  label: string;
  value?: string;
  onChange: (date: string) => void;
  valueEnd?: string;
  onChangeEnd?: (date: string) => void;
  minDate?: Date;
}

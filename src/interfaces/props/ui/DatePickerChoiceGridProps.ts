export interface DatePickerChoiceGridProps {
  labels: (string | number)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

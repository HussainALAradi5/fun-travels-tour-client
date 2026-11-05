export interface CounterRowProps {
  label: string;
  hint: string;
  value: number;
  min: number;
  canAdd: boolean;
  onChange: (value: number) => void;
}

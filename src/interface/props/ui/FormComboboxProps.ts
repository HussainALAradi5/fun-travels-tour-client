import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface FormComboboxProps {
  field: FieldConfig<Record<string, unknown>>;
  value: string | string[] | null;
  onChange: (name: string, value: string | string[]) => void;
  multiple?: boolean;
}

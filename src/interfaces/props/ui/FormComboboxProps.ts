import type { FieldConfig } from '@/interfaces/common/FieldConfig';
import type { SelectOption } from '@/interfaces/common/SelectOption';

type ComboboxValue = SelectOption["value"] | string[] | null;

export interface FormComboboxProps {
  field: FieldConfig<Record<string, unknown>>;
  value: ComboboxValue;
  onChange: (name: string, value: ComboboxValue) => void;
  multiple?: boolean;
}

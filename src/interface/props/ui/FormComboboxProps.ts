import type { FieldConfig } from '@/interface/common/FieldConfig';
import type { SelectOption } from '@/interface/common/SelectOption';

type ComboboxValue = SelectOption["value"] | string[] | null;

export interface FormComboboxProps {
  field: FieldConfig<Record<string, unknown>>;
  value: ComboboxValue;
  onChange: (name: string, value: ComboboxValue) => void;
  multiple?: boolean;
}

import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface FormInputProps {
  field: FieldConfig<Record<string, unknown>>;
  value: string | number | boolean | null | undefined;
  onChange: (name: string, value: string | number | string[] | boolean | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

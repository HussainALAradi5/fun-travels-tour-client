import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface FormSelectProps {
  field: FieldConfig<Record<string, unknown>>;
  value: string | number | boolean | null | undefined;
  onChange: (name: string, value: string | number | boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

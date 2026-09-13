import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface FormFileProps {
  field: FieldConfig<Record<string, unknown>>;
  value: string | number | boolean | null | undefined;
  onChange: (name: string, value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface FormFieldWrapperProps {
  field: FieldConfig<Record<string, unknown>>;
  value: unknown;
  onChange: (name: string, value: string | number | string[] | boolean | null) => void;
}

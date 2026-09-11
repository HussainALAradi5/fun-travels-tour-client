import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface GenericFormProps<T> {
  fields: FieldConfig<T>[];
  initialValues: T;
  onSubmit: (data: T) => Promise<string | void> | string | void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  columns?: number;
  onFieldChange?: (name: keyof T, value: string | number | string[] | boolean | null) => void;
  disableToast?: boolean;
}

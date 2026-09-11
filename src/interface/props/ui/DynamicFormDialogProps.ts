import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { FieldConfig } from '@/interface/common/FieldConfig';

export interface DynamicFormDialogProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: LucideIcon;
  fields: FieldConfig<T>[];
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  loading: boolean;
  onFieldChange?: (name: keyof T, value: unknown) => void;
  submitLabel?: string;
  infoMessage?: string | ReactNode;
  extraContent?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  columns?: number;
}

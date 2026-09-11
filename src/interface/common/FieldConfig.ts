import type { LucideIcon } from 'lucide-react';
import type { SelectOption } from './SelectOption';

export type FieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "select"
  | "textarea"
  | "boolean"
  | "search-select"
  | "multi-select"
  | "checkbox"
  | "file"
  | "mobile"
  | "date";

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: SelectOption[];
  isRequired?: boolean;
  gridSpan?: number;
  disabled?: boolean;
  icon?: LucideIcon;
}

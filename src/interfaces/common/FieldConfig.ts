import type { LucideIcon } from 'lucide-react';
import type { SelectOption } from './SelectOption';
import type { PageResponse } from './PageResponse';

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
  searchOptions?: (query: string, page: number) => Promise<PageResponse<SelectOption>>;
  clearFieldsOnChange?: Array<keyof T>;
  isRequired?: boolean;
  gridSpan?: number;
  disabled?: boolean;
  icon?: LucideIcon;
}

// src/utilities/FormTypes.ts
import type { LucideIcon } from "lucide-react";

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
  | 'mobile'
  | "date";

export interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type: FieldType;
  placeholder?: string;
  // CHANGED: Allow 'any' to support passing full objects (No DTO rule)
  options?: { label: string; value: any }[];
  isRequired?: boolean;
  gridSpan?: number;
  disabled?: boolean;
  icon?: LucideIcon;
}

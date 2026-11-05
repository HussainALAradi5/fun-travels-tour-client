import type { FieldConfig } from "@/interfaces/common/FieldConfig";

export interface GenderFieldProps {
  field: FieldConfig<Record<string, unknown>>;
  value: string | number | boolean | null | undefined;
  onChange: (name: string, value: string) => void;
}

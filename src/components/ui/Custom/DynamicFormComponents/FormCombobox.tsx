import { PaginatedSearchSelect } from "@/components/ui/Custom/PaginatedSearchSelect";
import type { FormComboboxProps } from "@/interface/props/ui/FormComboboxProps";

export function FormCombobox({ field, value, onChange, multiple }: FormComboboxProps) {
  return (
    <PaginatedSearchSelect
      label={field.label}
      value={value}
      onChange={(nextValue) => onChange(field.name as string, nextValue)}
      options={field.options}
      loadOptions={field.searchOptions}
      placeholder={field.placeholder}
      disabled={field.disabled}
      multiple={multiple}
    />
  );
}

import type { PageResponse } from "@/interface/common/PageResponse";
import type { SelectOption } from "@/interface/common/SelectOption";

export type SearchSelectValue = SelectOption["value"] | string[] | null;

export interface PaginatedSearchSelectProps {
  label: string;
  value: SearchSelectValue;
  onChange: (value: SearchSelectValue) => void;
  options?: SelectOption[];
  loadOptions?: (query: string, page: number) => Promise<PageResponse<SelectOption>>;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  debounceMs?: number;
}

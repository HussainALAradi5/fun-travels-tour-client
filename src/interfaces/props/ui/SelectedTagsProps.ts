import type { SelectOption } from "@/interfaces/common/SelectOption";

export interface SelectedTagsProps {
  values: string[];
  options: SelectOption[];
  onRemove: (value: string) => void;
}

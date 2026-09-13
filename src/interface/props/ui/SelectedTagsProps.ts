import type { SelectOption } from "@/interface/common/SelectOption";

export interface SelectedTagsProps {
  values: string[];
  options: SelectOption[];
  onRemove: (value: string) => void;
}

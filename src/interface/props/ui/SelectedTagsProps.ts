export interface SelectedTagsProps {
  values: string[];
  options: { label: string; value: string | number }[];
  onRemove: (value: string) => void;
}

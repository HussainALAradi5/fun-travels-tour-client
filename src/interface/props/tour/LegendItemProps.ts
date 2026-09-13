export interface LegendItemProps {
  colorPalette?: string;
  bg?: string;
  color?: string;
  label: string;
  icon?: typeof import("lucide-react").Armchair;
  fill?: boolean;
  opacity?: number;
}

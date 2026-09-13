import type { StatusLegendColor } from "./StatusLegendColor";

export interface StatusLegendProps {
  colorMap: Record<string, string | StatusLegendColor>;
  title?: string;
}

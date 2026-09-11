export interface StatusLegendProps {
  colorMap: Record<string, string | { light?: string; dark?: string; text?: string }>;
  title?: string;
}

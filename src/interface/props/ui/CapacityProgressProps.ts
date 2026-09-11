import type { VStackProps } from '@chakra-ui/react';

export interface CapacityProgressProps extends VStackProps {
  value: number;
  total: number;
  unit?: string;
  showPercentage?: boolean;
  showStatusText?: boolean;
  colorOverride?: string;
  align?: string;
  gap?: string;
}

import type { StackProps } from '@chakra-ui/react';

export interface CapacityProgressProps extends StackProps {
  value: number;
  total: number;
  unit?: string;
  showPercentage?: boolean;
  showStatusText?: boolean;
  colorOverride?: string;
  align?: string;
  gap?: string;
}

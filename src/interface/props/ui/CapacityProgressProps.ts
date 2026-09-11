import type { StackProps } from '@chakra-ui/react';
import type { ProgressVariant } from '@/enums/ProgressVariant';
import type { ProgressType } from '@/enums/ProgressType';

export interface CapacityProgressProps extends StackProps {
  value: number;
  total: number;
  unit?: string;
  showPercentage?: boolean;
  showStatusText?: boolean;
  colorOverride?: string;
  align?: string;
  gap?: string;
  variant?: ProgressVariant;
  type?: ProgressType;
}

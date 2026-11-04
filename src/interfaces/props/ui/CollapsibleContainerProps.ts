import type { BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface CollapsibleContainerProps extends BoxProps {
  isOpen?: boolean;
  children: ReactNode;
  title?: string;
}

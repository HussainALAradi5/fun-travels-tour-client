import type { ReactNode } from 'react';

export interface GenericCardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  w?: string;
  border?: string;
  borderColor?: string;
  bg?: Record<string, string>;
}

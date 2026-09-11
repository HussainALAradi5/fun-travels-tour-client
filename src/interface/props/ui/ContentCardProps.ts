import type { ReactNode } from 'react';

export interface ContentCardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  w?: string;
  border?: string;
  borderColor?: string;
  bg?: string | Record<string, string>;
  p?: string;
  onClick?: () => void;
  _hover?: Record<string, string>;
}

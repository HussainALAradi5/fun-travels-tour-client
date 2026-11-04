export interface PageWrapperProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  children: React.ReactNode;
  showAction?: boolean;
  onActionClick?: () => void;
  buttonText?: string;
}

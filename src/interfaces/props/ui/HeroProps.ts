export interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  onActionClick?: () => void;
  showAction?: boolean;
  buttonText?: string;
}

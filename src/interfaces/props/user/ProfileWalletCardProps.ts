export interface ProfileWalletCardProps {
  balance: number | null;
  loading: boolean;
  onTopUp: () => void;
  onHistory: () => void;
}

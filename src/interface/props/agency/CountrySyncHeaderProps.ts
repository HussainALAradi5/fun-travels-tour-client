export interface CountrySyncHeaderProps {
  onSync: (name: string) => void;
  onBulkSync: () => void;
  isLoading: boolean;
}

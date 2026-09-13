export interface CountrySyncHeaderProps {
  onBulkSync: () => void;
  onSingleSync: (name: string) => void;
  isFetching: boolean;
}

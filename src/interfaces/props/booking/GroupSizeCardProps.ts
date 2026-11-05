export interface GroupSizeCardProps {
  adults: number;
  children: number;
  placesLeft: number;
  kidsDiscountPercent: number;
  kidsChairsFree: number;
  onChange: (adults: number, children: number) => void;
  onSeatEveryone: () => void;
  seatsLoading?: boolean;
}

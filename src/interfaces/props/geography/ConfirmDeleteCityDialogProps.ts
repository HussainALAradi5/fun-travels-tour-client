import type { City } from "../../geography/City";

export interface ConfirmDeleteCityDialogProps {
  city: City | null;
  countryName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

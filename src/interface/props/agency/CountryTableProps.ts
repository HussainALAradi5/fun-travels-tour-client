import type { Country } from "../../geography/Country";

export interface CountryTableProps {
  data: Country[];
  isLoading: boolean;
  onDelete: (country: Country) => void;
}

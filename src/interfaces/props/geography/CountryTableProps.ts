import type { Country } from "@/interfaces/geography/Country";

export interface CountryTableProps {
  data: Country[];
  loading: boolean;
  onDelete: (country: Country) => void;
}

import type { Country } from "@/interface/geography/Country";

export interface CountryTableProps {
  data: Country[];
  loading: boolean;
  onDelete: (country: Country) => void;
}

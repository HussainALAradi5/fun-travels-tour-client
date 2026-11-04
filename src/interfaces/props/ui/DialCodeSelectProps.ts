import type { ListCollection } from "@chakra-ui/react";
import type { Country } from "../../geography/Country";

export interface DialCodeSelectProps {
  collection: ListCollection<Country>;
  selected: Country | null;
  searchQuery: string;
  disabled?: boolean;
  onSearch: (query: string) => void;
  onSelect: (countryId: string) => void;
}

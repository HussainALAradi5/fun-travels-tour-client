import type { SelectOption } from "../common/SelectOption";

export interface TourEditOptions {
  countries: SelectOption[];
  transports: SelectOption[];
  startCities: SelectOption[];
  endCities: SelectOption[];
}

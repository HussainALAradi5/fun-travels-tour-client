import type { EntityReference } from "../common/EntityReference";

export interface CityCreateRequest {
  name: string;
  country: EntityReference;
}

import type { GenericStatus } from "@/enums/GenericStatus";
import type { TransportationStatus } from "@/enums/tourmanagement/TransportationStatus";
import type { TransportationType } from "@/enums/tourmanagement/TransportationType";
import type { FilterInterface } from "@/interface/common/FilterInterface";

export type TransportationSortField =
  | "id"
  | "transportationNumber"
  | "code"
  | "providerName"
  | "type"
  | "unitStatus";

export interface TransportationFilterParams extends FilterInterface {
  sortBy?: TransportationSortField;
  status?: GenericStatus;
  type?: TransportationType;
  unitStatus?: TransportationStatus;
  keyword?: string;
}

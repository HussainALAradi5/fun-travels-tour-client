import type { GenericStatus } from "@/enums/GenericStatus";
import type { TransportationStatus } from "@/enums/tour-management/TransportationStatus";
import type { TransportationType } from "@/enums/tour-management/TransportationType";
import type { FilterInterface } from "@/interfaces/common/FilterInterface";

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
